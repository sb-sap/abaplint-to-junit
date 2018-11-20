var str =
  "src/#test#cl_date_time_utilities.clas.abap[70, 1]          - Contains non 7 bit ascii character\n" +
  'src/#test#cl_date_time_utilities.clas.abap[15, 7]          - Bad method parameter name "cwa_table_line" expected "^C._.*$/i"\n' +
  'src/#test#cl_date_time_utilities.clas.abap[22, 9]          - Bad method parameter name "i_field_name" expected "^I._.*$/i"";\n';

var readline = require("readline");
var Error = require("./error.js");
var builder = require("junit-report-builder");

//var array = str.split("\n");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

var suite = builder.testSuite().name("My suite");

//array.forEach(line => {
rl.on("line", line => {
  let obj = new Error(line);
  if (obj.isValid()) {
    var testCase = suite
      .testCase()
      .className(obj.file)
      .name(obj.line)
      .error({ "line": obj.line, "row": obj.row })
      .failure(obj.error)      
  }
});

rl.on("close", () => {
  console.log(builder.build());
});
