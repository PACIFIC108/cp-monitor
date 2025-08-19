🚀 CP Submission Monitor

CP Submission Monitor is a code submission result notification app that automatically announces the verdict of your submissions on Codeforces.

During high-profile coding contests where thousands of candidates participate, the online judge often has a long queue. Contestants end up repeatedly switching tabs to check verdicts, losing concentration and valuable time—which can even lead to penalties.

This app solves that problem by consuming the Codeforces API in real-time and announcing the verdicts with audio notifications. Contestants can stay focused on their coding tab without interruptions.

🎯 Key Features

🔔 Automatic Verdict Announcements

Jury results are fetched in real-time.

Verdicts are announced using media files (audio).

No need to manually refresh or switch tabs.

⏱ Efficient Background Monitoring

Uses modern React hooks (useEffect, useState) for async data fetching.

Custom useInterval hook handles polling Codeforces API at regular intervals.

Ensures smooth UI without blocking user interactions.

🛡 Authentication & Security

JWT (JSON Web Token) for secure authentication.

Sessions + Cookies for persistent login state.

OAuth integration with Codeforces (future-ready) to verify unique handles.

👥 User Context Management

useContext for global state (authentication, user profile, friends).

Makes auth/session data accessible across all components.

🖥 Frontend UI

Built with React for a fast, component-driven architecture.

Styled with Tailwind CSS + shadcn/ui for a clean, minimal, and modern look.

Responsive UI to work smoothly across devices.

📊 Advanced Features (Planned / In-progress)

Leaderboard for friends → sortable by submission count or rating.

Live contest data fetching (problems, standings, friends’ progress).

Support for multiple coding platforms beyond Codeforces.

🛠 Tech Stack

Frontend: React, Tailwind CSS, shadcn/ui

Hooks & State Management: useState, useEffect, useContext, custom useInterval

Authentication: JWT, Sessions, OAuth (Codeforces)

Backend: Express.js (with CORS, JWT authentication, cookie-based sessions)

API: Codeforces REST API for live submissions and contest data

Notifications: Media files for audio verdict announcements