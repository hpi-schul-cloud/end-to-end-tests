module.exports = {
    
    url: 'http://localhost:3100/login',
    //'https://test.schul-cloud.org/login',
    
    elem: {
        usernameInput: "section#loginarea input[data-testid='username']",
        passwordInput: "section#loginarea input[data-testid='password']",
        loginBtn: "section#loginarea input[data-testid='submit-login']",
        resultInitials: '.avatar-circle .initials' 
    },
    
};