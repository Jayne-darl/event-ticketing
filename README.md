# event-ticketing

An API to view create events and create tickets for events

## Features
* Can register user
* Can sign in registered user
* can create event
* can get all events
* can get all user events
* can update event
* can delete event
* can create event associated to an event


## Tools used in Project Creation
* Node.js & Express.
* Git
* Heroku

## Requirements and Installation
These instructions will get you a copy of the project up and running on your local machine for development

To install and run this project you would need to have installed:
* Git
* Node 

To run: 

``` 
$ https://github.com/Jayne-darl/event-ticketing.git
$ cd event-ticketing.
$ npm install
$ npm start 
```

## HTTP Request Methods

These are the HTTP request methods used in this project.

| Method	| Action |
| --- | --- |
| `GET` |	This method is used to get a resource|
| `POST`	| This method is used to create a resource or send data |

## HTTP Response Status Codes

These are the HTTP response codes used in this project.

| Status Codes | Indication |
| --- | --- |
| `200` |	This OK status code indicates that a request has succeeded |
| `201` |	This created status code indicates that a resource has been created |
| `400` |	This bad request error status code indicates that the request sent to the server is incorrect |
| `401` |	Returned when the user is authorised |
| `404` |	Returned when the request is valid, but the resource you try to access does not exist, or is outside your scope |
| `422` |	Returned when the request was not processed due to validation errors|
| `500` |	This internal server error status code indicates that something has gone wrong on the web server |

## API Endpoints
| Endpoint |	Functionality |
| --- | --- |
| POST /api/v1/auth/user/signup |	Register user |
| POST /api/v1/auth/user/signin |	Signin user |
| POST /api/v1/event |	Create a new event |
| GET /api/v1/event/user |	Get events created by user |
| GET /api/v1/event |	Get all events |
| PATCH /api/v1/event/:id |	Update an event |
| DELETE /api/v1/event/:id	| Delete an event |
| POST /api/v1/ticket	| Create a ticket for an event |

## The API Endpints are hosted on heroku
https://event-ticketing112.herokuapp.com/api/v1/

## Author
Jane U. Onwumere

## License
This is licensed for your use, modification and distribution under the [MIT license](https://opensource.org/licenses/MIT).
