import React from 'react'
const BrailleButtons = ({controlKeys}) => {
    controlKeys = [controlKeys[2],controlKeys[1],controlKeys[0],controlKeys[6],
                    controlKeys[3],controlKeys[4],controlKeys[5],controlKeys[7]]
    return (
        <div className="buttons">
            {controlKeys.map((letter,i) =>{
                if(letter === " "){
                    letter = "space"
                }
                return(
                <span id={letter} className="letter" key={i}>
                    {letter}
                    {/* {correctLetters[i] ==BrailleButtons[i] ? letter : ''} */}
                </span>
                )
            })           
            }
        </div>
    )
}

export default BrailleButtons
