import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';


function App() {
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetch("https://localhost:500/")
    .then(res => res.json())
    .then(data => setMessage(data.message));
  }, []);

  return (
    <div>
      <h1>Message from Flask: {message}</h1>
    </div>
  );
}

export default App;
