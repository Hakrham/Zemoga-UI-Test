# Zemoga UI Test v1.0

This project was develop with vanilla JS (including CSS and HTM5) without any library or framework. Above the reasons why:

 -  The app it's satefy because we don't import, let say, a thousand dependencies and use only 3... But, what about the other 997?? Well, that's a security gap for our web app!! A huge one!!
 - If you use libraries or frameworks, you need to trust the author and if there is a bug, that's when the problems begins.
 - Vanilla JS will always have the best performance in a web application.
 - Also, i didn't choose CSS pre-processors or JS Frameworks in order to show my skills in pure JS and CSS.

But... Don't misread me, i loved jQuery back on the time and i currently love Angular, Materialize and SASS.

So, we have to summarize:

 - Security
 - Performance
 - Cleaner and lighter code
 - Show skills in pure coding

With all that say, let's see the dependencies in order to get the application run...

## Responsive Design

The web app have 3 differents designs:

 - For laptops (screen width > 768px)
 - For tablets (screen width <= 768px)
 - For smartphones (screen width <= 425px)

## Dependencies:
This project use Web Components, so we need some webpacket. Also, we use some full fake API REST service called  Typicode JSON Server in order to make HTTP Request.

So, for dev environment, please follow the next steps:

### Init npm:
Init npm in order to manage our web app:
```sh
npm init -y
```

### Install webpack:
```sh
npm install --save-dev webpack webpack-dev-server webpack-cli html-webpack-plugin
```

### Run project
With the following command, you should be able to run the project at http://localhost:8080
```sh
npm run dev
```

### REST API
For the HTTP Request, the service should be installed:
```sh
npm install -g json-server
```
Then, start the REST API service watched db.json file who contains all the data for the app runs
```sh
json-server --watch db.json
```
For more information about this full fake API REST, go to https://github.com/typicode/json-server
