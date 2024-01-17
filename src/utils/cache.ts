//NOTE: Instead of this caching, we can use REDIS database.

interface ICacheValue {
    value:  any;
    ttl:    Date;
}

class Cache {
    // cacheMap: ICacheMap;
    cacheMap: { [key: string]: ICacheValue; } = {};
    constructor() {
        this.cacheMap = {};
    }

    put(key: string, value: any): void {
        this.cacheMap[key] = {"value": value, "ttl": new Date(new Date().getTime() + 3*60000)};
    }
     
    get(key: string) {
        
        if (key && this.cacheMap.hasOwnProperty(key)) {
            let cacheValue = this.cacheMap[key];
            if (cacheValue && new Date() < cacheValue.ttl) {
                console.log("Cache Hit:" + key);
                return cacheValue.value;
            } else {
                delete this.cacheMap[key];
                console.log("TTL expired, Cache Miss:" + key);
                return null;
            }
        }
        console.log("Cache Miss:" + key);
        return null;
    }
}

export default new Cache();