var readline = require("readline");
var Error = require("./error.js");
var builder = require("junit-report-builder");
var program = require("commander");

program
  .version("0.1.0")
  .option("-n, --name [name]", "Set name for testsuide", "ABAPLint")
  .option("-f, --file [file]", "Set report filename", "report.xml")
  .parse(process.argv);

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

var suite = builder.testSuite().name(program.name);

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
    console.log(line);
  }
});

rl.on("close", () => {
  builder.writeTo(program.file);
});

if (failure) {
  process.exit(1);
}
