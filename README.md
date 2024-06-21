# Multiplayer
Multiplayer is a project that implements a Rock Paper Scissors game with a leaderboard feature, utilizing React for the frontend and Node.js for the backend.
```
Multiplayer
├── Backend/
│   ├── .gitignore
│   ├── index.js
│   ├── package-lock.json
│   └── package.json
├── Frontend/
│   └── my-app/
│   │   ├── .eslintrc.cjs
│   │   ├── .gitignore
│   │   ├── README.md
│   │   ├── index.html
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── public/
│   │   │   └── vite.svg
│   │   ├── src/
│   │   │   ├── App.css
│   │   │   ├── App.jsx
│   │   │   ├── assets/
│   │   │   │   └── react.svg
│   │   │   ├── index.css
│   │   │   └── main.jsx
│   │   └── vite.config.js
└── README.md
```
Project Overview
This project consists of two main components:

Backend/: Node.js server responsible for handling game logic and managing player data.

Frontend/my-app/: React application providing the user interface for the Rock Paper Scissors game. It includes components for gameplay, leaderboard display, and user interaction.

Setup Instructions
Backend Setup
1.Navigate to the Backend directory:
```
cd Backend

```
2.Install dependencies:
```
npm install

```
3.Start the backend server:
```
npm run server
```
```
The server will run at https://multiplayer-o875.onrender.com/players
```
Frontend Setup
1.Navigate to the Frontend/my-app directory:
```
cd Frontend/my-app

```
2.Install dependencies:
```
npm install
```
3.Start the React development server:
```
npm run dev

```
```
The React app will run at https://multiplayer-git-main-dayasagar-dalais-projects.vercel.app/
```
Usage
Gameplay: Open the React app in your browser (https://multiplayer-git-main-dayasagar-dalais-projects.vercel.app/). Enter your name and play Rock Paper Scissors against the computer. Your scores and the computer's scores will be displayed.
Leaderboard: The top players' names and scores are displayed in a leaderboard format within the React app.
Technologies Used
Frontend: React, Chakra UI, Axios
Backend: Node.js, Express, Axios
