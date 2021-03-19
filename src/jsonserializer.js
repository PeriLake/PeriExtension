class JsonSerializer {
    constructor() {
        this.json = {}
    }
    set(name, value) {
        if (name.includes(".")) {
            var spl = name.split(".");
            var jsn = {};
            var str = "jsn"
            spl.forEach(nk => {
                jsn[nk] = {}
                str += peri.Virtual.StringVariable(function*() {
                    yield `[${nk}]`
                })
            });
            eval(`str=${str}`)
            str = value
            this.json = Object.assign(this.json, str)
        } else {
            this.json[name] = value
        }
        return this
    }
    delete(a) {
        if (a.includes(".")) {
            var str = "this.json"
            a.split(".").forEach(nk => {
                str += peri.Virtual.StringVariable(function*() {
                    yield `[${nk}]`
                })
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
                str += peri.Virtual.StringVariable(function*() {
                    yield `[${nk}]`
                })
            });
            eval(`str=${str}`)
            if (typeof str == "number") {
                str += b
            } else {
                /*Todo Error message*/
                new Error("Object is not number")
            }
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
                str += peri.Virtual.StringVariable(function*() {
                    yield `[${nk}]`
                })
            });
            eval(`str=${str}`)
            if (Array.isArray(str)) {
                str.push(b)
            } else {
                /* todo error message */
                new Error("Object is not array")
            }
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
    elementdelete(a,b){
        if (a.includes(".")) {
            var str = "this.json"
            a.split(".").forEach(nk => {
                str += peri.Virtual.StringVariable(function*() {
                    yield `[${nk}]`
                })
            });
            eval(`str=${str}`)
            if (Array.isArray(str)) {
                str.elementdelete(b)
            } else {
                /* todo error message */
                new Error("Object is not array")
            }
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
            var str = "this.json"
            a.split(".").forEach(nk => {
                str += peri.Virtual.StringVariable(function*() {
                    yield `[${nk}]`
                })
            });
            eval(`return ${str}`);
        } else {
            return this.json[name]
        }
    }
    has(a) {
        if (a.includes(".")) {
            var str = "this.json"
            a.split(".").forEach(nk => {
                str += peri.Virtual.StringVariable(function*() {
                    yield `[${nk}]`
                })
            });
            eval(`str=${str}`)
            return !str ? false : true;
        } else {
            return !this.json[a] ? false : true
        }
    }
}

module.exports = JsonSerializer;