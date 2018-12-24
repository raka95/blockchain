const Block =require("./Block");
const block =new Block("a","b","c","d");

// console.log(block.toString());
// console.log(Block.genesis().toString());


const fooBlock = Block.mineBlock(Block.genesis(),"foooo");
console.log(fooBlock.toString());
