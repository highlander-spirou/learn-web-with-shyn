# Building a REST API with express-typescript, mongodb. Self hosted in docker

This is a username-password based RestAPI authentication service. 
This example will use mongodb hosted on docker to store username and password. The password is store in hashed form to prevent security breached. 

## Authentication process

- Each user contains authentication field. In authentication field, there is an sessionToken sub-field that will be check with client browser

- When user is login, a session token will be create at client (in form of cookie) and server (in form of mongodb's sessionToken)

- Session token at cookie will be expired to ensure user has to login for a period of days. For the sake of one browser-one token, only one browser could make request at a time
