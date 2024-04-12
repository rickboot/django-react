From Tech with T:
https://www.youtube.com/watch?v=c-QsfbznSXI
https://github.com/techwithtim/Django-React-Full-Stack-App

# setup virtual environment

python3 -m venv env
source env/bin/activate

# requirements.txt

asgiref
Django
django-cors-headers
djangorestframework
djangorestframework-simplejwt
PyJWT
pytz
sqlparse
psycopg2-binary
python-dotenv

# install requirements (dependencies)

pip install -r requirements.txt

# create django project for backend

django-admin startproject backend

# create 'api' app in backend project

cd backend
python manage.py startapp api

# edit backend project settings.py - see 'from tutorial' comments

# notes

## JWT - JSON Web Tokens

JSON Web Token is a proposed Internet standard for creating data with optional signature and/or optional encryption whose payload holds JSON that asserts some number of claims. The tokens are signed either using a private secret or a public/private key.

JWT used to tell backend 1) who we are and 2) what we have permissions to do

Backend provides JWT for clients to send with requests

1. client sends username and password via HTTPS
2. backend authenticates and sends client 2 tokens

- access token to use for requests
- refresh token to get new access token

# Serializers

create serializers.py and import:

- from django.contrib.auto.models import User
- from rest_framework import serializers

ORM - object relational model

serializer converts JSON to and from objects

# modify api views.py

add imports
add CreateUserView class to create a new user

# modify backend url.py

add imports for CreateUserView and JWT views

# create and run db migrations - provision db with correct tables and setup

python manage.py makemigrations
python manage.py migrate

# run application!

python manage.py runserver

# add Note model to api models.py

# add NoteSerializer to api serializers.py - converts Notes to/from json

# create views to create, read, and delete views in api views.py

# make migratation and then migrate models to db

python manage.py makemigrations
python manage.py migrate

# run

python manage.py runserver

# FRONTEND setup

npm create frontend -- --template react

npm i axios react-router-dom jwt-decode

delete css and svg

remove unnecessary imports/code in App.jsx and main.js

create folders:

- components
- pages
- styles

create files:

- api.js
- constants.js
- .env

# add localStorage key constants to constant.js

# create api.js

create axios api with JWT from localStorage

all requests will go through axios 'api' include access token

# create protected route wrapper ProtectedRoutes.jsx

# create pages = Home, Login, Register, NotFound

# add react router routes in App.jsx

# create Form.jsx component

# run and test backend and frontend

python manage.py runserver
npm run dev

// look in devtools

# complete build of Home

# create Note.jsx component

# create LoadingIndicator.jsx and css = all css

# transition to cloud db at Choreo

add .env to backend with db vars
python manage.py migrate

# add .gitignore with env/ .env db.sqlite3 and push to repo

# add .choreo/endpoints.yaml in backend/

# add Procfile in backend/

---

# Todo

refactor Form.jsx - extract handle sumbit and error handling

# QUESTIONS ???

What is axios api.interceptors.request.use ?

# NEW TRICKS

vite exposes env as strings like so
import.meta.env.VITE_API_URL
Promise.reject(error)

! use trailing / on api urls

/notes/delete/<int:pk>/ //what is int:pk ???

status 200 - read/updated
status 201 - created
status 202 - accepted for processing..
status 203 - I don't think this means what you think means
status 204 - deleted

bugs:
used post instead of delete... doh!
did not add 'id' in NoteSerializer

# django-react
