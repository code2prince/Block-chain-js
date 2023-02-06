const SHA256 = require('crypto-js/sha256')

class Block{
    constructor(index, timestamp, data, prevHash=''){
        this.index= index;
        this.timestamp= timestamp;
        this.data= data;
        this.prevHash=prevHash;
        this.hash= this.calculateHash();
    }
    calculateHash(){
        return SHA256(this.index + this.prevHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain=[this.createGenesisBlock()];
    }
    createGenesisBlock(){
        return new Block(0, "06/02/2023", "Genesis block", "0");
    }
    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }
    addBlock(newBlock){
        newBlock.prevHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}
 let PrinceCoin = new Blockchain();
 PrinceCoin.addBlock(new Block(1,'18/03/2023',{amount: 4}));
 PrinceCoin.addBlock(new Block(2,'20/03/2023',{amount: 6}));

 console.log(JSON.stringify(PrinceCoin, null, 4));

 /*
 {
    "chain": [
        {
            "index": 0,
            "timestamp": "06/02/2023",
            "data": "Genesis block",
            "prevHash": "0",
            "hash": "8decad5de7fc6a926a1751d7bce55c97faea2d2b87ef5262933dcc59a75b4597"
        },
        {
            "index": 1,
            "timestamp": "18/03/2023",
            "data": {
                "amount": 4
            },
            "prevHash": "8decad5de7fc6a926a1751d7bce55c97faea2d2b87ef5262933dcc59a75b4597",
            "hash": "44ceffd016ba4c0244b80dc51f7d135aa0fd0e72ba10e6e449f75167c0c83d37"
        },
        {
            "index": 2,
            "timestamp": "20/03/2023",
            "data": {
                "amount": 6
            },
            "prevHash": "44ceffd016ba4c0244b80dc51f7d135aa0fd0e72ba10e6e449f75167c0c83d37",
            "hash": "3ecc4de26b57e274208dca40eb5ee9c9632d3742025d4ddc8199dfb088a9f181"
        }
    ]
}
 */