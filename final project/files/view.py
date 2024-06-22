from flask import Blueprint, render_template, redirect, request, flash
from flask_login import login_required, current_user
import requests

from datetime import datetime

from werkzeug.security import (
    generate_password_hash )

from files.db_models import Notes, Users, SettingsPasswordChange, ChangeUsername
from files import db


views = Blueprint('views', __name__)


# global var for seeing if we need to sort after due date or date of insertion
sorted = False


@views.route('/sort')
@login_required
def sort():
    # we should tell it's a global to be able to use it inside here
    global sorted

    if sorted == False:
        notes = Notes.query.filter_by(user_id = current_user.id).order_by(Notes.id.desc()).all()
        sorted = True
    
    else:
        notes = Notes.query.filter_by(user_id = current_user.id).order_by(Notes.time.asc()).all()
        sorted = False

    return render_template("homepage_dashboard.html", notes = notes, name = current_user.name)


# here we import the database and extract the notes (tasks) from there
@views.route('/')
@login_required
def home():
    notes = Notes.query.filter_by(user_id = current_user.id).order_by(Notes.id.desc()).all()
    return render_template("homepage_dashboard.html", notes = notes, name = current_user.name)


@views.route('/landing')
def landing():
    return render_template("landing.html")


# this part takes the text from the texArea and inserts into .db
@views.route('/get_text', methods = ['POST', 'GET'])
@login_required
def get_text():
    
    if request.method == "POST":
        # this is read as a dict
        text = request.form.get('task_input')

        # select the date from the date picker
        date = request.form.get('trip-start')
        
        date_object = None

        if date:    
            date = str(date) # make it a STR
            
            # convert to date object
            date_object = datetime.strptime(date, '%Y-%m-%d').date() 


        # Creating a note (task) and add to the database:
        new_task = Notes( user_id = current_user.id, data = text, time = date_object)
        db.session.add(new_task)
        db.session.commit() # Commiting to the db

    return redirect('/');


# this deletes a note
@views.route('/delete_note', methods = ['POST', 'GET'])
@login_required
def delete_note():
    
    if request.method == "POST":

        # here we get the id of the task we want to delete
        note_id = request.form['task_id']

        # we query the db and get the note we wanna delete
        note_to_delete = Notes.query.filter_by(id = note_id, user_id = current_user.id).first()
        db.session.delete(note_to_delete)
        db.session.commit()

    return redirect('/')


# goes to settings page
@views.route('/settings', methods=['POST', 'GET'])
@login_required
def settings():

    # create a password change form using wtform for validation
    passchange = SettingsPasswordChange()

    # change username using wtforms
    newUsername = ChangeUsername()

    # query for getting data of user
    curr_user = Users.query.filter_by(id = current_user.id).first()

    # we check if form action is the right one 
    if request.method != "POST":   
        return render_template('settings.html', passchange=passchange, newUsername = newUsername, curr_username = current_user.name)
    
    # if request is POST 
    else:

        # If we get something in the userrname input
        if (newUsername.data['name'] != curr_user.name) and (newUsername.data['name'] is not None) and len(newUsername.data['name']) > 0:
            # get the new username & replace with the new one
            curr_user.name = newUsername.data['name']
            db.session.commit()
    
            return redirect('/')


        # if one of the password fields are empty
        if not passchange.data['password'] or not request.form.get('pass_check'): # did not input password
            flash("Please input both passwords!")
            return render_template('settings.html', passchange=passchange, newUsername = newUsername, curr_username = current_user.name)
        
        # else if new passwords don't match
        elif request.form.get('pass_check') != passchange.data['password']:
            flash("Passwords do not match!")
            return render_template('settings.html', passchange=passchange, newUsername = newUsername, curr_username = current_user.name)

        # else if passwords do match and get validated by flask wtforms, then change and commit new one to .db
        elif not passchange.validate_on_submit(): 
            flash("Please enter a secure password!")
            return render_template('settings.html', passchange=passchange, newUsername = newUsername, curr_username = current_user.name)
        
        else:
            # update the password and commit to db    
            curr_user.password = generate_password_hash(passchange.data['password'])
            db.session.commit()

            return redirect('/')
        

@views.route('/weather', methods=["POST", "GET"])
@login_required
def weather():

    # openweathermap api used for this (both forecast and geocoding)
    API_key = "api_key" # removed due to security reasons, if needed please contact me at pro.gandeadaniel@gmail.com

    # get the location name from the user
    city_name = request.form.get("location")

    if not city_name:
        return render_template("weather.html")
    
    # request the coordinates from geocoding api 
    location_response = requests.get(f"http://api.openweathermap.org/geo/1.0/direct?q={city_name}&limit=10&appid={API_key}")

    # if response is bad, then
    if int(location_response.status_code) != 200:
        flash("Sorry, meteo page doesn't respond ... ")
        return render_template("weather.html")
    
    # make it json
    location_json = location_response.json()

    if not location_json:
        flash("Sorry, no such location found!")
        return render_template("weather.html")
    
    else:
        # retrieve the needed data (coordinates) 
        latitude = location_json[0]['lat']
        longitude = location_json[0]['lon']

        # call the forecast api 
        meteo_data_response = requests.get(f"https://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&units=metric&appid={API_key}")
        meteo_json = meteo_data_response.json() # make it json again
        
        return render_template("weather.html",
                                city_name = location_json[0]["name"],
                                temperature = int(meteo_json["main"]["temp"]),
                                feels_like = int(meteo_json["main"]["feels_like"]),
                                description = meteo_json["weather"][0]["description"],
                                weather_id = meteo_json["weather"][0]["id"]
                            )


@views.route("/glossary", methods = ['GET', 'POST'])
@login_required
def glossary():

    title = request.form.get("wordo")
    if title and request.method == "POST":
        response = requests.get(f"https://api.dictionaryapi.dev/api/v2/entries/en/{title}")

        if int(response.status_code) == 200:    
            data = response.json()

            # Getting the word
            word = data[0]['word']
            word = word.capitalize()

            # Getting the definition
            definition = data[0]['meanings']
            definition = definition[0]['definitions']
            definition = definition[0]['definition']
            
            return render_template("glossary.html", definition = definition, word = word)
        else:
            return render_template("glossary.html", definition = "We don't know anything about it, sorry...", word = "Ooops..!")
    else:
        return render_template("glossary.html", definition = "Here you will get the definition for (maybe) any english word that you can think of!", word = "Search")



@views.app_errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404
