# Silly Votes

A small, microservice-oriented project for running imaginary campaigns.

## Purpose

Primary this is a self-learning project to understand how to build a system via microservices.

In terms of technology stack, most of the project is NodeJS with Express and React used where needed.

## Inspirations

Some patterns in this project are actually inspired from features seen when trailing Microsft Azure functions.  Of interest in here is the use of Express middleware to carry out common tasks and have the outcomes injected into the action handle.

## Services

This section lists the services created so far and which are still planned to be created (at the time of writing).

Technically, this is more a list of containers but when given a network connection they offer a service thus still count as services.

|Service|Description|Built?|
|:---|:---|:---:|
|be-auth-dev|Dummy service that simply creates a JWT token, nothing else|Y|
|be-campaigns|Overseas all access to campaigns stored in a mongo DB|Y|
|be-votes|Overseas all access to votes stored in a mongo DB|N|
|db-mongo|Holds the Mongo database|Y|
|fe-web-api|What passes for a reverse proxy and effective collates the API of all other services behind it|Y|
|fe-web-react|The actual front end that users via a browser see.  As the name implies, it is written in React.|Y|

## Authentication notes

Admittedly, this requires ALOT of improvement.  At the time of writing, it simply allows a hassle three way of creating a JWT token with just a email address (which acts as the user identifier for the rest of the system).

In future, it maybe extended to actually require a email AND password but for now, it is there to simply prove a token the other microservices for authentication purposes.
