const router = require('express').Router();
require('dotenv').config()
const User = require('../models/User');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/sign_up', (req, res) => {

	let data = req.body;

	let schema = Joi.object().keys({
		name: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().required()
	});

	Joi.validate(data, schema, async (err, value) => {
		if(err) {
			res.status(422).json({
				message: 'Invalid request data',
				error: {
					input: err.details[0].path[0],
					message: err.details[0].message.split('" ')[1]
				}
			});
		}else {
			//Verify if the user exists
			let emailExist = await User.findOne({ email: req.body.email });
			if(emailExist) return res.status(400).json({
				error: {
					input: 'email',
					message: 'Email already exists'
				}
			});

			let salt = await bcrypt.genSalt(10);
			let hashPassword = await bcrypt.hash(req.body.password, salt);

			let user = new User({
				name: req.body.name,
				email: req.body.email,
				password: hashPassword
			});

			try {
				let userSaved = await user.save();
				res.send({
					user
				});
			}catch(err) {
				res.status(400).send(err);
			}
		}
	});

	
});

router.post('/sign_in', (req, res) => {
	
	let data = req.body;

	let schema = Joi.object().keys({
		email: Joi.string().email().required(),
		password: Joi.string().required()
	});

	Joi.validate(data, schema, async (err, value) => {
		if(err) {
			res.status(422).json({
				message: 'Invalid request data',
				error: {
					input: err.details[0].path[0],
					message: err.details[0].message.split('" ')[1]
				}
			});
		}else {
			let user = await User.findOne({ email: req.body.email });
			if(!user) return res.status(400).json({
				error: {
					input: 'email',
					message: 'Email already exists'
				}
			});

			let validPass = await bcrypt.compare(req.body.password, user.password);
			if(!validPass) return res.status(400).json({
				error: {
					input: 'email',
					message: 'Email already exists'
				}
			});

			let token = jwt.sign({user}, process.env.SECRET_KEY);
			res.json({
				token
			})	
		}
	});

});


module.exports = router;