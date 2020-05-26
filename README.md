# Connect Four

This is a siple connect four game written in Javascript, I used the codesandbox.io platform for development

Link: https://r8d0p.csb.app/

## How you play the game

You will start as player Red
You will take your go as player Yellow
You will not be allowed to go to a taken square
Once your go is taken and you did not win, It will be player yellow turn
The gamer will continue until a winning combination of four is reached by player red or player yellow winning combination was found.


## How this game works
- **gameOn()** Activated when a player press Start. 
Activates the board by adding event listeners to the squares, disables the start button and sets the current player
- **gameOver()** Activated when a player press Stop or a player has won.
 Disables the board by removing the event listeners of the squares, clears the board from the red an yellow piece and enables tha start button
- **placePiece()** Activated when a player clicks on a square of the board. 
Get the clicked square, if the square is not filled the draw the piece and(draw() called) and move it at the bottom (move() called)
- **draw()** Sets a piece on the board
- **undraw()** Removes a piece from the board
- **move()** Moves a piece to the bottom of the board like an animation and checks for collision with another piece. When the animation ends. checks for a winner (checkWinner() called) or changes the player (nextPlayer() called).
- **nextPlayer()** Switches the player from red to yellow and vice versa. 
- **checkWinner()** checks if there is a winner vertically, horizontally, and diagonally after every move 
- **isFilled()** checks if the current square is filled 
- **isLastRow()** checks is the current square is at the bottom of the board

## Built-in Functions used
- setInterval()
- clearinterval()
- foreach()
- from()
- innerHTML()
- querySelector()
- querySelectorAll()
- createElement()
- setAttribute()
- appendChild()
- addEventListener()
- removeEventListener()
- classList.add()
- classList.remove()
- classList.contains()