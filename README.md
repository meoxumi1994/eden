# eden

How to Run it

# create-react-app
the first you need to download create-react-app : https://github.com/facebookincubator/create-react-app
# Nodejs 
the second you need to download Nodejs : https://nodejs.org/en/download/
# Mongodb
the third you need to download Mongodb : https://www.mongodb.com/download-center
after you install mongodb, run server mongo

# run Server
if you want to run on localhost, go to server/index.js , change `whitelist` = ['http://localhost:3000']
then
```
cd /server
npm i
node index.js
```
# run Client 
if you want to run on localhost, go to client/src/config.js , change  `SERVER_EDEN_IP` : ['http://localhost:3333/']
then
```
cd /client
npm i
npm start
```
