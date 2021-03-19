function toJsonSerializer(a) {
    if (typeof a == "object") {
        return new require("./jsonserializer")().json = a
    }
    return false
}

function parseduration(a) {
    var thi = parseInt(a)
    hrs = ~~(thi / 3600),
        mins = ~~((thi % 3600) / 60),
        secs = ~~thi % 60,
        ret = "";
    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "")
    }
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

function codeparser(a) {
    return require('util').inspect(a, {
        depth: 10000
    })
}

function tobool(a) {
    return a.toLowerCase() == "true" ? true : false
}

function tonumber(a) {
    if (a.isnumber()) {
        return parseInt(a)
    } else {
        return 0
    }
}

module.exports = {
    JsonSerializer: (a) => toJsonSerializer(a),
    Duration: (a) => parseduration(a),
    Code: (a) => codeparser(a),
    Bool: (a) => tobool(a),
    Number: (a) => tonumber(a)
}