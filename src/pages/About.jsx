import React from 'react'
import { FaCheckCircle, FaBell, FaCode, FaRocket } from "react-icons/fa";

function About() {
	return (
		
     <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold text-blue-400 mb-6">About CP Submission Monitoring App</h1>
      
      {/* Main Content Container */}
      <div className="max-w-4xl bg-gray-800 shadow-lg rounded-2xl p-6">
        <p className="text-lg text-gray-300 mb-4">
          The <span className="text-blue-400 font-semibold">CP Submission Monitoring App</span> is designed to help competitive programmers by providing <span className="text-green-400">automated verdict notifications</span> for their code submissions on <span className="text-yellow-400">Codeforces</span>. 
        </p>
        
        <p className="text-gray-400 mb-4">
          During high-profile contests, submission queues can be long, forcing candidates to constantly switch tabs to check their verdicts. This disrupts their concentration and wastes valuable time, often leading to penalties. Our app solves this by <span className="text-green-400">automatically announcing verdicts with different sounds for "Accepted," "Wrong Answer," etc.</span> using media files, so users can stay focused on a single tab.
        </p>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="flex items-center gap-4 p-4 bg-gray-700 rounded-xl">
            <FaBell className="text-yellow-400 text-2xl" />
            <p className="text-gray-300">Real-time notifications via Codeforces API</p>
          </div>
          <div className="flex items-center gap-4 p-4 bg-gray-700 rounded-xl">
            <FaCheckCircle className="text-green-400 text-2xl" />
            <p className="text-gray-300">Audio verdict announcements for instant updates</p>
          </div>
          <div className="flex items-center gap-4 p-4 bg-gray-700 rounded-xl">
            <FaCode className="text-blue-400 text-2xl" />
            <p className="text-gray-300">Efficient data fetching with React hooks</p>
          </div>
          <div className="flex items-center gap-4 p-4 bg-gray-700 rounded-xl">
            <FaRocket className="text-purple-400 text-2xl" />
            <p className="text-gray-300">Smooth UI for a seamless coding experience</p>
          </div>
        </div>
      </div>

      {/* Future Improvements Section */}
      <h2 className="text-3xl font-bold text-blue-300 mt-10">Future Improvements</h2>
      <ul className="mt-4 text-gray-400 space-y-2 text-lg">
        <li>📌 Support for multiple online judges (LeetCode, AtCoder, etc.)</li>
        <li>📌 Mobile-friendly version for on-the-go monitoring</li>
        <li>📌 Submission History & Trends → Track user progress and performance analysis</li>
        <li>📌 Leaderboard Integration → Show friends' verdicts for motivation and comparison</li>
      </ul>
    </div>
  );
}

export default About