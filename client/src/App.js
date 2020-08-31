import React, {useState, useEffect} from 'react';
import Header from './components/Header.js';
// import Figure from './components/Figure.js';
import SortedWord from './components/SortedWord.js';
import WrongLetters from './components/WrongLetters.js';
import Clock from './components/Clock.js';
import Word from './components/Word.js';
import Popup from './components/Popup.js';
import Notification from './components/Notification.js';
import BrailleButtons from './components/BrailleButtons.js';
import './App.css';
import {showNotification as show, brailleToLatin} from './helpers/helpers.js';
import axios from 'axios';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter 
} from "react-router-dom";
const figureParts = document.querySelectorAll('.figure-part');
const words = ['application', 'programming', 'interface', 'wizard'];
let errors = [{expected: [], given: []}]

let selectedWord = words[Math.floor(Math.random() * words.length)];
let wordsCompleted = []
let timeToWord = []
const coutDown = 20; //total time
let auxCoutDown = coutDown; //time between words
let isBraillestick = false;
let controlKeys = ['f','d','s','j','k','l',' ','Backspace']
let keysPressed = {}
let sortedWords = []
let username = ""
sortedWords.push(selectedWord);
//keysPressed
function App() {
  const [playable, setPlayable] = useState(true)
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setwrongLetters] = useState([]);
  const [showNotification, setshowNotification] = useState(false);
  const [time, setTime] = useState([coutDown]);
  // let received = [[]]
  useEffect (() => {
    if(isBraillestick){
      const handleKeyDown = event => {
        const {key, keyCode} = event;
        if (keyCode >= 65 && keyCode <= 90) {
          console.log("aqui",document.getElementById(event.key));
          write(key)
        }
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }else{
      const handleKeyDown = event =>{
        if (controlKeys.includes(event.key)) {
          var search = event.key === " " ? "space" : event.key
          var element = document.getElementById(search);
          if(element !== undefined && element!==null){
                element.classList.add("pressed")
                keysPressed[search] = true;
          }
        }
      }
      const handleKeyUp = event =>{
        if (Object.keys(keysPressed).length > 0){
          Object.keys(keysPressed).forEach(key => {
            var aux = key === " " ? "space" : key //resolving id space 
            document.getElementById(key).classList.remove("pressed")
          });
            var writeLetter = brailleToLatin(keysPressed)
            writeLetter = writeLetter !== undefined ? writeLetter : "*"
            write(writeLetter)
        }
        keysPressed = [];
        //keysPressed.[event.key];
      }
      window.addEventListener('keydown', handleKeyDown)
      window.addEventListener('keyup', handleKeyUp)
      return () => {window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)}
    }
    }, [correctLetters,wrongLetters,playable]/*para chamar apenas a primera vez q renderizar*/);

  function write(letter){
    console.log(username)

    if (playable) {
      if (selectedWord[correctLetters.length] === letter) {
        setCorrectLetters(currentLetters => [...currentLetters, letter])
      } else {
        const word = selectedWord
        const expected = selectedWord[correctLetters.length]
        const given = letter
        const phrase = `From word: ${word} expected [${expected}] given [${given}]`
        errors[wordsCompleted.length]['expected'].push(expected);
        errors[wordsCompleted.length]['given'].push(given);
        setwrongLetters(wrongLetters => [...wrongLetters, letter])
      }
    }
  }  
  function logSubmition(log){

    axios.post(`/submit`, {log})
      .then(res => {
        console.log(res);
        console.log("aqui")
      })
  }
  function playAgain(){
    if(time>0){

      setPlayable(true);
      // setTime([10]);
      setCorrectLetters([]);
      setwrongLetters([]);
      wordsCompleted.push(selectedWord);
      timeToWord.push(auxCoutDown-time);
      errors.push({expected: [], given: []})
      // console.log(wordsCompleted)
      // console.log(timeToWord)
      // console.log(errors)
      auxCoutDown = time;
      const random = Math.floor(Math.random() * words.length);
      selectedWord = words[random];
      sortedWords.push(selectedWord);
    }
    if(time===0){
      var data = {username: username,
                  sortedWords: [],
                  typedWord: [],
                  timeToTypeWord: [],
                  given:[]
                  ,expected:[]}
      console.log("data is: ",data)
      var log = "Log Console"
      // console.log(wordsCompleted)
      if (correctLetters.length > 0)
        wordsCompleted.push(correctLetters.toString().replace(/,/g, ''))
      else
        wordsCompleted.push("")
      timeToWord.push(auxCoutDown-time);
      wordsCompleted.forEach((word,i) => {
        if(i < words.length -1){
          data['given'].push([])
          data['expected'].push([])
        }
        var aux=i;
        // console.log("errors",errors[i]['expected'])
        log += `\nFor word: ${sortedWords[i]} typed: ${word}
               Time to Type: ${timeToWord[i]} s
               Errors found: `;
              data['sortedWords'].push(sortedWords[i])
              data['typedWord'].push(word)
              data['timeToTypeWord'].push(timeToWord[i])

        var errorsLog = '';
        if(errors[i] !== undefined){
          errors[i]['expected'].forEach((error,i) => {
              errorsLog+= `expected: [${error}] given: [${errors[aux]["given"][i]}]\n
                  ` 
                  data['given'][aux].push(errors[aux]["given"][i])
                  data['expected'][aux].push(error)
                });
        log+= errorsLog;
        }
      });
      logSubmition(data)
      console.log (log)
    }
  }
   function onClockChange(){
    setTime(time-1);
  }
  function getTime(){
    return time
  }
  function setUserName(){
    username = document.getElementById("name").value
    // logSubmition();
  }
  return (
    <Router>
      <Switch>
          <Route path="/typist" exact>
            <Header />
            <div className="game-container" key={document.location.href} >
              {/* <Figure wrongLetters={wrongLetters}/> */}
            <SortedWord selectedWord={selectedWord}/>
            <Clock playable={playable} getTime={getTime} setTime={setTime} onClockChange={onClockChange}/>
            <Word selectedWord={selectedWord} correctLetters={correctLetters} />
            <WrongLetters wrongLetters ={wrongLetters}/>

            </div>
            {!isBraillestick && <BrailleButtons controlKeys={controlKeys}/>}

            <Popup correctLetters = {correctLetters} wrongLetters={wrongLetters} 
            selectedWord={selectedWord} setPlayable={setPlayable} time={time} playAgain={playAgain}/>
            <Notification showNotification={showNotification}/>
          </Route>
          <Route path="/">
            <div className="game-container">
            <label className="label_name" htmlFor="name">Username</label>
              <input type="text" id="name"/>
            <Link to="/typist"><button onClick={setUserName} className="button_game">Start The Braille Typist</button></Link>

            </div>
          </Route>
      </Switch>

    </Router>
  );
}

export default App;
