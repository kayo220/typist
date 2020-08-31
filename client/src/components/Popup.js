import React, {useEffect} from 'react'
import {checkWin,checkEnd} from '../helpers/helpers'
const Popup = ({correctLetters, wrongLetters, selectedWord, setPlayable, time, playAgain}) => {
    let finalMessange = '';
    let finalMessageReviewWord = '';
    let playable = true;
    let verifyWin = checkWin(correctLetters,wrongLetters,selectedWord);
    // console.log("entered in popup")
    if (verifyWin === 'win'){
        finalMessange = "Congratulations, You Won! :)"
        playable = false;
    } else if(verifyWin === 'lose'){
        finalMessange = "Unfortunately, You Lost! :("
        finalMessageReviewWord = `The word was: ${selectedWord}`
        playable = false;
    } else if(checkEnd(time)){
        // console.log("time's over")
        finalMessange = "Time's over! :)"
        playable = false;
    }
    useEffect(()=>{
        setPlayable(playable)
    })
    return (
    <div className="popup-container" style = {finalMessange !== '' ? {display: 'flex'} :  {}}>
        <div className="popup">
            <h2>{finalMessange}</h2>
            <h3>{finalMessageReviewWord}</h3>
            <button onClick = {playAgain}>Play Again</button>
        </div>
    </div>
    )
}

export default Popup
