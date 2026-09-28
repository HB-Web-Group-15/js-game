# JS Sudoku Game
This project is for Laboration 1 in Development of Web Applications at the University of Borås
We are building a Sudoku game using HTML, CSS, JS.

## Project Requirements
The project must satisfy these requirements:
- Have a main menu where the user can select a difficulty for the board and start the game
- Have an instructions page where the user can read how to play the game
- Have a scores page where the user can see their past scores, using localStorage
- Have a settings page where the user can change different parts of the game
- Let the user modify the board by inputting a single number in a cell
- Let the user reset the board back to it's original state using a clear button
- Show the user how much time they are spending on the current game, which should be togglable in Settings
- Let the user check their result, and also change in Settings how helpful the check is
- Let the user create notes in the board, using a toggle switch
- Let the user change the theme between light and dark

## Project Methodology
We will create the game with the help of an API called [YouDoSudoku](https://www.youdosudoku.com), which will be used for board generation only. The board will be an HTML table styled with CSS and controlled by JavaScript. Different pages will be rendered inside of JavaScript, while the main page will be baked into the index HTML file. Local Storage will be used to store the user's scores, which will contain their name and time to solve the puzzle.

## Feature list
Must have features:
- A board with the puzzle that can be modified using Input elements
- Main menu where the user can start the game
- Check results button to check if the puzzle is solved

Should have features:
- Notes feature
- Check results checks if the puzzle is valid
- Instructions page
- Settings page (with theme selection, and check results complexity)

Could have features:
- Game timer (togglable in settings)
- Reset button
- Scores page