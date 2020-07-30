const { CLIENT } = require("./servers");

module.exports = {
  urlAdministration: `${CLIENT.URL}/administration`,
  urlKlassenVerwalten: `${CLIENT.URL}/administration/classes`,
  submitBtn: 'button[type=\'submit\']',
  administrateStudentsBtn: 'div:nth-child(1) > div > div > div > h2',
  administrateTeachersBtn: 'div[data-testid=\'administrate_teachers\']',
  administrateClassesBtn:'div[data-testid=\'administrate_classes\']',
  classCreateBtn: 'a[data-testid=\'createClass\']',
  classNameInputField: 'input[data-testid=\'Klassenbezeichnung\']',
  confirmClassCreate: 'button[data-testId=\'confirmClassCreate\']',
  addStudentBtn:'div.fab > div > button > svg',
  schülerAnlegen:'div.inner-fabs.expanded.expand-top > a:nth-child(1) > svg',
  setFirstName:'input[data-testid=\'input_create-user_firstname\']',
  setLastName:'input[data-testid=\'input_create-user_lastname\']',
  setEmail:'input[data-testid=\'input_create-user_email\']',
  sendALinkBox:'input[data-testid=\'create_student_input_send_link\']',
  namesContainer: 'div.table-content-wrapper > table > tbody',
  consentSubmitBtn: 'button[data-testid=\'submit_consent\']',
  birthday_field: 'input[data-testid=\'create_birthday\']',
  classCreationExtraOptions: 'a[data-testid=\'classCreationExtraOptions\']',
  administrationsTabs: 'ul.subitems span'
}
