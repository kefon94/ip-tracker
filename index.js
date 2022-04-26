const IpTracker = require('./IpTracker');

// set of Ips for testing
const ips = [
    {
        ip: '15.214.137.4',
        occurences: 3
    },
    {
        ip: '15.214.137.1',
        occurences: 2
    },
    {
        ip: '15.214.137.2',
        occurences: 2
    },
    {
        ip: '15.214.137.3',
        occurences: 1
    },
    {
        ip: '15.214.137.5',
        occurences: 1
    },
    {
        ip: '15.214.137.6',
        occurences: 1
    }
];

/**
 * Function to generate list of ips randomly according to a occurrence recursively 
 * @param {array} inputList contains object like { ip: <string>, occurences: <number> } 
 * @param {array} outputList output list with all the ips and occurrences appearing randomly.
 * @returns {array} output list
 */
const randomIpListGenerator = (inputList, outputList) => {
    if (inputList.length === 0 ) return outputList; // condition to stop the recusive function
    const newInputList = [...inputList];
    const newOutputList = [...outputList];
    const randomIpIndex = Math.floor(Math.random() * newInputList.length);
    const randomIp = {...newInputList[randomIpIndex]};
    newOutputList.push(randomIp.ip);
    randomIp.occurences = randomIp.occurences -1;
    if (randomIp.occurences) newInputList[randomIpIndex] = randomIp; // replace the ip with the occurence updated
    else newInputList.splice(randomIpIndex, 1); // remove the ip with 0 occurences
    return randomIpListGenerator(newInputList, newOutputList);
};

const ipsForTesting = randomIpListGenerator(ips, []);

console.log('ip list generated with random order', ipsForTesting);

const ipTracker = new IpTracker();

ipsForTesting.forEach(ip => {
    ipTracker.request_handled(ip);
});

const topList = ipTracker.getTopList();

console.log('top list', topList);

ipTracker.clear();

const topList2 = ipTracker.getTopList();

console.log('top list after clear', topList2);

