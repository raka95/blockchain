const BlockChain = require('./index');
const Block=require('./block');

describe('BlockChain',()=>{
    let bc,bc2;
    beforeEach(()=>{
        bc=new BlockChain();
        bc2=new BlockChain();        
    });
    it("starts with genesis Block",()=>{
        expect(bc.chain[0]).toEqual(Block.genesis());
    });
    it('adds a new Block',()=>{
        const data="foo";
        // console.log(bc);
        bc.addBlock(data);
        // console.log(bc.addBlock(data));

        expect(bc.chain[bc.chain.length - 1].data).toEqual(data);
    });
    it('validates a valid chain ', ()=>{
        bc2.addBlock('cat');
        expect(bc.isValidChain(bc2.chain)).toBe(true);
    })
    it('inValidates a chain with a corrupt genesis bock ' , ()=>{
        bc2.chain[0].data="sth";
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    })
    it('invalidates a corrupt chain',()=>{
         bc2.addBlock('hat');
        // console.log(A,"ddddd",bc2.chain);
        bc2.chain[1].data='bad data';
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    })
    it('replaces the chain with a valid chain',()=>{
        bc2.addBlock('pen');
        // bc.replaceChain(bc2.chain);
        bc.replaceChain(bc2.chain);
        expect(bc.chain).toEqual(bc2.chain);
    })
    it('does not replace the chain with one of less than or equal to length of the chain ', ()=>{
        bc.addBlock('book');
        bc.replaceChain(bc2.chain);
        expect(bc.chain).not.toEqual(bc2.chain);
    })
})
