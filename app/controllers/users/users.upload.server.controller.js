'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller.js'),
	mongoose = require('mongoose'),
	passport = require('passport');
	var bodyParser = require('body-parser');

var express=require("express");
var multer  = require('multer');

var app=express();
var done=false;
var uploadFailReason="";

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

exports.upload = function(req, res) {
console.log(req.body);

	var upload = multer({ dest: './uploads/' });
	app.post('/', upload.single('file'), function (req, res, next) {
		console.log("Hello agn");
	});

	/*app.use(multer({ dest: './uploads/',
		rename: function (fieldname, filename) {
			var fileName = filename+Date.now();
			return fileName;
		},
		onFileUploadStart: function (file) {
			console.log(file.mimetype);
			if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'application/pdf')
			{
				console.log('File format ' + file.mimetype + ' not supported.')
				uploadFailReason = 'File format [' + file.mimetype + '] not supported.';
				return false;
			} else {
				console.log(file.originalname + ' is starting ...')}
		},
		onFileUploadComplete: function (file) {

			var SaveUpload = new Upload({
				userId: '555'
				, filePath: file.path
				, uploadTimestamp: Date()
			});

			SaveUpload.save(function(err, thor) {
				if (err) return console.error(err);
				console.dir(thor);
			});


			console.log(file.fieldname + ' uploaded to  ' + file.path)
			done=true;
		}
	}));*/

	res.json(req.body || null);
};

