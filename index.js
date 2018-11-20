var readline = require("readline");
var Error = require("./error.js");
var builder = require("junit-report-builder");

//var array = str.split("\n");

//process.argv.forEach((val, index, array) => {
//});
if (process.argc < 3) {
  exit(-1);
}

var name = process.argv[2];

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

var suite = builder.testSuite().name(name);

//array.forEach(line => {
rl.on("line", line => {
  let obj = new Error(line);
  if (obj.isValid()) {
    var testCase = suite
      .testCase()
      .className(obj.file)
      .name(obj.line)
      .error(obj.error)
      .failure(obj.toString());
  }
});

rl.on("close", () => {
  console.log(builder.build());
});
