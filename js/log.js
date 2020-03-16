
const { format, createLogger, transports } = require('winston');

const logger = createLogger({
  format: format.combine(
    format.label({ label: '[my-label]' }),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    //
    // The simple format outputs
    // `${level}: ${message} ${[Object with everything else]}`
    //
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    //
    // Alternatively you could use this custom printf format if you
    // want to control where the timestamp comes in your final message.
    // Try replacing `format.simple()` above with this:
    //
    // format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)

  ),
  transports: [
    new transports.Console(),
    new (transports.File) ({filename: '../logs/test.log'})
]
});

logger.info('Info Message');
logger.warn('Warning Message');
logger.error('Error Message');

/*
function log() {
  const winston = require('winston');

// Logger configuration
const logConfiguration = {
    'transports': [
        new winston.transports.File({
            filename: '../logs/example-2.log'
        })
    ]
};

// Create the logger
const logger = winston.createLogger(logConfiguration);

// Log a message
logger.info('Hello, Winston!');
}


const express = require('express');
const app = express();
const port = 3000;

const handler = (func) => (req, res) => {
    try {
        logger.info('server.handler.begun');
        func(req, res, logger);
    } catch(e){
        logger.info('server.handler.failed');
        res.send('Oh no, something did not go well!');
    }
};

app.get('/success', handler((req, res) => { res.send('Yay!'); }))
app.get('/error', handler((req, res) => { throw new Error('Doh!'); }))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
*/