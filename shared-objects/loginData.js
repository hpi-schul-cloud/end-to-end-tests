module.exports = {
  url: 'http://localhost:3100/login',
  //'https://test.schul-cloud.org/login',
  deafultTeacherUsername: 'klara.fall@schul-cloud.org',
  defaultTeacherpassword: 'Schulcloud1!',
  eligiblePupilUsername: 'demo-schueler@schul-cloud.org',
  eligiblePupilPassword: 'schulcloud',
  notEligiblePupilUsername: 'paula.meyer@schul-cloud.org',
  notEligiblePupilPassword: 'Schulcloud1!',

  elem: {
    usernameInput: "section#loginarea input[data-testid='username']",
    passwordInput: "section#loginarea input[data-testid='password']",
    loginBtn: "section#loginarea input[data-testid='submit-login']",
    resultInitials: '.avatar-circle .initials',
    failedLoginNotification:
      "section#loginarea div[data-testid='notification-content']"
  }
};
