Array.prototype.randomsorting = function() {
    return this.sort(() => Math.random() - 0.5)
}
Array.prototype.elementdelete = function(b) {
    if (this.includes(b)) {
        return this.splice(this.indexOf(b), 1)
    };
    return this
}
Array.prototype.randomelement = function() {
    return this[randomnumber(0, this.length - 1)]
}

Object.prototype.istype = function() {
    return typeof this
}

String.prototype.isjson = function() {
    var item = this;
    item = typeof item !== "string" ? JSON.stringify(item) : item;
    try {
        item = JSON.parse(item);
    } catch (e) {
        return false;
    }
    if (typeof item === "object" && item !== null) {
        return true;
    }
    return false;
}
String.prototype.isbool = function() {
    if (["true", "false"].some(e => this.toLowerCase() == e)) return true;
    return false;
}
String.prototype.isnumber = function() {
    return isNaN(parseInt(this)) ? false : true
}
String.prototype.turkletter = function() {
    if (this.toLowerCase().replace(/[a-z0-9:;?*\\=\)\(\/&+%+^>£#$½{\[\]}'!\-_.,~<"\|]/g).length <= 0) {
        return false
    }
    return true
}

Date.prototype.today = function() {
    return ((this.getDate() < 10) ? "0" : "") + this.getDate() + "/" + (((this.getMonth() + 1) < 10) ? "0" : "") + (this.getMonth() + 1) + "/" + this.getFullYear();
}
Date.prototype.timeNow = function() {
    return ((this.getHours() < 10) ? "0" : "") + this.getHours() + ":" + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes() + ":" + ((this.getSeconds() < 10) ? "0" : "") + this.getSeconds();
}

console.__proto__.messager = function() {
    for (var i = 0; i < arguments.length; i++) {
        console.log(arguments[i])
    }
}

function randomnumber(min, max) {
    return Math.floor(Math.random() * (max - min) + 1) + min;
}

function virtualstring(callback) {
    var str = "";
    const a = callback();
    var s = a.next();
    for (; !s.done;) {
        str += s.value;
        s = a.next()
    }
    return str
}

/*virtualstring(function*(){yield 1;yield 2;yield 3}) ==> "123" */

function virtualarray(callback) {
    var array = [];
    const a = callback();
    var s = a.next();
    for (; !s.done;) {
        array.push(s.value);
        s = a.next()
    }
    return array
}


function evalcode(callback) {
    var s = callback();
    return eval(!s ? "" : s);
}

var Logger = require("./src/logger")
var TempDB = require("./src/tempdb")
var JsonSerializer = require("./src/jsonserializer")
var Convert = require("./src/convert")
module.exports = {
    Logger: Logger,
    TempDB: TempDB,
    JsonSerializer: JsonSerializer,
    Convert: Convert,
    RandomNumber: (a, b) => randomnumber(a, b),
    Virtual: {
        StringVariable: (a) => virtualstring(a),
        ArrayVariable: (a) => virtualarray(a),
        EvalCode: (a) => evalcode(a)
    }
}