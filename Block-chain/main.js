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
    isChainValid(){
        for(let i=1; i<this.chain.length; i++){
            const currentBlock = this.chain[i];
            const prevBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            if(currentBlock.prevHash !== prevBlock.hash){
                return false;
            }
        }
        return true;
    }
}
 let GrovNestCoin = new Blockchain();
 GrovNestCoin.addBlock(new Block(1,'18/03/2023',{amount: 4}));
 GrovNestCoin.addBlock(new Block(2,'20/03/2023',{amount: 6}));
 GrovNestCoin.addBlock(new Block(3,'22/03/2023',{amount: 3}));
 GrovNestCoin.addBlock(new Block(4,'25/03/2023',{amount: 7}));

 console.log('Is Block-chain valid??: '  + GrovNestCoin.isChainValid());   // Is Block-chain valid??: true

// tempering with data
GrovNestCoin.chain[1].data = {amount: 100};

GrovNestCoin.chain[1].hash = GrovNestCoin.chain[1].calculateHash();


console.log('now Is Block-chain valid :'  + GrovNestCoin.isChainValid());   // now Is Block-chain valid :false
// we cann't tempered the blocks



// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 console.log(JSON.stringify(GrovNestCoin, null, 4));

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
                "amount": 100
            },
            "prevHash": "8decad5de7fc6a926a1751d7bce55c97faea2d2b87ef5262933dcc59a75b4597",
            "hash": "4ca0be0995fea586d1baae6a7673572562bc65f2737b9e6e54d60209e05bb575"
        },
        {
            "index": 2,
            "timestamp": "20/03/2023",
            "data": {
                "amount": 6
            },
            "prevHash": "44ceffd016ba4c0244b80dc51f7d135aa0fd0e72ba10e6e449f75167c0c83d37",
            "hash": "3ecc4de26b57e274208dca40eb5ee9c9632d3742025d4ddc8199dfb088a9f181"
        },
        {
            "index": 3,
            "timestamp": "22/03/2023",
            "data": {
                "amount": 3
            },
            "prevHash": "3ecc4de26b57e274208dca40eb5ee9c9632d3742025d4ddc8199dfb088a9f181",
            "hash": "3db7b501a7939d2dbe7adb0eb466f8c0803aa6d51b09dc24295b480fe87a8798"
        },
        {
            "index": 4,
            "timestamp": "25/03/2023",
            "data": {
                "amount": 7
            },
            "prevHash": "3db7b501a7939d2dbe7adb0eb466f8c0803aa6d51b09dc24295b480fe87a8798",
            "hash": "dc26c4fb37b3294f4e1a4b8b34c8d31aff20e3db7a9e810d249de9c768216007"
        }
    ]
}
 */

