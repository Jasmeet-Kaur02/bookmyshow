# Book My Show

To get started with above project, you need to have node installed on local machine. To check node version, run

```

node --version

```


To clone this repo, you must have Git installed on local machine.


## Installation

To get started with above code, you should have a MySQL installed locally in your machine with any MySQL GUI tools.

## Setup 

Create database book_my_show in your machine. 
To connect database, create .env file and add this ENV variables - 
1. DATABASE
2. DATABASE_USERNAME
3. DATABASE_PASSWORD 

run the following commands

```
npm i
npx sequelize-cli db:seed:all
node index
```

Here index.js is the application startup file.

This will start the local development server on port `8000`. Open `localhost:8000` to preview the dev server.
You will see following result in the browser.

```

Welcome to the Book My Show

```


## Tech Stack

This project is primarily created using Nodejs.


## About 

This application allow user to select their city and view all the theatres. For the selected theatre and date user can view all the available shows and can book their seats.


## Routes Details 

This application has following routes. 

1. /cities - GET - To fetch all the cities.
2. /cities/{cityId}/theatres - GET - To fetch all the theatres of the selected city.
3. /theatres/{theatreId}/shows - GET - To fetch all the shows of the selected theatre and selected date.
4. /theatres/{theatreId}/show/{showId} - GET - To fetch all available and booked seats for selected show in the selected theatre on selected date and time.
5. /showBooking - POST - To create booking for selected shows on selected date and time in the selected theatre.

## Additional Information 

This application use Sequelize ORM.

## indexes 

1. **Theatre table:**
  
   **index columns** - cityId

   **Reason** - To improve the performance of retrieving all theatres based on the selected city.
2. **TheatreShows table:**
   
   **index columns** - theatreId and date
   
   **Reason** - To improve performance of retrieving all rows which has selected theatreId and date.
3. **TheatreShowTimings table:**
   
   **index columns** - theatreShowId, time
   
   **Reason** - Creating an index on the theatreShowId column improves the loading time of retrieving all related rows from both the theatreShowTiming table and the 
   theatreShow table.
   
