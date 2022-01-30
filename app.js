document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')

    const width = 10

    let currentIndex = 0 //First div in our grid
    let appleIndex  = 0 
    let currentSnake = [2,1,0] //So 2 is the head, 0 is the tail and 1 the body
    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0


    //To start and restart the game
    function startGame(){
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0
        randomApple()
        direction = 1
        scoreDisplay.innerText = score
        intervalTime = 500
        currentSnake = [2,1,0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, intervalTime)
    }

    //Function that deals with ALL the ove outcomes of the Snake 
    function moveOutcomes () {
        
        //Deals with snake hitting border and snake hitting self
        if (
            (currentSnake[0] + width >= (width * width) && direction === width) || //If snake hits bottom
            (currentSnake[0] % width === width -1 && direction === 1) || //If snake hits right wall
            (currentSnake[0] % width === 0  && direction === -1) || //If snake hits left wall
            (currentSnake[0] - width < 0 && direction === -width) || //If snake hits the top
            squares[currentSnake[0] + direction].classList.contains('snake') //If snake goes into itself
        ) {
            return clearInterval(interval) //This will clear the interval if any of the above happens
        }
        const tail = currentSnake.pop() //Removes last ite of the array and shows it
        squares[tail].classList.remove('snake') //Removes class of snake from the tail
        currentSnake.unshift(currentSnake[0] + direction) //gives direction to the head of the array

        //Deals with snake getting apple
        if(squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple')
            squares[tail].classList.add('snake')
            currentSnake.push(tail)
            randomApple()
            score++
            scoreDisplay.textContent = score
            clearInterval(interval)
            intervalTime *= speed
            interval = setInterval(moveOutcomes, intervalTime)
        }
        squares[currentSnake[0]].classList.add('snake')
    }

    //Generate new apple once apple is eaten
    function randomApple () {
        do {
            appleIndex = Math.floor(Math.random() * squares.length)
        } while(squares[appleIndex].classList.contains('snake')) {
            squares[appleIndex].classList.add('apple')
        }
    }

    //Assign functions to keycode
    function control(e) {
        squares[currentIndex].classList.remove('snake')

        if(e.keyCode === 39){
            direction = 1 // If we press the right arrow, the snake will go right one div
        } else if (e.keyCode === 38) {
            direction = -width // If we press the up arrow, the snake will go back ten divs, appearing to go up
        }
        else if (e.keyCode === 37) {
            direction = -1 // If we press the left arrow, the snake will go left one div
        }
        else if (e.keyCode === 40) {
            direction = +width // If we press the up arrow, the snake will go down ten divs
        }
    }

    document.addEventListener('keyup', control)
    startBtn.addEventListener('click', startGame)

})