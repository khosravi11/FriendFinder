var express = require('express');
var bodyParser = require('body-parser');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3333;

// S ets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(express.static('app/public'));

require('./app/data/friends.js');
require('./app/routing/apiRoutes.js')(app);
require('./app/routing/htmlRoutes.js')(app);

app.listen(PORT, function () {
  console.log('App listening on PORT ' + PORT);
});
