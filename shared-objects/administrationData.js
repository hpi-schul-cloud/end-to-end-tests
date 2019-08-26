const { CLIENT } = require("./servers");

module.exports = {
  urlAdministration: `${CLIENT.URL}/administration`,
  submitBtn: 'button[type=\'submit\']',
  administrateStudentsBtn: 'div[data-testid=\'administrateStudents\']',
  administrateTeachersBtn: 'div[data-testid=\'administrateTeachers\']',
  administrateClassesBtn:'div[data-testid=\'administrateClasses\']',
  addStudentBtn:'button[data-testid=\'addStudentBtn\']',
  setFirstName:'input[id=\'create_firstname\']',
  setLastName:'input[data-testid=\'createStudentSetLastname\']',
  setEmail:'input[data-testid=\'createStudentSetEmail\']',
  setEmail:'input[data-testid=\'createStudentSetEmail\']',
  sendALinkBox:'input[data-testid=\'createStudentSendALink\']',
  namesContainer: 'tbody[data-testid=\'studentsNamesContainer\']',
 

}
