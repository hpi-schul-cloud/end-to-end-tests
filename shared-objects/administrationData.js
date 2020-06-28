const { CLIENT } = require("./servers");

module.exports = {
  urlAdministration: `${CLIENT.URL}/administration`,
  urlKlassenVerwalten: `${CLIENT.URL}/administration/classes`,
  submitBtn: 'button[type=\'submit\']',
  administrateStudentsBtn: 'div[data-testid=\'administrate_students\']',
  administrateTeachersBtn: 'div[data-testid=\'administrate_teachers\']',
  administrateClassesBtn: 'div[data-testid=\'administrate_classes\']',
  classCreateBtn: 'a[data-testid=\'createClass\']',
  classNameInputField: 'input[data-testid=\'Klassenbezeichnung\']',
  confirmClassCreate: 'button[data-testId=\'confirmClassCreate\']',
  addStudentBtn: 'button[data-testid=\'btn_add_student\']',
  setFirstName: 'input[id=\'create_firstname\']',
  setFirstName: 'input[data-testid=\'create_student_input_firstname\']',
  setLastName: 'input[data-testid=\'create_student_input_lastname\']',
  setEmail: 'input[data-testid=\'create_student_input_email\']',
  sendALinkBox: 'input[data-testid=\'create_student_input_send_link\']',
  namesContainer: 'tbody[data-testid=\'students_names_container\']',
  consentSubmitBtn: 'button[data-testid=\'submit_consent\']',
  birthday_field: 'input[data-testid=\'create_birthday\']',
<<<<<<< HEAD
  classCreationExtraOptions: 'a[data-testid=\'classCreationExtraOptions\']'
=======
  administrationsTabs: 'ul.subitems span'
>>>>>>> 238dfdf224eab7fc660e3860e5c4bbf238554045
}
