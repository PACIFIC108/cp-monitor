import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

const HandleVerdict = ({ latestVerdict }) => {
  const [verdictDisplay, setVerdictDisplay] = useState('');

  useEffect(() => {
      console.log(latestVerdict)
    setVerdictDisplay(`Latest Verdict: ${latestVerdict}`);

    if (Notification.permission === 'granted') {
      new Notification('Codeforces Verdict', {
        body: `Your latest verdict is: ${latestVerdict}`,
        icon: '/images/CFlogo.png',
      });
    }
     
let audio;
    switch (latestVerdict) {
      case 'OK':
        toast.success('ACCEPTED');
        audio = new Audio('/mp3-files/accepted.mp3');
        break;
      case 'MEMORY_LIMIT_EXCEEDED':
        toast.error('MEMORY_LIMIT_EXCEEDED');
        audio = new Audio('/mp3-files/mle.mp3');
        break;
      case 'TIME_LIMIT_EXCEEDED':
        toast.error('TIME_LIMIT_EXCEEDED');
        audio = new Audio('/mp3-files/tle.mp3');
        break;
      case 'WRONG_ANSWER':
        toast.error('WRONG_ANSWER');
        audio = new Audio('/mp3-files/wrong ans.mp3');
        break;
      case 'COMPILATION_ERROR':
        toast.error('COMPILATION_ERROR');
        audio = new Audio('/mp3-files/compilation err.mp3');
        break;
      case 'IDLENESS_LIMIT_EXCEEDED':
        toast.error('IDLENESS_LIMIT_EXCEEDED');
        audio = new Audio('/mp3-files/ile.mp3');
        break;
      case 'RUNTIME_ERROR':
        toast.error('RUNTIME_ERROR');
        audio = new Audio('/mp3-files/runtime err.mp3');
        break;
      case 'FAILED':
        toast.error('FAILED');
        audio = new Audio('/mp3-files/failed.mp3');
        break;
      case 'SKIPPED':
        toast.warning('SKIPPED');
        audio = new Audio('/mp3-files/skipped.mp3');
        break;
      default:
        audio = new Audio('/mp3-files/testing.mp3');
        break;
    }

    audio.volume = 1.0;
    audio.play().catch(error => console.error('Audio playback error:', error));

  }, [latestVerdict]);


  return <div id="verdictDisplay">{verdictDisplay}</div>;
};

export default HandleVerdict;
