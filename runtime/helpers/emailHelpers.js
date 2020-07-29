'use strict';
let log = global.log;

module.exports = {
/* ========== EMAIL FUNCTIONALITY ==========*/
   /**
       *   Sends an Email to the concerned users with the log and the test report
       */
   klassiEmail: function (err) {
       let mailer = require('../runtime/mailer').klassiSendMail();
       if(err) {
           log.error('This is a Email system error: ' + err.stack);
           throw err;
       }
       return mailer;
   },
} 