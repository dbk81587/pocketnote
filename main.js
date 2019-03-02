const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const api = require('./routes');

const app = express();
const port = process.env.PORT || 5001;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }) );
app.use(bodyParser.json());

app.use(session({
    secret: 'MemoApp1$1$234',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: null }
}));




app.use('/', express.static(path.join(__dirname, 'client/build')));
app.use('/api', api);

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
});


app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log('Express is listening on port!!!!!!!!!!!!!!!!!', port);
});