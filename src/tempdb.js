const JsonSerializer = require("./jsonserializer")
class TempDB {
    constructor({
        intervalDuration = 3600 // 1 hours \ 3600 second
    }) {
        this.json = new JsonSerializer()
        setInterval(() => this.json = new JsonSerializer(), intervalDuration * 1000)
    }

    get(name) {
        return this.json.get(name)
    }
 /// todo client.on("restartingdb",func)
    has(a) {
        return this.json.has(a)
    }

    set(name, value) {
        this.json.set(name, value)
    }

    delete(a) {
        this.json.delete(a)
    }

    push(a, b) {
        this.json.push(a, b)
    }

    add(a, b) {
        this.json.add(a, b)
    }

    elementdelete(a,b){
        this.json.elementdelete(a, b)
    }

    size() {
        return Object.keys(this.json.json).length
    }

    length() {
        return Object.keys(this.json.json).length
    }
}

module.exports = TempDB;