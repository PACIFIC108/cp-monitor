import React, { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Loader2, PlayCircle, Square, ExternalLink } from "lucide-react";
import HandleVerdict from "../components/HandleVerdict";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";


const MonitoringPanel = () => {
	const [statusMessage, setStatusMessage] = useState("");
	const [monitoring, setMonitoring] = useState(false);
	const [latestVerdict, setLatestVerdict] = useState("");

	const lastSubmissionIdRef = useRef(null);
	const intervalRef = useRef(null);
	const { isAuthorized, userHandle } = useAuth();

	const navigate = useNavigate();

	// Reset state whenever user changes
	useEffect(() => {
		if (!isAuthorized || !userHandle) navigate('/app');
		setStatusMessage("");
		setMonitoring(false);
		setLatestVerdict("");
		lastSubmissionIdRef.current = null;

		if (Notification.permission !== "granted") {
			Notification.requestPermission().then((permission) => {
				if (permission !== "granted") {
					console.warn("Notification permission not granted.");
				}
			});
		}

		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, [isAuthorized, userHandle]);

	

	// Get the latest submission ID initially
	const getLastSubmission = async () => {
		try {
			const response = await fetch(
				`https://codeforces.com/api/user.status?handle=${userHandle}&from=1&count=1`
			);
			const data = await response.json();

			if (data.status === "OK" && data.result.length > 0) {
				lastSubmissionIdRef.current = data.result[0].id;
			} else {
				toast.warning("Submission not fetched");
			}
		} catch (error) {
			toast.error("Error fetching submission status");
			console.error(error);
		}
	};

	const startMonitoring = async () => {
		setStatusMessage("Monitoring submissions...");
		await getLastSubmission();
		setMonitoring(true);
		toast.info("Monitoring started!");

		if (intervalRef.current) clearInterval(intervalRef.current);

		intervalRef.current = setInterval(async () => {
			try {
				const response = await fetch(
					`https://codeforces.com/api/user.status?handle=${userHandle}&from=1&count=1`
				);
				const data = await response.json();

				if (data.status === "OK" && data.result.length > 0) {
					const latestSubmission = data.result[0];
					const submissionId = latestSubmission.id;
					const verdict = latestSubmission.verdict;

					if (
						lastSubmissionIdRef.current !== submissionId &&
						verdict !== "TESTING"
					) {
						lastSubmissionIdRef.current = submissionId;
						setLatestVerdict(verdict);
					}
				}
			} catch (error) {
				toast.error("Error fetching submission status");
				console.error(error);
			}
		}, 10000);
	};

	const stopMonitoring = () => {
		setStatusMessage("");
		setMonitoring(false);
		setLatestVerdict(null);

		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}

		toast.info("Monitoring stopped");
	};

	return (
		<Card className="w-full max-w-xl mx-auto p-6 rounded-2xl shadow-lg mt-32">
			<CardHeader>
				<h2 className="text-2xl font-semibold text-center">
					Submission Monitoring
				</h2>
				<p className="text-sm text-gray-500 text-center">
					Handle: <span className="font-medium">{userHandle}</span>
				</p>
			</CardHeader>

			<CardContent className="flex flex-col gap-6">
				{/* Monitoring Status */}
				{statusMessage && (
					<div className="flex justify-center items-center gap-2 text-gray-700">
						<Loader2 className="h-4 w-4 animate-spin text-blue-500" />
						<span>{statusMessage}</span>
					</div>
				)}

				{/* Start / Stop Monitoring */}
				{!monitoring ? (
					<Button
						onClick={startMonitoring}
						className="w-full bg-green-500 hover:bg-green-600"
					>
						<PlayCircle className="mr-2 h-5 w-5" /> Start Monitoring
					</Button>
				) : (
					<Button
						onClick={stopMonitoring}
						className="w-full bg-red-500 hover:bg-red-600"
					>
						<Square className="mr-2 h-5 w-5" /> Stop Monitoring
					</Button>
				)}

				{/* Verdict Output */}
				{latestVerdict && (
					<div className="bg-gray-100 rounded-xl p-4 text-center shadow-inner">
						<HandleVerdict
							latestVerdict={latestVerdict}
							userHandle={userHandle}
						/>
					</div>
				)}

				{/* Extra Options */}
				<div className="flex flex-col gap-3 pt-4 border-t">
					<Button
						variant="outline"
						onClick={() =>
							window.open(`https://codeforces.com/submissions/${userHandle}`, "_blank")
						}
					>
						View Submissions <ExternalLink className="ml-2 h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						onClick={() =>
							window.open(`https://codeforces.com/profile/${userHandle}`, "_blank")
						}
					>
						View Profile <ExternalLink className="ml-2 h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						onClick={() => window.open("https://codeforces.com/contests", "_blank")}
					>
						Upcoming Contests <ExternalLink className="ml-2 h-4 w-4" />
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default MonitoringPanel;
