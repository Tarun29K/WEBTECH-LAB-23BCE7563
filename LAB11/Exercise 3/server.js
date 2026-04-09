//event emitter
const EventEmitter = require('events');
const userActionEmitter = new EventEmitter();

//listener for user signup
userActionEmitter.on('userSignup', (username, email) => {
    console.log(`[Email Service]: Sending welcome email to ${username} at ${email}...`);
});

//listener for multiple accounts
userActionEmitter.on('userSignup', (username) => {
    console.log(`[Database Service]: Creating record for ${username} in the database.`);
});

//listener for error
userActionEmitter.on('appError', (errorCode, message) => {
    console.error(`[Alert]: Error ${errorCode} occurred! Message: ${message}`);
});

console.log("--- Application Started ---");
console.log("Processing a new signup...");
userActionEmitter.emit('userSignup', 'Tarun Kumar', 'nomail@gmail.com');

setTimeout(() => {
    console.log("\n--2 seconds Timeout--");
    userActionEmitter.emit('appError', 500, 'Internal Server Connection Failed');
}, 2000);

console.log("-- Waiting for Timer --");