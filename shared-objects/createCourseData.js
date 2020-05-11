const { CLIENT } = require('./servers');

module.exports = {
	url: `${CLIENT.URL}/login`,
	elem: {
		courseButtonDashboard: 'a[data-testid="Kurse"]',
		createCourseButton: 'a[data-testid="CreateCourseButton"]',
		submitCourseButton: 'button[data-testid="CreateCourseButton"]',
		courseNameField: 'input[data-testid="CourseName"]',
		courseScCardTitle: 'span[data-testid="ScCardTitle"]'
	}
};
