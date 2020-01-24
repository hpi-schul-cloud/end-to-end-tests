const { CLIENT } = require("./servers");

module.exports = {
  urlCourses: `${CLIENT.URL}/courses`,
  urlCoursesAdd: `${CLIENT.URL}/courses/add`,
  urlLogin: `${CLIENT.URL}/login`,
  urlLogout: `${CLIENT.URL}/logout`,
  lernStoreUrl: `${CLIENT.URL}/content/?inline=1&isCourseGroupTopic=true`,
  elem: {
    addBtn: 'section#section-courses a[data-testid=\'courseAddButton\']',
    courseContainer:
      'section#section-courses div[class=\'sc-card-wrapper col-xl-3 col-lg-4 col-md-6 col-sm-12\']',
    nameCourse: 'input.js-course-name-input',
    colorCourse: 'label[style=\'background: #FFEE58\']',
    teacherCourse: 'select[data-testid=\'teachersearch\']',
    findTeacher: 'option[data-testid=\'teacher\']',
    representativeCourse:
      'select[data-testid\'substituent\']',
    appointmentCourse:
      'input[data-testid=\'date_start\']',
    cloneBtn: 'input[data-testid=\'date_start\']',

    weiterBtn: 'button[data-next-label=\'Weiter\']',
    classesOfTheCourse: 'section#section-2 input[data-testid=\'classes\']',
    pupilsOfTheCourse: 'select[data-testid=\'pupils\']',
    kursAnlegenUndWeiterBtn:
      'section.section-course button[data-submit-label=\'Kurs anlegen und Weiter\']',
    zurUebersichtBtn: 'section.section-course a[id=\'preshow\']',
    teilnehmerFenster: 'section#section-courses ',
    // Dataschutz:
    schulcloudErkundenBtn: 'a[data-testid=\'btn_schul-cloud_erkunden\']',
    // homework:
    evaluationInProcent: 'input[data-testid=\'evaluation_procent\']',
    topicsTab: 'button[data-testid=\'topics\']',
    selectorWithMultipleChoiceStudents:'select[data-testid=\'pupils\']',

}
}
