# plants-microservices

## About The Project
The Plants App allows users to search for plants in database and add them to their user profile to be remainded about plant care routines also by e-mail. New users can register in the app by Google or login/password depending on preferences. Additional feature is live chat on one of the available topics.

## Technical Features
Frontend:
- Vite
- Axios with interceptors
- StompJs / SockJs-client
- MUI
- Styled Components
- React Router
- hooks: useContext, useState, useEffect, useCallback, useMemo, useRef, useNavigate...
- custom hooks
- Lodash - debounce
- Google reCaptcha

Backend:
- Microservices architecture
- Eureka Discovery server
- Api Gateway with Web Flux Spring Security Configuration and Custom Filter - JWT Token
- Spring Security - Username/Password registration/login + OAuth2.0 Google registration/login
- Kafka Message Broker - email notifications
- Websockets - live chat
- Google reCaptcha
- Zipkin
- PostgreSQL

## Application Presentation:

### Registration
<img  src="https://github.com/asynoradzki/plants-microservices/blob/main/client/public/login.gif"  alt="github"  width="800px"  height="450px">

### Login with OAuth 2.0
<img  src="https://github.com/asynoradzki/plants-microservices/blob/main/client/public/oauth.gif"  alt="github"  width="800px"  height="450px">

### Adding Plant
<img  src="https://github.com/asynoradzki/plants-microservices/blob/main/client/public/addplant.gif"  alt="github"  width="800px"  height="450px">

### Chat with other people 
<img  src="https://github.com/asynoradzki/plants-microservices/blob/main/client/public/chat.gif"  alt="github"  width="800px"  height="450px">

## Built With
Frontend: 

<a  href="https://www.typescriptlang.org/"  title="Typescript"><img  src="https://github.com/get-icon/geticon/raw/master/icons/typescript-icon.svg"  alt="Typescript"  width="50px"  height="50px"></a>
<a  href="https://reactjs.org/"  title="React"><img  src="https://github.com/get-icon/geticon/raw/master/icons/react.svg"  alt="React"  width="50px"  height="50px"></a>
<a  href="https://en.wikipedia.org/wiki/HTML5"  title="HTML"><img  src="https://github.com/get-icon/geticon/raw/master/icons/html-5.svg"  alt="HTML" height="50px"></a>
<a  href="https://en.wikipedia.org/wiki/CSS"  title="CSS"><img  src="https://github.com/get-icon/geticon/raw/master/icons/css-3.svg"  alt="CSS" height="50px"></a>
<a  href="https://material-ui.com/"  title="Material UI"><img  src="https://github.com/get-icon/geticon/raw/master/icons/material-ui.svg"  alt="Material UI"  width="50px"  height="50px"></a>
<a  href="https://code.visualstudio.com/"  title="Visual Studio Code"><img  src="https://github.com/get-icon/geticon/raw/master/icons/visual-studio-code.svg"  alt="Visual Studio Code"  width="50px"  height="50px"></a>
<a  href="https://www.npmjs.com/"  title="npm"><img  src="https://github.com/get-icon/geticon/raw/master/icons/npm.svg"  alt="npm"  width="50px"  height="50px"></a>

Backend:

<a  href="https://www.java.com/"  title="Java"><img  src="https://github.com/get-icon/geticon/raw/master/icons/java.svg"  alt="Java"  width="50px"  height="50px"></a>
<a  href="https://spring.io/"  title="Spring"><img  src="https://github.com/get-icon/geticon/raw/master/icons/spring.svg"  alt="Spring"  width="50px"  height="50px"></a>
<a  href="https://www.postgresql.org/"  title="PostgreSQL"><img  src="https://github.com/get-icon/geticon/raw/master/icons/postgresql.svg"  alt="PostgreSQL"  width="50px"  height="50px"></a>
<a  href="https://www.kafka.apache.org"  title="Kafka"><img  src="https://github.com/get-icon/geticon/raw/master/icons/kafka-icon.svg"  alt="Kafka"  width="50px"  height="50px"></a>
<a  href="https://www.jetbrains.com/idea/"  title="IntelliJ"><img  src="https://github.com/get-icon/geticon/raw/master/icons/intellij-idea.svg"  alt="IntelliJ"  width="50px"  height="50px"></a>

