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


// smart contract

class SmartContract {
    constructor() {
      this.balance = 0;
    }
  
    deposit(amount) {
      this.balance += amount;
    }
  
    withdraw(amount) {
      if (this.balance >= amount) {
        this.balance -= amount;
        return true;
      } else {
        return false;
      }
    }
  }




  let GrovNestCoin = new Blockchain();
  let myContract = new SmartContract();
  
  myContract.deposit(100);   
  console.log(`Balance: ${myContract.balance}`);   // Balance: 100
  
  let result = myContract.withdraw(50); 
  if (result) {
    console.log(`Withdrew 50, balance is now ${myContract.balance}`);   //  //  Withdrew 50, balance is now 50
  } else {
    console.log(`Not enough funds to withdraw`);
  }
  
  GrovNestCoin.addBlock(
    new Block(1, "10/02/2023", { contract: myContract, action: "deposit", amount: 100 })
  );
  GrovNestCoin.addBlock(
    new Block(2, "12/02/2023", { contract: myContract, action: "withdraw", amount: 50 })
  );
  GrovNestCoin.addBlock(
    new Block(3, "13/02/2023", { contract: myContract, action: "withdraw", amount: 30 })
  );
  
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
            "timestamp": "10/02/2023",
            "data": {
                "contract": {
                    "balance": 50
                },
                "action": "deposit",
                "amount": 100
            },
            "prevHash": "8decad5de7fc6a926a1751d7bce55c97faea2d2b87ef5262933dcc59a75b4597",
            "hash": "7566c68e8de8c97a3aaa3bc91771c62b13b870b289cb1bb43308c3bd06b1c516"
        },
        {
            "index": 2,
            "timestamp": "12/02/2023",
            "data": {
                "contract": {
                    "balance": 50
                },
                "action": "withdraw",
                "amount": 50
            },
            "prevHash": "7566c68e8de8c97a3aaa3bc91771c62b13b870b289cb1bb43308c3bd06b1c516",
            "hash": "694fcd98cc6518fd25b5ef4221f430dbb2e5415e95accb8344b387af13af159a"
        },
          {
            "index": 3,
            "timestamp": "13/02/2023",
            "data": {
                "contract": {
                    "balance": 50
                },
                "action": "withdraw",
                "amount": 30
            },
            "prevHash": "954a1cb2f93e399206afc2fb44212f4e22856e26b49264be8207484aa56d897b",
            "hash": "4897f2c51cf5cf5b7a75254684ae9b6513d618a928144cd912c0ed2747984ecb"
        }
    ]
}
  */


  console.log("Is blockchain valid? " + GrovNestCoin.isChainValid());   // Is blockchain valid? true








  /*

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

*/








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

