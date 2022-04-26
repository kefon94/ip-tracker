class IpTracker {

    /**
     * Constructor of the class
     * @param {number} topListLimit 
     */
    constructor(topListLimit) {
        this.topListLimit = topListLimit || 100;
        this.topList = [];
        this.ipCountMap = new Map();
    }

    /**
     * Method to track an ip
     * @param {string} ip 
     */
    request_handled(ip) {
        //Setting count for ip, if not found then count = 1
        const count = this.ipCountMap.has(ip) ?  this.ipCountMap.get(ip) + 1 : 1;
        // Setting ip in the map
        this.ipCountMap.set(ip, count);

        // Finding the position, if ip is not found then pos will be the last one

        let pos = 0;

        while(pos < this.topList.length && this.topList[pos] !== ip) pos++;

        // Moving ips to the right while new ip count  > ip count in top list 
        while (pos > 0 && count > this.ipCountMap.get(this.topList[pos -1])) {
            this.topList[pos] = this.topList[pos -1];
            pos--; 
        }

        // putting ip in respective position of the list
        this.topList[pos] = ip;

        // keeping the limit of the array
        this.topList.splice(this.topListLimit);
    }

    /**
     * Method to get top list limit
     * @returns {number} topListLimit
     */
    getTopListLimit() {
        return this.topListLimit;
    }

    /**
     * Method to get top list
     * @returns {array}
     */
    getTopList() {
        return this.topList;
    }

    /**
     * clear method to remove all ips tracked and top list of the day
     */
     clear() {
        this.ipCountMap = new Map();
        this.topList = [];
    }
}

module.exports = IpTracker;
