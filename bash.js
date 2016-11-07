var commands = require('./command');

process.stdout.write('prompt > ');


// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var cmdLine = data.toString().trim().split(" "); // remove the newline
  var cmd = cmdLine[0];
  if(commands[cmd]){
    commands[cmd](cmdLine);
  }
  else {
    process.stdout.write('You typed: ' + cmd);
    process.stdout.write('\nprompt > ');
  } 
});