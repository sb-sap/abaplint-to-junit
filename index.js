var readline = require("readline");
var Error = require("./error.js");
var builder = require("junit-report-builder");

//var array = str.split("\n");

//process.argv.forEach((val, index, array) => {
//});
var name = "ABAPLint";
if (process.argc == 3) {
  name = process.argv[2];
}

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

var suite = builder.testSuite().name(name);

var failure = false;
//array.forEach(line => {
rl.on("line", line => {
  let obj = new Error(line);
  if (obj.isValid()) {
    var testCase = suite
      .testCase()
      .className(obj.getClassname())
      .name(obj.line)
      .error("ERR: " + obj.error)
      .failure(obj.error);

    failure = true;
  }
});

rl.on("close", () => {
  console.log(builder.build());
});

if (failure) {
  process.exit(1);
}
