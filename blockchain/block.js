const SHA256 =require('crypto-js/sha256');

const DIFFICULTY=4;
const MINE_RATE=2000;

class Block {
    constructor(timestamp,lastHash,hash,data,nonce,difficulty){
        this.timestamp=timestamp;
        this.lastHash=lastHash;
        this.hash=hash;
        this.data=data;
        this.nonce=nonce;
        this.difficulty=difficulty || DIFFICULTY;
    }
    toString(){ 
        return ` Block- 
        timestamp   : ${this.timestamp} 
        lastHash    : ${this.lastHash}
        hash        : ${this.hash}
        Nonce       : ${this.nonce}
        Difficulty  : ${this.difficulty}
        data        : ${this.data}
        `
    }
    static genesis (){
        return new this('Genesis time','---','123-fvsf',[],0,DIFFICULTY);
    }
    static mineBlock (lastBlock,data){
        let hash, timestamp;               
        const lastHash=lastBlock.hash;
        let {difficulty}=lastBlock;
        let nonce=0;
        do{
            timestamp = Date.now();            
            nonce++;
            difficulty=Block.adjustDificulty(lastBlock,timestamp);
            hash=this.hash(timestamp,lastHash,data,nonce,difficulty);
        }while(hash.substring(0,difficulty)!='0'.repeat(difficulty));


        return new this(timestamp,lastHash,hash,data,nonce,difficulty);
    }
    static hash(timestamp,lastHash,data,nonce,difficulty){
        return SHA256(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
    }
    static blockHash (block){
        const {timestamp,lastHash,data,nonce,difficulty}=block;
        return this.hash(timestamp,lastHash,data,nonce,difficulty);
    }
    static adjustDificulty(lastBlock,currentTime){
        let {difficulty}=lastBlock;
        // console.log(" currentTime :",currentTime,"  lastBlock.timestamp : ",lastBlock.timestamp,"\n");
        difficulty=lastBlock.timestamp+MINE_RATE >currentTime ?
        difficulty+1 : difficulty-1;
        return difficulty;
    }
}

module.exports=Block; 