Other Technologies:

<a href="https://www.figma.com" title="figma"><img  src="https://github.com/get-icon/geticon/raw/master/icons/figma.svg"  alt="figma"  width="50px"  height="50px">
<a  href="https://discord.com/"  title="Discord"><img  src="https://github.com/get-icon/geticon/raw/master/icons/discord.svg"  alt="Discord"  width="50px"  height="50px"></a>
<a  href="https://git-scm.com/"  title="Git"><img  src="https://github.com/get-icon/geticon/raw/master/icons/git-icon.svg"  alt="Git"  width="50px"  height="50px"></a>
<a  href="https://github.com/"  title="github"><img  src="https://github.com/ptatarczuk/Ideas/blob/main/server/images/github.svg"  alt="github"  width="50px"  height="50px"></a>
<a  href="https://postman.com/"  title="postman"><img  src="https://github.com/get-icon/geticon/raw/master/icons/postman.svg"  alt="postman"  width="50px"  height="50px"></a>
<a  href="https://www.docker.com/"  title="docker"><img  src="https://github.com/get-icon/geticon/raw/master/icons/docker-icon.svg"  alt="docker"  width="50px"  height="50px"></a>
<a  href="https://trello.com/"  title="trello"><img  src="https://github.com/get-icon/geticon/raw/master/icons/trello.svg"  alt="trello"  width="50px"  height="50px"></a>

## Running the Application

### In Docker: 

- Clone the Repository.
- Create accounts for Google OAuth2.0 and Google reCaptcha and define the following environment variables in you operating system:

  - ${GOOGLE_OAUTH_CLIENT_ID}
  - ${GOOGLE_OAUTH_CLIENT_SECRET}
  - ${GOOGLE_RECAPTCHA_SECRET}
  - ${GOOGLE_RECAPTCHA_SITE_KEY}

- Provide google email and password (the account must be configured to enable sending e-mails from an application) and assign them to the following environment variables in you operating system:

  - ${MAIL_SENDER_USERNAME}
  - ${MAIL_SENDER_PASSWORD}

- Finally create three PostgreSQL databases and also assign them to the following environment variables in you operating system:

  - ${CHAT_DB}
  - ${NOTIFICATIONS_DB}
  - ${PLANTS_DB}
  - ${POSTGRES_USER}
  - ${POSTGRES_PASSWORD}

- In the console navigate to the main plants-microservices directory and run "docker compose up" command

### On local machine
- Clone the Repository.
- Set up all the accounts and enviroment variables described above in the Running in Docker section.

Client Application:
- Navigate to the client directory. Install dependencies using the following command: npm install
- Run the application with: npm run dev

Server Application:
- Open server directory in your IDE
- Install dependencies with Maven
- Run the services

## Authors

Aleksander Synoradzki:

<a  href="https://github.com/asynoradzki"  title="github"><img  src="https://github.com/ptatarczuk/Ideas/blob/main/server/images/github.svg"  alt="github"  width="50px"  height="50px"></a>

Piotr Tatarczuk:

<a  href="https://github.com/ptatarczuk"  title="github"><img  src="https://github.com/ptatarczuk/Ideas/blob/main/server/images/github.svg"  alt="github"  width="50px"  height="50px"></a><a  href="https://www.linkedin.com/in/ptatarczuk/"  title="github"><img  src="https://github.com/get-icon/geticon/raw/master/icons/linkedin-icon.svg"  alt="github"  width="50px"  height="50px"></a> 

<p align="right">(<a href="#readme-top">back to top</a>)</p>
