const JsonSerializer = require("./jsonserializer")
class TempDB {
    constructor({
        intervalDuration = 3600 // 1 hours \ 3600 second
    }) {
        this.events = {};
        this.json = new JsonSerializer()
        setInterval(() => {
            if (this.events["reset"]) {
                this.events["reset"].forEach(a => {
                    a(this.json.json);
                });
            }
            this.json = new JsonSerializer();
        }, intervalDuration * 1000)
    }

    on(type, callback) {
        this.events[type] = this.events[type] || [];
        this.events[type].push(callback);
        return this
    }

    reset() {
        this.events.reset.forEach(a => {
            a(this.json.json);
        });
        this.json = new JsonSerializer();
    }

    get(name) {
        var dei=this.json.get(name);
        if (this.events["get"]) {
            this.events["get"].forEach(c => {
                c(name,dei);
            });
        }
        return dei

    }
    /// todo client.on("restartingdb",func)
    has(a) {
        return this.json.has(a)
    }

    set(name, value) {
        this.json.set(name, value)
        if (this.events["set"]) {
            this.events["set"].forEach(a => {
                a(name, value);
            });
        }
    }

    delete(a) {
        this.json.delete(a)
        if (this.events["delete"]) {
            this.events["delete"].forEach(c => {
                c(a);
            });
        }
    }

    push(a, b) {
        this.json.push(a, b)
        if (this.events["push"]) {
            this.events["push"].forEach(c => {
                c(a, b);
            });
        }
    }

    add(a, b) {
        this.json.add(a, b)
        if (this.events["add"]) {
            this.events["add"].forEach(c => {
                c(a, b);
            });
        }
    }

    elementdelete(a, b) {
        this.json.elementdelete(a, b)
        if (this.events["elementdelete"]) {
            this.events["elementdelete"].forEach(c => {
                c(a, b);
            });
        }
    }

    size() {
        return Object.keys(this.json.json).length
    }

    length() {
        return Object.keys(this.json.json).length
    }
}

module.exports = TempDB;
