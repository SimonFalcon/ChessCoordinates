# ChessCoordinates
### Video Demo: 
### Description:

This is my CS50 final project!
I have made this project to not only sharpen my programming skills, but chess skills as well. 

I was lacking insights for Chess Coordinates training in major chess sites such as lichess.com or chess.com.
So i decided to make them by myself! 
In this read me i will explain how the app works, how can you use it and what features does it have, that other chess coordinate trainer apps don't have.


This app that has been build using MERN tech stack has such features:
1. Register, Log in, Log out.
2. The training itself.
3. And training insights in the user page.

### Build explanation:
As I've mentioned the app is build using **M**ongoDB **E**xpress **R**eact **N**ode.js tech stack.

I have also used TailwindCSS for styling, Axios for HTTP requests, JWT for authentication and session management, Bcrypt for encryption, Apexcharts to draw the statistics heatmap.

Let's go through the build and explain what each file in each folder does:
/ChessCoordinates/api folder is where the code for the database is stored.
Enpoints are stored in index.js file. 
In the subfolder /models file user.js is the schema of _user_ stored.

For the client side everything is stored in /client directory.
Here in /src directory you can find files and folders used to build the frontend and the backend of the application.

Folder /assets is used to store the logo of the app as well as images ised in this README.md file.
/components folder stores the ChessBoard.jsx file in which the logic for the drawing of the chessboard is, as well as some logic for the training itself, funcitons to call api endpoints to record the score and accuracy of the user.

In the folder /pages you can find files such as:
1. IndexPage.jsx is used to render the main page of the app. 
2. LoginPage.jsx is used to render the log in page and define the log in functionality.
3. PlayPage.jsx is where the main fun happens, here the ChessBoard is rendered.
4. RegisterPage.jsx is used to render the register page. 
5. UserPage.jsx is used to render the user page that includes the statistics.

In the main /client directory we have files:
1. App.jsx here the main App function resides.
2. Header.jsx this is a component for the Navbar of the app that is rendered in each page.
3. Index.css here we have some custom css.
4. Layout.jsx is the basic layout of the app, each page depends on it to draw the header.
5. Main.jsx is the main set up for the whole app. 
6. UserContext.jsx helps pass user data, fetched from the database, through the component tree

All the other files in the client folder are a bunch of different setups for the app dependencies. 

### The app in action:

Upon loading the app you will be greeted by the IndexPage message:
![IndexPage greeting.](/client/src/assets/IndexPage.png)

You can login by pressing the login button that will prompt you for your email and password:
![LoginPage](/client/src/assets/LoginPage.png)

If you do not have login details yet, you can press the register link and you will end up in the register page.
Here you can create a user by typin the name, email and password:
![RegisterPage](/client/src/assets/RegisterPage.png)

After registering and logging in you will be redirected to the play page where you can start your training:
Here you will be prompted with a random coordinate and see the chessboard. 
The chess board is set up from the white side.
You must press the right coordinate on the chess board to gain points. 
If you answer correctly the square will light up green, if your guess is wrong the square will turn red.
The results of the session are recordered on the left side. Overal score for the session can be seen under the chessboard.
The session resets after the page is reloaded.
All of the answers are recorded in the user profile.
![PlayPage](/client/src/assets/PlayPage.png)

The final page of the app is the UserPage. On this page you can see the user you are logged in as. If you want you can log out.
This page is also used as the statistics page. Here you can see your total correct and incorrect answers. 
And the biggest feature on this app, the main reason I created it is the heatmap.
The heatmap tracks the users overall performance for each chessboard square. So you can see how well you answer each square, where you need to improve.
The lower the value in the heat map, the worse you are doing when answering that square, the bigger the value, the better you are doing.
![UserPage](/client/src/assets/UserPage.png)

