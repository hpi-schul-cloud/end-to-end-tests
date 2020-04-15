const { CLIENT } = require("./servers");

module.exports = {
	urlAdministration: `${CLIENT.URL}/administration`,
	submitBtn: "button[type='submit']",
	administrateStudentsBtn: "div[data-testid='administrate_students']",
	administrateTeachersBtn: "div[data-testid='administrate_teachers']",
	administrateClassesBtn: "div[data-testid='administrate_classes']",
	addStudentBtn: "button[data-testid='btn_add_student']",
	setFirstName: "input[data-testid='input_create-user_firstname']",
	setLastName: "input[data-testid='input_create-user_lastname']",
	setEmail: "input[data-testid='input_create-user_email']",
	sendALinkBox: "input[data-testid='input_create-student_send-registration']",
	namesContainer: "tbody[data-testid='students_names_container']",
	consentSubmitBtn: "button[data-testid='submit_consent']",
	birthday_field: "[data-testid='input_create-student_birthdate'] input",
	submitBtn: "button[data-testid='button_create-user_submit']",
};
