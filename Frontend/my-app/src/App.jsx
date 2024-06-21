import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [playerName, setPlayerName] = useState('User');
  const [userScores, setUserScores] = useState(0);
  const [compScores, setCompScores] = useState(0);
  const [userChoice, setUserChoice] = useState('');
  const [randomChoice, setRandomChoice] = useState('');
  const [message, setMessage] = useState("Let's play!");
  const [topPlayers, setTopPlayers] = useState([]);

  useEffect(() => {
    fetchTopPlayers();
  }, []);

  const fetchTopPlayers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/players');
      setTopPlayers(response.data);
    } catch (error) {
      console.error('Error fetching top players:', error);
    }
  };

  const saveName = () => {
    const name = prompt('Enter your name:');
    if (name) {
      setPlayerName(name);
    }
  };

  const setUserChoiceHandler = (choice) => {
    setUserChoice(choice);
    setCompChoice(choice);
  };

  const setCompChoice = (uChoice) => {
    const choices = ['ROCK', 'PAPER', 'SCISSORS'];
    const randomIndex = Math.floor(Math.random() * 3);
    const compChoice = choices[randomIndex];
    setRandomChoice(compChoice);
    compareResults(compChoice, uChoice);
  };

  const compareResults = (compChoice, userChoice) => {
    if (compChoice === userChoice) {
      setMessage("It's a tie!");
    } else if (
      (compChoice === 'ROCK' && userChoice === 'SCISSORS') ||
      (compChoice === 'PAPER' && userChoice === 'ROCK') ||
      (compChoice === 'SCISSORS' && userChoice === 'PAPER')
    ) {
      setMessage(`${playerName} wins!`);
      setUserScores(prevScores => prevScores + 1);
    } else {
      setMessage('Computer wins! Game over!');
      setCompScores(prevScores => prevScores + 1);
      gameOver();
    }
  };

  const gameOver = async () => {
    try {
      const response = await axios.post('http://localhost:5000/players', {
        name: playerName,
        scores: userScores
      });
      console.log('Player added:', response.data);
      fetchTopPlayers();
    } catch (error) {
      console.error('Error adding player:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Rock Paper Scissors Game</h1>
        <p>Welcome, {playerName}!</p>
        <p>{message}</p>
        <div className="choices">
          <button onClick={() => setUserChoiceHandler('ROCK')}>Rock</button>
          <button onClick={() => setUserChoiceHandler('PAPER')}>Paper</button>
          <button onClick={() => setUserChoiceHandler('SCISSORS')}>Scissors</button>
        </div>
        <div>
          <p>Your choice: {userChoice}</p>
          <p>Computer's choice: {randomChoice}</p>
        </div>
        <div>
          <p>Your scores: {userScores}</p>
          <p>Computer's scores: {compScores}</p>
        </div>
        <button onClick={saveName}>Change Name</button>
      </header>
      <div className="top-players">
        <h2>Top Players</h2>
        <ul>
          {topPlayers.map((player, index) => (
            <li key={index}>{player.name}: Scores: {player.scores}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
