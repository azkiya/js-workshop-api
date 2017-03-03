const express = require('express');
const apiV1 = express();

const chat = require('./chat');

apiV1.get('/', (req, res) => {
	res.json({
		status: 'success',
		data: {
			message: 'API Version 1'
		}
	});
});

apiV1.use('/chat', chat);

module.exports = apiV1;