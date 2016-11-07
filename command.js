var exports = module.exports;
var fs = require('fs');

var pwd = function(){
    var workDir = process.cwd();
    process.stdout.write( workDir );
    process.stdout.write('\nprompt > ');
}
var date = function(){
    var date = new Date().toString();
    process.stdout.write( date );
    process.stdout.write('\nprompt > ');
}

var ls = function(){
  
  fs.readdir('.', function(err, files) {
    if (err) throw err;
    files.forEach(function(file) {
      process.stdout.write(file.toString() + "\n");
    })
    process.stdout.write("prompt > ");
  });
}

var echo = function(cmdLine) {
  var string = cmdLine.slice(1).join(' ') || null;
  if(string) process.stdout.write( string );
  else  {
    process.stdout.write( "Error: echo takes string as an argument" );
  }
  process.stdout.write('\nprompt > ');
};

var cat = function(cmdLine) {
  cmdLine.forEach((el,index) => {
    if (index !== 0) {
      fs.readFile(el, 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data);
        if(index == cmdLine.length - 1) {
          process.stdout.write('\nprompt > ');
        }
      });
    }
  });
};

var head = function(cmdLine) {
  var hasNotCount = isNaN(cmdLine[1]);
  var count = hasNotCount ? 5 : Number(cmdLine[1]);
  var startPoint = hasNotCount ? 0 : 1; 
  cmdLine.forEach((el,index) => {
    if (index > startPoint) {
      fs.readFile(el, 'utf8', (err, data) => {
        if (err) throw err;
        var data = data.split("\n").slice(0, count).join('\n');
        console.log(data);
        if(index === cmdLine.length -1) {
          process.stdout.write('prompt > ');
        }
      });
    }
  });
};

var tail = function(cmdLine) {
  var hasNotCount = isNaN(cmdLine[1]);
  var count = hasNotCount ? 5 : Number(cmdLine[1]);
  var startPoint = hasNotCount ? 0 : 1; 
  cmdLine.forEach((el,index) => {
    if (index > startPoint) {
      fs.readFile(el, 'utf8', (err, data) => {
        if (err) throw err;
        var data = data.split("\n").reverse().slice(0, count).reverse().join('\n');
        console.log(data);
        if(index === cmdLine.length -1) {
          process.stdout.write('prompt > ');
        } else {
          process.stdout.write('\n');
        }
      });
    }
  });
};  

exports.pwd = pwd;
exports.date = date;
exports.ls = ls;
exports.echo = echo;
exports.cat = cat;
exports.head = head;
exports.tail = tail;

  // if(cmd === "date") { 
  //   var date = new Date().toString();
  //   process.stdout.write( date );
  //   process.stdout.write('\nprompt > ');
  // } else {
  //   process.stdout.write('You typed: ' + cmd);
  //   process.stdout.write('\nprompt > ');
  // } 