# Flixforall: All-In-One Movie App

This project is full-stack, meaning both client and server are involved. Feel free to download, run, and learn something new! :)

NOTE: Was having trouble deploying on Netlify due to the way the app is structured (weird I know) so in order to run it clone the repo then do an npm install in order to install all dependencies on your machine. Then do an npm run serverStart to start the server. Then you can run on your localhost and whatever browser you are using.

>Languages: JavaScript, HTML, CSS
>Environments: Node.js
>Frameworks: Express.js
>Databases: MongoDB
>Helpful Tools: Chrome DevTools, Postman, Insomnia (when needed)

Flixforall: An all-in-one movie application for your enjoyement needs!
Visually appealing application featuring fully responsive pages (accessed by <- and -> arrows) where users can search any movie they want to watch and the corresponding movie(s) will be displayed in a grid manner (column X row) based on if the searched movie is contained in the title regardless if perfect match.
Users can also add reviews, update reviews, and delete reviews for each movie, and said reviews and actions are saved for the lifetime of the application. 
>> Extra Features:
> When user hovers over a movie, the original html is replaced with new html that contains 1) the description of the movie and 2) the reviews button that once pressed leads to the already mentioned reviews section. When user "unhovers", the original movie html is displayed. 
> Each page loads up a new set of movies (before search)
