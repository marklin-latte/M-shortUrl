const BloomFilter = require('bloomfilter').BloomFilter; 

const bloom = new BloomFilter(
    10000 * 256, // number of bits to allocate.
    16        // number of hash functions.
  );

/*
I was goint to use redis bloom filter. but the nodejs redis lib not support.
So I use the lib with memory bloom filter instead.
*/
module.exports = {
    add: (element) => {
        bloom.add(element);
    },
    check: (element) => {
        return bloom.test(element);
    }
}