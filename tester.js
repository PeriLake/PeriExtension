var Peri = require("./index")
var Logger = new Peri.Logger()
process.on('unhandledRejection', error => {
    Logger.examples.ErrorLog("Javascript Error", error)
}).on('uncaughtException', error => {
    Logger.examples.ErrorLog("Javascript Error", error)
})

var date=new Date()
Logger.send(Logger.glue("▬".repeat(33)+"\n",Logger.colors.cyan),
Logger.glue(`Starting Time: ${Logger.glue(date.timeNow(),Logger.colors.yellow)}\n`,Logger.colors.green),
Logger.glue(`Starting Date: ${Logger.glue(date.today(),Logger.colors.yellow)}\n`,Logger.colors.green),
Logger.glue("▬".repeat(33),Logger.colors.cyan))
delete date;

process.openStdin().addListener("data", function(key) {
    var s = eval(key.toString());
    if (s) console.log(s)
});

// Tester