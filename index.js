const p = document.createElement("p")
const buttonSumbitElement = document.getElementById('submit-button')
const buttonExitElement = document.getElementById('exit-button')
const buttonInstructionsElement = document.getElementById('instructions')
const userInputElement = document.getElementById("user-guess")
const rowsTrysElement = document.getElementById("rows-trys")
const rowsGuessElement = document.getElementById("rows-guess")
const rowsResultElement = document.getElementById('rows-result')
const popupElement = document.getElementById('popup')
const errorMessageElement = document.getElementById("error-message")
const winMessageElement = document.getElementById("win-message")
const totalScoreElement = document.getElementById('totalScore')
const scoreElement = document.getElementById('score')
let showPopup = false;
let hidePopup = true
buttonInstructionsElement.addEventListener('click', function() {
showPopup=!showPopup
if(showPopup) {
  popupElement.classList.remove('unvisbale')
  popupElement.classList.add('visbale')
}
else {
  popupElement.classList.remove('visbale')
  popupElement.classList.add('unvisbale')
}

})
buttonExitElement.addEventListener('click' , function() {
  hidePopup = false
  showPopup= false
  if(!hidePopup) {
    popupElement.classList.remove('visbale')
  popupElement.classList.add('unvisbale')
  }
})

let totalScoreLocalStorage = localStorage.getItem('totalScore')
if(totalScoreLocalStorage === null) totalScoreLocalStorage = localStorage.setItem('totalScore' , 0)
totalScoreElement.innerText = `🏆 Score : ${localStorage.getItem('totalScore')}`
totalScoreElement.innerText = `🏆 Score : ${localStorage.getItem('totalScore')}`
let totalScore = 0

let userInputData = []
let trys = 0

const createNewParagraphElement = (text) => {
  const p = document.createElement("p");
  p.textContent = text
  return p
}

const appendChildren = (parent , children) => {
  parent.append(children)
}


const randomNumber = () => {
  let number =  Math.trunc((Math.random()*9)+1)
  return number
}


const collectFourDiffrentNumbers = () => {
  let nums = []
  while(nums.length<4) {
    let number = randomNumber()
    if(!nums.includes(number)) nums.push(number)
    else continue
  }
  return nums.map(num=>num.toString())

}
let pickedNumbers = collectFourDiffrentNumbers()

const submitButtonHandler = () =>{
  let score = 0
  buttonSumbitElement.innerText = `Try`
  errorMessageElement.innerText = ''
  winMessageElement.innerText = ''
  let userWon = false
    let inputIsValid = false
    let invalidInputCounter = 0
    let userChoise = [...userInputElement.value]
    if(userChoise.length <4) {
      errorMessageElement.innerText = `4 numbers required`
      return
    }
    for(let i = 0 ; i <userChoise.length ; i++) {
      if(userChoise[i] == 0) {
        return errorMessageElement.innerText = `0 is not allowed`
      }

    }
    for(let i = 0 ; i<userChoise.length-1 ; i++) {
      for(let j = i+1 ; j<userChoise.length ; j++) { 
        if(userChoise[i] === userChoise[j]){ 
          invalidInputCounter++
          errorMessageElement.innerText = `Numbers Cannot Be Repeated`
          break
        }
      }

    }
    for(let i = 0 ; i<userChoise.length ; i++) {
      if(isNaN(userChoise[i])) {
        errorMessageElement.innerText = `Only Numbers Allowed !`
        return
      }
    }
    
    if(invalidInputCounter === 0)  inputIsValid = true 
    else return inputIsValid = false;
   if(inputIsValid) {
    userInputElement.value = ''
     trys++
     userInputData.push({trys: createNewParagraphElement(trys) , guess : createNewParagraphElement(userChoise),  A:null ,B:null , result:null })
     userInputData.forEach((input)=>appendChildren(rowsTrysElement , input.trys))
     userInputData.forEach((input)=>appendChildren(rowsGuessElement , input.guess))
    
    }
     let userGuess = []
     userInputData.map(input=> userGuess.push(input.guess.innerText.split(',')))
         userGuess.map(guess=>{
           let A = 0
           let B = 0
           for(let j = 0 ; j<pickedNumbers.length ; j++) {
             if(guess[j] === pickedNumbers[j] ) A++
             if(guess.includes(pickedNumbers[j])) B++
         }
         userInputData.A = A
         userInputData.B = B-A
         userInputData.result = ` ${A}A${B-A}B  `
         if(A === 4 && trys <=10) userWon = true
        }) 
        if(trys === 5 && !userWon) errorMessageElement.innerText = `You Have 5 More Trys.. Play Smart`
        if(trys === 7 && !userWon) errorMessageElement.innerText = `Beware.. 3  Trys Left  `
        if(trys === 9 && !userWon) errorMessageElement.innerText = `Last Try.. Play Smart `
        if(trys === 10 && !userWon)  {errorMessageElement.innerText = `You Lost The Game ,
         The Resualt Is ${pickedNumbers}
          Try Again...`
       buttonSumbitElement.innerText = `New`
       scoreElement.innerText = `  you Earned ${0} points`
   
       buttonSumbitElement.addEventListener('click' , ()=> {
         location.reload()
       })}
       if(userWon){ appendChildren(rowsResultElement , createNewParagraphElement(userInputData.result))
        winMessageElement.innerText = `Congratulations , You Won 🥇🏆`
        buttonSumbitElement.innerText = `New`
        score = 11-trys
        scoreElement.innerText = ` 🥇 You Earned ${score} Points`
        totalScoreLocalStorage+=score
        totalScoreLocalStorage = Number(localStorage.getItem('totalScore'))
        localStorage.setItem('totalScore', score + totalScoreLocalStorage)
        buttonSumbitElement.addEventListener('click' , ()=> {
          location.reload()
        })
      }
       else appendChildren(rowsResultElement , createNewParagraphElement(userInputData.result))
      
    }
      
    
