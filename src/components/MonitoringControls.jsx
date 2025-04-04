import React, { useState, useEffect } from 'react';
import HandleVerdict from './HandleVerdict';
import { toast } from 'sonner';

const MonitoringControls = ({ userHandle, success }) => {
    const [statusmessage, setstatusmessage] = useState('');
    const [monitoring, setMonitoring] = useState(false);
    const [lastsubmissionId, setLastsubmissionId] = useState('');
    const [monitoringInterval, setMonitoringInterval] = useState(null);
    const [latestVerdict, setlatestVerdict] = useState('');

    useEffect(() => {
        setstatusmessage("");
        setMonitoring(false);
        setlatestVerdict('');

        if (Notification.permission !== 'granted') {
            Notification.requestPermission()
                .then(permission => {
                    if (permission !== 'granted') {
                        console.warn("Notification permission not granted.");
                    }
                });
        }
    }, [success, userHandle]);

    if (!success) {
        return;
    }

    const getLastSubmission = async () => {
        try {
            const response = await fetch(`https://codeforces.com/api/user.status?handle=${userHandle}&from=1&count=1`);
            const data = await response.json();

            if (data.status === 'OK' && data.result.length > 0) {
                const submissionId = data.result[0].id;
                setLastsubmissionId(submissionId);
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
        await getLastSubmission(); // Ensure last submission is fetched before starting monitoring
        setMonitoring(true);
        toast.info("Monitoring has started!");

         if (monitoringInterval) {
            clearInterval(monitoringInterval);
         }

        const interval = setInterval(async () => {
            try {

                const response = await fetch(`https://codeforces.com/api/user.status?handle=${userHandle}&from=1&count=1`);
                const data = await response.json();


                if (data.status === 'OK' && data.result.length > 0) {
                    const latestSubmission = data.result[0];
                    const submissionId = latestSubmission.id;
                    const verdict = latestSubmission.verdict;
                      console.log(lastsubmissionId,submissionId)
                      console.log(verdict,latestVerdict)

                    setLastsubmissionId(prevId => {
                        if (prevId !== submissionId && verdict !== 'TESTING') {
                            setlatestVerdict(verdict);
                            return submissionId;
                        }
                        return prevId;
                    });
                }
            } catch (error) {
                toast.error("Error fetching submission status:");
                console.error("Error fetching submission status:", error);
            }
        }, 5000);

        setMonitoringInterval(interval);
    };

    const stopMonitoring = () => {
        setstatusmessage("");
        setMonitoring(false);
        setlatestVerdict(null);

        if (monitoringInterval) {
            clearInterval(monitoringInterval);
            setMonitoringInterval(null);
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
