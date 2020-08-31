import React, {useEffect} from 'react'
import {checkWin} from '../helpers/helpers'
const Popup = ({correctLetters, wrongLetters, selectedWord, setPlayable, playAgain}) => {
    let finalMessange = '';
    let finalMessageReviewWord = '';
    let playable = true;
    let verifyWin = checkWin(correctLetters,wrongLetters,selectedWord);
    if (verifyWin === 'win'){
        finalMessange = "Congratulations, You Won! :)"
        playable = false;
    } else if(verifyWin === 'lose'){
        finalMessange = "Unfortunately, You Lost! :("
        finalMessageReviewWord = `The word was: ${selectedWord}`
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
