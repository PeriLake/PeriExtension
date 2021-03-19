class Logger {
    constructor() {
        this.logarray = []
    }
    glue() {
        var ar = [];
        for (var i = 0; i < arguments.length; i++) {
            ar.push(arguments[i])
        }
        var txt = ar.shift();
        return ar.join("") + txt + "\x1b[0m"
    }
    send() {
        var s = '',
            d = new Date();
        try {
            for (var i = 0; i < arguments.length; i++) {
                s += arguments[i]
            }
            console.log(s)
            if (this.logarray.length >= 70) {
                this.logarray.shift()
            }
            this.logarray.push(JSON.stringify(JSON.parse(`{"time":"${d.today()}-${d.timeNow()}","message":"${s.replace(/\\x1b\[[0-9]{1,2}m/g,"").replace(/\n/g,"").toString()}"}`)))
        } catch {}
    }
    sendtimelog() {
        var s = '',
            d = new Date();
        try {
            for (var i = 0; i < arguments.length; i++) {
                s += arguments[i]
            }
            console.log(`\x1b[36m[${d.today()} ${d.timeNow()}]: \x1b[0m` + s)
            if (this.logarray.length >= 70) {
                this.logarray.shift()
            }
            this.logarray.push(
                JSON.stringify(JSON.parse(`{"time":"${d.today()}-${d.timeNow()}","message":"${s.replace(/\\x1b\[[0-9]{1,2}m/g,"").replace(/\n/g,"").toString()}"}`)))
        } catch {}
    }
    logs() {
        return this.logarray
    }

    examples = {
        Log: (a, b) => {
            this.sendtimelog(this.glue(` ${a}: `, this.colors.purple), this.glue(b, this.colors.white))
        },
        ErrorLog: (a, b) => {
            this.sendtimelog(this.glue(` ${a}: `, this.colors.red), this.glue(b, this.colors.white))
        }
    }

}

Logger.prototype.bgcolors = {
    red: "\x1b[41m",
    green: "\x1b[42m",
    yellow: "\x1b[43m",
    cyan: "\x1b[44m",
    purple: "\x1b[45m",
    blue: "\x1b[46m",
    white: "\x1b[47m",
    default: "\x1b[0m"
}
Logger.prototype.colors = {
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    cyan: "\x1b[34m",
    purple: "\x1b[35m",
    blue: "\x1b[36m",
    white: "\x1b[37m",
    default: "\x1b[0m"
}

module.exports = Logger;