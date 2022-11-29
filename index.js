const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const port = 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'));
app.use(
	session({
		secret: '79bcca27f38f32e3aa043f416e78fcf0',
		resave: false,
		saveUninitialized: false,
	})
);
app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/login', (req, res) => {
	res.render('login');
});

app.get('/submit', (req, res) => {
	res.render('submit');
});

app.get('/home', (req, res) => {
	res.render('home');
});

app.get('/customer', (req, res) => {
	res.render('customer');
});

app.get('/product', (req, res) => {
	res.render('product');
});

app.get('/order', (req, res) => {
	res.render('order');
});

app.post('/login', (req, res) => {
	res.redirect('/product');
});

app.get('/logout', (req, res) => {
    req.logOut((err) =>{
        if (!err) {
            res.redirect('/');
            return;
        }

        res.status(404).send('Error');
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));