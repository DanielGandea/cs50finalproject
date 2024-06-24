# Nakano

#### Video Demo: <https://youtu.be/vrCOXet3TJ0>

#### Description:

  

## General

Our project is a web-based application using Flask, Javascript, HTML, CSS, SQL (sqlite database) and Bootstrap.

Together we decided to make a todo app which will have a weather and a glossary page. For the name we used translate *(nakano - planner from greek)*.

To be able to develop our project without using the CS50 library we needed to use readily available solutions for the database storage (SQL Alchemy instead of CS50 DB ) and form validation (Flask WTF Form for an easier validation process). Also, the register and login are in a separated python file, made possible using flask blueprints. We decided to put the entry to the page aside from the part which covers it's contents.

The colors and fonts used on our page are put in :root and then we used CSS variables for ensuring easier modifications as we develop it. This way, if we want to change something, we do it there and everything becomes as we need. Our color scheme is having a vintage vibe, and has natural colors. Red simply dominates here.

All the images seen on this website are from *Unsplash.com*, which has lots of high quality photos. Also, all the icons and illustrations are from *svgrepo.com* . The fonts are : all the titles and important things "Clash Display" from *fontshare.com/fonts/clash-display* and for the rest of them we simply use the system-ui.

A design choice that we made was to put the notes more like sticky notes on a board, different from the traditional approach that others have, like a list. Here we use CSS grid for this layout.

We have a styles.css file which contains all the general styles and then we have a separate file with styles for each page, so we could manage them easier. Every page has a descriptive image that represents it.

All the files, besides app.py are in the "files" folder. There we have separated static (all the styles and js scripts), templates (html) and the python programs.

The __init.py__ does most of the basic work like redirecting to the landing page if not logged in and connecting to the local database. It also hold the secret key and initializes the app.
  


## Landing Page

When not logged in, the user sees a simple page that encourages to sign up.

It is very simple, but it does the job...

  

## 404 Page

Beautiful, with ladybugs, inspired by nature...

Used to notify the user when an inexistent route is requested.

  

## Login

This page uses **Flask WTForms** for email and password validation, allowing you to define your own forms, we used a regular expression for defining the structure of the password.

If something is wrong then the app flashes the exact error.

## Register
Here we simply query the database and check whether user exists or not, or if the credentials are correct. If not, we tell there's a problem.
  

## Settings Page

For the */settings* route we used WTForms for password validation, the class of which is written in the *db_models.py* file. Also, you can change your username there if you want.

  

## Dictionary Page

For the dictionary page we used the "Free Dictionary API", simple to use, decently fast and no API key required.

Works only for English but it's fine. The output is displayed on the page, with a little message if the word isn't found or if typed wrong.

  

## Meteo Page

For the */weather* route we used **Openweathermap API**. In order to make it happen, first we registered for an API key, then after asking the user the desired location, we used the geocoding API to retrieve the coordinates, since you can't search for forecast directly with the city name. Also, here we made another JS script that decides which image to display based on the type of weather. The API provides an ID for each weather condition and based on that, we put it hidden on the page (Jinja) and Javascript selects that value, makes it a number and the photo is chosen.

  

## Homepage

The homepage includes the default **/** route, **/get_text**, **/sort** and **/delete_note**. 
>**/ - the first one just renders the page with notes.**

>**/get_text - is the one responsible for inputing the text into the database.** This goes from the input and then redirects you to the default page. Afterwards, the notes are selected again from the db.

>**/sort - sorts by due date**

>/**delete_note - deletes a certain note when a button (actually a form) is clicked**

Each note can contain up to 200 characters, a decent enough length. If no date is selected, today is the due date on this task.

We implemented a sidebar UI that transforms to a bottom navigation panel in order to adapt to small screen sizes, a simple and elegant UI that is decently intuitive.

The images on this page are selected from a list randomly, using javascript, giving different views on world's best landscapes. In the same script is the logic for the expanding input.

This is a CS50 Project - one that we really enjoyed building together!
