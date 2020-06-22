const { CLIENT } = require("./servers");

module.exports = {
  url: `${CLIENT.URL}/login`,
  urlDashboard: `${CLIENT.URL}/dashboard`,

  defaultTeacherUsername: 'klara.fall@schul-cloud.org',
  defaultTeacherpassword: 'Schulcloud1!',
  eligiblePupilUsername: 'demo-schueler@schul-cloud.org',
  eligiblePupilPassword: 'schulcloud',
  notEligiblePupilUsername: 'paula.meyer@schul-cloud.org',
  notEligiblePupilPassword: 'Schulcloud1!',
  defaultAdminUsername: 'admin@schul-cloud.org',
  defaultAdminPassword: 'Schulcloud1!',

  elem: {
    frontpageLoginBtn: 'a[data-testid="login-btn"]',
    usernameInput: 'section#loginarea input[data-testid="username"]',
    passwordInput: 'section#loginarea input[data-testid="password"]',
    loginBtn: 'section#loginarea input[data-testid="submit-login"]',
    submitBtn: 'input[data-testid="submit-login"]',
    resultInitials: '.avatar-circle .initials',
    icon: 'div[data-testid="icon-clickable"]',
    settings: 'a[data-testid="settings"]',
    logout: 'a[data-testid="logout"]',
    // Einwilligungserklärung:
    box1: 'input[name="privacyConsent"]',
    box2: 'input[name="termsOfUseConsent"]',
    passwordSet: 'input[data-testid="firstlogin_password"]',
    passwordSet2: 'input[data-testid="firstlogin_password_control"]',

    // course_tabs:
    topics: 'button[data-testid="topics"]',
    tasks_tab: 'button[data-testid="hometasks"]',
    tools: 'button[data-testid="tools"]',
    groups: 'button[data-testid="groups"]',
    // news:
    timeNewsMustBePublished: 'input[data-testid="news_date_to_be_displayed"]',
    submitNewsBtn: 'button[data-testid="btn_news_submit"]',
    // new password
    iconClickable: '[data-testid="initials"]',
    currentPassword: 'input[data-testid="settings_password_current"]',
    newPassword: 'input[data-testid="settings_password_new"]',
    repeatNewPassword: 'input[data-testid="settings_password_control"]',
    loginNotification: 'div[data-testid="notification"]',
    submitNewPassword: '[data-testid="submit_new_password_btn"]',

  }
};
