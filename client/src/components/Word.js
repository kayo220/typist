import React from 'react'

const Word = ({selectedWord, correctLetters}) => {
    return (
        <div className="word">
            {selectedWord.split('').map((letter,i) =>{
                return(
                <span className="letter" key={i}>
                    {correctLetters[i] ==selectedWord[i] ? letter : ''}
                </span>
                )
            })           
            }
        </div>
    )
}

export default Word
