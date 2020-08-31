import React from 'react'

const SortedWord = ({selectedWord}) => {
    // const errors = wrongLetters.length;

    return (
        <div height="250" width="200" className="figure-container">
        {selectedWord.split('').map((letter,i) =>{
                return(
                <p className="letter" key={i}>
                    {letter}
                </p>
                )
            })           
            }
            {/* <line x1="60" y1="20" x2="140" y2="20" />
            <line x1="140" y1="20" x2="140" y2="50" />
            <line x1="60" y1="20" x2="60" y2="230" />
            <line x1="20" y1="230" x2="100" y2="230" /> */}

            
      </div>
    )
}

export default SortedWord
