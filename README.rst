This is the repo for my training project FAKEGRAM
=====================================================

It's a fake instagram built using reactjs and django::

The backend is a django-restframework API
-------------------------------------------
	$ pip install pipenv

	$ pipenv shell

	$ ./manage.py migrate

	$ ./manage.py createsuperuser

	$ ./manage.py runserver

Navigate to http://127.0.0.1:8000/api/v1/instagram/post/ to find the api

The frontend is built in reactjs
------------------------------------
	$ cd frontend
	
	$ yarn start
Navigate to http://127.0.0.1:3000 and you will see the application. 
