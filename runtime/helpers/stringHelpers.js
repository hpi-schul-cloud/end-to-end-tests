'use strict';
module.exports= {

    cutStringAfterSymbol: async function(string, symbol) {
        return string.substring(0,string.indexOf(`${symbol}`));
       }
    
}
