const URL = require('url').URL;

module.exports = {
    /**
     * @param {String} url
     * @returns {Boolean}
     */
    isValidUrl: (url) => {
        try {
            const temp = new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    }
}