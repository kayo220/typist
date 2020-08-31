export function showNotification (setter){
    setter(true)
        setTimeout(() => {
            setter(false)
        }, 2000);
    
}

export function checkWin(correctLetters, wrongLetters, word){
    let status = ''
    // console.log("selectedWord",word)
    // console.log("correct letters",correctLetters.toString().replace(/,/g, ''))
    //check wins
    if(word === correctLetters.toString().replace(/,/g, '')){
        status = "win"
    }
    //check for lost 
    // else if(wrongLetters.length === 6){
    //     status = "lose"
    // }
    // console.log("status", status)
    return status;
}
export function checkEnd(time){
    return time === 0
}


function contains(fullArray, contain){
    return JSON.stringify(fullArray) == JSON.stringify(contain)
 }
 function matchesAll(fullArray, contain){
   let search = 0;
   for( let element of fullArray){
     if(contains(element,contain)){
       return search;
     }
     search++;
   }
   return -1;
 }
 export function brailleToLatin(keysPressed, controlKeys = ['f','d','s','j','k','l',' ','Backspace']){
   //controlKeys = 1 2 3 4 5 6 7 8 on braille typewriter machine 3 2 1 7 4 5 6 7 8
   //example of controlKeys f d s j k l space backspace
   let alphabet = [
    [0],[0,1],[0,3], [0,3,4], [0,4], [0,1,3], [0,1,3,4], [0,1,4], [1,3], [1,3,4], [0,2], [0,1,2], [0,2,3],// a b c d e f g h i j k l m
    [0,2,3,4], [0,2,4], [0,1,2,3], [0,1,2,3,4], [0,1,2,4], [1,2,3], [1,2,3,4],[0,2,5],[0,1,2,5],[1,3,4,5], // n o p q r s t u v w 
    [0,2,3,5], [0,2,3,4,5], [0,2,4,5], [6], [7] //x y z space backspace    
  ]
   keysPressed = Object.keys(keysPressed);
   let keysNotUsedAmount = 0
   let buttonsPressed = []
   controlKeys.forEach((controlKey,i) => {
         if(keysPressed.indexOf(controlKey) < 0){
           controlKeys[i] = '*';
           keysNotUsedAmount++;
         }else{ 
           buttonsPressed.push(i)
         }
   });
   const letterCode = matchesAll(alphabet,buttonsPressed);
   let letter = letterCode >= 0 && letterCode <=25 ? String.fromCharCode(97+letterCode) : 
                           letterCode==26 ? "space" : letterCode==27 ? "backspace" : undefined 
   return letter
 }
 
