const { CLIENT } = require("./servers");

module.exports = {
  url: `${CLIENT.URL}/login`,
  elem: {
    usernameInput: 'section#loginarea input[data-testid="username"]',
    passwordInput: 'section#loginarea input[data-testid="password"]',
    loginBtn: 'section#loginarea input[data-testid="submit-login"]',
    resultInitials: '.avatar-circle .initials',
    failedLoginNotification:
      'section#loginarea div[data-testid="notification-content"]'
  }
};
