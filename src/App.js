import React, {useState, useEffect} from 'react';
import Header from './components/Header.js';
import Figure from './components/Figure.js';
import WrongLetters from './components/WrongLetters.js';
import Word from './components/Word.js';
import Popup from './components/Popup.js';
import Notification from './components/Notification.js';
import './App.css';
import {showNotification as show} from './helpers/helpers.js';


  const figureParts = document.querySelectorAll('.figure-part');

  const words = ['application', 'programming', 'interface', 'wizard'];

  let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {
  const [playable, setPlayable] = useState(true)
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setwrongLetters] = useState([]);
  const [showNotification, setshowNotification] = useState(false);


  useEffect (() => {
    const handleKeyDown = event => {
      console.log("teste");
      const {key, keyCode} = event;
        if (playable && keyCode >= 65 && keyCode <= 90) {
          const letter = key.toLowerCase();
    
          if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
              // correctLetters.push(letter);
              setCorrectLetters(currentLetters => [...currentLetters, letter])
              // show(setshowNotification)
            } else {
              show(setshowNotification)
            }
          } else {
            if (!wrongLetters.includes(letter)) {
              // wrongLetters.push(letter);
              setwrongLetters(wrongLetters => [...wrongLetters, letter])
    
              // updateWrongLettersEl();
            } else {
              show(setshowNotification)
            }
          }
        }
      }    
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }, [correctLetters,wrongLetters,playable]/*para chamar apenas a primera vez q renderizar*/);

  function playAgain(){
    setPlayable(true);

    setCorrectLetters([]);
    setwrongLetters([]);
    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }

  return (
    <>
      <Header />
      <div class="game-container">
        <Figure wrongLetters={wrongLetters}/>
      <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      <WrongLetters wrongLetters ={wrongLetters}/>
      </div>

      <Popup correctLetters = {correctLetters} wrongLetters={wrongLetters} 
      selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain}/>
      <Notification showNotification={showNotification}/>
    </>
  );
}

export default App;
