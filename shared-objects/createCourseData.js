module.exports = {

    url: 'http://localhost:3100/login',
    //'https://test.schul-cloud.org/login',

    elem: {
        usernameInput: "section#loginarea input[data-testid='username']",
        passwordInput: "section#loginarea input[data-testid='password']",
        loginBtn: "section#loginarea input[data-testid='submit-login']",
        courseButtonDashboard: "a[data-testid='Kurse']",
        createCourseButton: "a[data-testid='CreateCourseButton']",
        submitCourseButton: "button[data-testid='CreateCourseButton']",
        courseNameField: "input[data-testid='CourseName']",
        courseScCardTitle: "span[data-testid='ScCardTitle']"
    },

};