
//the reasons I use express framework is to satiafy Heroku:
//1. the app won't end, since express holds a thread that always listen....
//2. when I open the app on Heroku site - express returns "Hello World!" so the app doesn't crush,
//   since the app is considered 'web' app - so I need to supply a response to a hit to the app URL
//   (somewhere I can configure Heroku to treat my app diferently in a procfile. see here https://devcenter.heroku.com/articles/getting-started-with-nodejs#define-a-procfile)

const myApp = require('./index');
const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

var port = process.env.PORT || 3000; // Heroku sets process.env.PORT for me
app.listen(port, () => console.log('app listening on port ' + port));

//start my app
setInterval(myApp.checkAndCreatePodcast, 300000); // every 5 min