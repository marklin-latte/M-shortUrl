const BloomFilter = require('bloomfilter').BloomFilter; 

const bloom = new BloomFilter(
    10000 * 256, // number of bits to allocate.
    16        // number of hash functions.
  );

module.exports = {
    add: (element) => {
        bloom.add(element);
    },
    check: (element) => {
        return bloom.test(element);
    }
}