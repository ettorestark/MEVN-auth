const express = require('express');
const app = express();
const mongoose = require('mongoose');
//Import routes
const authRoute = require('./routes/auth');

//Connection to DB
mongoose.connect('mongodb://localhost/auth', { useNewUrlParser: true })
	.then(response => console.log('Database connected'))
	.catch(err => console.log(err));

//Settings
app.set('port', 3000);

//Middlewares
app.use(express.json());

//Routes
app.use('/api/user', authRoute);

app.listen(app.get('port'), () => {
	console.log('Server on port ' , app.get('port'));
});