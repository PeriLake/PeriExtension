class JsonSerializer {
    constructor() {
        this.json = {}
    }
    set(name, value) {
        if (name.includes(".")) {
            var split = name.split(".")
            var prof = "",
                small = []
            name.split(".").forEach(nk => {
                small.push(nk)
                prof += `["${nk}"]`
                if (!this.get(small.join("."))) {
                    eval(`this.json${prof}={}`)
                }
            });
            eval(`this.json${prof}=value`)
        } else {
            this.json[name] = value
        }
        return this
    }
    delete(a) {
        if (a.includes(".")) {
            var str = "this.json"
            a.split(".").forEach(nk => {
                str += `["${nk}"]`
            });
            eval(`delete ${str}`)

        } else {
            delete this.json[a]
        }
        return this
    }
    add(a, b) {
        if (a.includes(".")) {
            var str = "this.json"
            a.split(".").forEach(nk => {
                str += `["${nk}"]`
            });
            eval(`if (typeof ${str} == "number") {${str}+=${b}} else {new Error("Object is not number")}`)
        } else {
            if (typeof this.json[a] == "number") {
                this.json[a] += b
            } else {
                //todo error message
                new Error("Object is not number")
            }
        }
        return this
    }
    push(a, b) {
        if (a.includes(".")) {
            var str = "this.json"
            a.split(".").forEach(nk => {
                str += `["${nk}"]`
            });
            eval(`if(Array.isArray(${str})) {${str}.push("${b}")} else {new Error("Object is not array")}`)
        } else {
            if (Array.isArray(this.json[a])) {
                this.json[a].push(b)
            } else {
                /* todo error message */
                new Error("Object is not array")
            }
        }
        return this
    }
    elementdelete(a, b) {
        if (a.includes(".")) {
            var str = "this.json"
            a.split(".").forEach(nk => {
                str += `["${nk}"]`
            });
            eval(`if(Array.isArray(${str})) {${str}.elementdelete("${b}")} else {new Error("Object is not array")}`)
        } else {
            if (Array.isArray(this.json[a])) {
                this.json[a].elementdelete(b)
            } else {
                /* todo error message */
                new Error("Object is not array")
            }
        }
        return this
    }
    toJSON() {
        return this.json
    }
    get(name) {
        if (name.includes(".")) {
            var str = this.json
            name.split(".").forEach(nk => {
                eval(`if(str&&str["${nk}"]){str=str["${nk}"];}else{str=undefined}`)
            });
            return str
        } else {
            return this.json[name]
        }
    }
    has(a) {
        return !this.get(a) ? false : true
    }
}

module.exports = JsonSerializer;