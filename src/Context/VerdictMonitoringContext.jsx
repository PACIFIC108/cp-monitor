import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { eventStreamUrl } from '@/lib/api';
import { useAuth } from './AuthContext';

const VerdictMonitoringContext = createContext(null);

const sounds = {
  OK: ['/mp3-files/accepted.mp3', 'ACCEPTED'],
  MEMORY_LIMIT_EXCEEDED: ['/mp3-files/mle.mp3', 'MEMORY LIMIT EXCEEDED'],
  TIME_LIMIT_EXCEEDED: ['/mp3-files/tle.mp3', 'TIME LIMIT EXCEEDED'],
  WRONG_ANSWER: ['/mp3-files/wrong ans.mp3', 'WRONG ANSWER'],
  COMPILATION_ERROR: ['/mp3-files/compilation err.mp3', 'COMPILATION ERROR'],
  IDLENESS_LIMIT_EXCEEDED: ['/mp3-files/ile.mp3', 'IDLENESS LIMIT EXCEEDED'],
  RUNTIME_ERROR: ['/mp3-files/runtime err.mp3', 'RUNTIME ERROR'],
  FAILED: ['/mp3-files/failed.mp3', 'FAILED'],
  SKIPPED: ['/mp3-files/skipped.mp3', 'SKIPPED'],
};

export const VerdictMonitoringProvider = ({ children }) => {
  const { isAuthenticated, isAuthorized } = useAuth();
  const [monitoring, setMonitoring] = useState(false);
  const [connectionState, setConnectionState] = useState('stopped');
  const [latestSubmission, setLatestSubmission] = useState(null);
  const sourceRef = useRef(null);
  const audioRef = useRef(null);

  const announce = useCallback((submission) => {
    const [sound, label] = sounds[submission.verdict] || ['/mp3-files/testing.mp3', submission.verdict];
    setLatestSubmission(submission);
    if (submission.verdict === 'OK') toast.success(label);
    else if (submission.verdict === 'SKIPPED') toast.warning(label);
    else toast.error(label);

    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Codeforces Verdict', {
        body: `Your latest verdict is: ${label}`,
        icon: '/images/CFlogo.png',
        tag: `codeforces-${submission.id}`,
      });
    }

    const audio = audioRef.current || new Audio();
    audioRef.current = audio;
    audio.src = sound;
    audio.volume = 1;
    audio.currentTime = 0;
    audio.play().catch(() => toast.warning('Verdict received, but the browser blocked audio. Click Start Monitoring again to enable sound.'));
  }, []);

  const stopMonitoring = useCallback((notify = true) => {
    sourceRef.current?.close();
    sourceRef.current = null;
    setMonitoring(false);
    setConnectionState('stopped');
    if (notify) toast.info('Monitoring stopped');
  }, []);

  const startMonitoring = useCallback(async () => {
    if (!isAuthenticated || !isAuthorized || sourceRef.current) return;

    // Unlock audio while this function is still running from a user gesture.
    const audio = new Audio('/mp3-files/testing.mp3');
    audio.volume = 0;
    audio.play().then(() => {
      audio.pause();
      audio.currentTime = 0;
      audio.volume = 1;
    }).catch(() => {});
    audioRef.current = audio;

    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }

    const source = new EventSource(eventStreamUrl('/codeforces/monitor'), { withCredentials: true });
    sourceRef.current = source;
    setMonitoring(true);
    setConnectionState('connecting');

    source.addEventListener('ready', () => {
      setConnectionState('connected');
      toast.success('Monitoring started');
    });
    source.addEventListener('verdict', (event) => announce(JSON.parse(event.data)));
    source.addEventListener('monitor-error', (event) => {
      const data = JSON.parse(event.data);
      toast.error(data.message || 'Monitoring error');
    });
    source.onerror = () => {
      if (sourceRef.current === source) setConnectionState('reconnecting');
    };
  }, [announce, isAuthenticated, isAuthorized]);

  useEffect(() => {
    if (!isAuthenticated || !isAuthorized) stopMonitoring(false);
  }, [isAuthenticated, isAuthorized, stopMonitoring]);

  useEffect(() => () => sourceRef.current?.close(), []);

  return (
    <VerdictMonitoringContext.Provider value={{ monitoring, connectionState, latestSubmission, startMonitoring, stopMonitoring }}>
      {children}
    </VerdictMonitoringContext.Provider>
  );
};

export const useVerdictMonitoring = () => useContext(VerdictMonitoringContext);
