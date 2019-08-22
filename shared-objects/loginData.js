const { CLIENT } = require("./servers");

module.exports = {
  url: `${CLIENT.URL}/login`,

  deafultTeacherUsername: 'klara.fall@schul-cloud.org',
  defaultTeacherpassword: 'Schulcloud1!',
  eligiblePupilUsername: 'demo-schueler@schul-cloud.org',
  eligiblePupilPassword: 'schulcloud',
  notEligiblePupilUsername: 'paula.meyer@schul-cloud.org',
  notEligiblePupilPassword: 'Schulcloud1!',

  elem: {
    usernameInput: 'section#loginarea input[data-testid=\'username\']',
    passwordInput: 'section#loginarea input[data-testid=\'password\']',
    loginBtn: 'section#loginarea input[data-testid=\'submit-login\']',
    resultInitials: '.avatar-circle .initials',
    icon: 'div[data-testid=\'icon-clickable\']',
    settings: 'a[data-testid=\'settings\']',
    logout: 'a[data-testid=\'logout\']',
    // Einwilligungserklärung:
    box1: 'input[name=\'privacyConsent\']',
    box2: 'input[name=\'termsOfUseConsent\']',
    passwordSet: 'input[data-testid=\'password\']',
    passwordSet2: 'input[data-testid=\'password_control\']',

    // course_tabs:
    topics: 'button[data-testid=\'topics\']',
    tasks_tab: 'button[data-testid=\'hometasks\']',
    tools: 'button[data-testid=\'tools\']',
    groups: 'button[data-testid=\'groups\']',

  }
};
