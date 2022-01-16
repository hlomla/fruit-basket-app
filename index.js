const express = require('express');
const exphbs  = require('express-handlebars');
const pg = require("pg");
const Pool = pg.Pool;

const app = express();
const connectionString = process.env.DATABASE_URL  || 'postgresql://codex:pg123@localhost:5432/fruit_app'

const pool = new Pool({
    connectionString
});
// enable the req.body object - to allow us to use HTML forms
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// enable the static folder...
app.use(express.static('public'));

// add more middleware to allow for templating support

// console.log(exphbs);
const hbs = exphbs.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

let counter = 0;

app.get('/', function(req, res) {
	res.render('index', {
		counter
	});
});

app.get('/basket/add', function(req, res) {
	res.render('basket/add');
});

app.get('/basket/edit', function(req, res) {
	res.render('basket/edit');
});

// app.post('/count', function(req, res) {
// 	counter++;
// 	res.redirect('/')
// });


// start  the server and start listening for HTTP request on the PORT number specified...
app.listen(PORT, function() {
	console.log(`App started on port ${PORT}`)
});