
/* DEF: a ~ z + A ~ Z + 0~6 = 62 */
const SHUFFLED_CHARS62 = "IkKBsnXz3RVhqcC2E6mwLbGPaTpWeZMvO4iu09SF5QtUjdNoxf7Y1DlHgAyJ8r";

module.exports = {
    /**
     * @param {Integer} number : 
     * @return {String}  
     */
    encode : (number) => {
        let res = "";
        number *= 62;
        while(number > 0){
            let digit = number % 62;
            res = SHUFFLED_CHARS62[digit] + res;
            number = Math.floor(number / 62);
        }
        return res;
    }
}