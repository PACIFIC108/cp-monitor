import React, { useState, useEffect, useRef } from 'react';
import HandleVerdict from './HandleVerdict';
import { toast } from 'sonner';

const MonitoringControls = ({ userHandle, success }) => {
    const [statusmessage, setstatusmessage] = useState('');
    const [monitoring, setMonitoring] = useState(false);
    const [latestVerdict, setlatestVerdict] = useState('');

    const lastSubmissionIdRef = useRef(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        setstatusmessage("");
        setMonitoring(false);
        setlatestVerdict('');
        lastSubmissionIdRef.current = null;

        if (Notification.permission !== 'granted') {
            Notification.requestPermission()
                .then(permission => {
                    if (permission !== 'granted') {
                        console.warn("Notification permission not granted.");
                    }
                });
        }

        return () => {
            // Cleanup on unmount
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [success, userHandle]);

    if (!success) return null;

    const getLastSubmission = async () => {
        try {
            const response = await fetch(`https://codeforces.com/api/user.status?handle=${userHandle}&from=1&count=1`);
            const data = await response.json();

            if (data.status === 'OK' && data.result.length > 0) {
                const submissionId = data.result[0].id;
                lastSubmissionIdRef.current = submissionId;
            } else {
                toast.warning("Submission not fetched");
                console.warn("Submission not fetched");
            }
        } catch (error) {
            toast.error("Error fetching submission status:");
            console.error("Error fetching submission status:", error);
        }
    };

    const StartMonitoring = async () => {
        setstatusmessage("Monitoring has started");
        await getLastSubmission();
        setMonitoring(true);
        toast.info("Monitoring has started!");

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(async () => {
            try {
                const response = await fetch(`https://codeforces.com/api/user.status?handle=${userHandle}&from=1&count=1`);
                const data = await response.json();

                if (data.status === 'OK' && data.result.length > 0) {
                    const latestSubmission = data.result[0];
                    const submissionId = latestSubmission.id;
                    const verdict = latestSubmission.verdict;

                    // console.log(lastSubmissionIdRef.current, submissionId);
                    // console.log(verdict, 'latestVerdict');

                    if (lastSubmissionIdRef.current !== submissionId && verdict !== 'TESTING') {
                        lastSubmissionIdRef.current = submissionId;
                        setlatestVerdict(verdict);
                    }
                }
            } catch (error) {
                toast.error("Error fetching submission status:");
                console.error("Error fetching submission status:", error);
            }
        }, 5000);
    };

    const stopMonitoring = () => {
        setstatusmessage("");
        setMonitoring(false);
        setlatestVerdict(null);

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        toast.info('Monitoring stopped');
    };

    return (
        <div>
            <p id="statusofmonitoring">
                {statusmessage}
                {monitoring && (
                    <span className="dots">
                        <span>.</span><span>.</span><span>.</span>
                    </span>
                )}
            </p>

            {!monitoring ? (
                <button className="btn mt-4" onClick={StartMonitoring}>
                    Start Monitoring Your Submission
                </button>
            ) : (
                <button className="btn mt-4" onClick={stopMonitoring}>
                    Stop Monitoring
                </button>
            )}

            {latestVerdict && <HandleVerdict latestVerdict={latestVerdict} userHandle={userHandle} />}
        </div>
    );
};

export default MonitoringControls;
