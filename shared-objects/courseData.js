const { CLIENT } = require("./servers");

module.exports = {
  urlCourses: `${CLIENT.URL}/courses`,
  urlCoursesAdd: `${CLIENT.URL}/courses/add`,
  urlLogin: `${CLIENT.URL}/login`,
  urlLogout: `${CLIENT.URL}/logout`,
  urlLernStore: `${CLIENT.URL}/content/?inline=1&isCourseGroupTopic=true`,
  urlHomework: `${CLIENT.URL}/homework`,
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
    homeworkTab: 'button[data-testid="hometask"]',
    addHomeworkBtn: '.col-sm-12.add-button>a',
    homeworkName: '#homework-form > div:nth-child(1) > input',
    submitAddHomeworkBtn: '.btn.btn-primary.btn-submit',
    checkbox: '[data-testid="private-checkbox"]',
    teamworkActivate: '#teamSubmissions',



}
}
