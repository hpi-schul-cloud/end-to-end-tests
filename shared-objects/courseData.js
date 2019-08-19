const { CLIENT } = require("./servers");

module.exports = {
  url: `${CLIENT.URL}/courses`,
  url2: `${CLIENT.URL}/login`,
  elem: {
    addBtn: 'section#section-courses a[data-testid=\'courseAddButton\']',
    courseContainer:
      'section#section-courses div[class=\'sc-card-wrapper col-xl-3 col-lg-4 col-md-6 col-sm-12\']',
    nameCourse: 'section#section-course input[data-testid=\'coursename\']',
    colorCourse: 'section#section-course label[style=\'background: #FFEE58\']',
    teacherCourse: 'section#section-course select[data-testid=\'teachersearch\']',
    findTeacher: 'section#section-course option[data-testid=\'teacher\']',
    representativeCourse:
      'section#section-course select[data-testid\'substituent\']',
    appointmentCourse:
      'section#section-course input[data-testid=\'startingDate\']',
    cloneBtn: 'section#section-course input[data-testid=\'startingDate\']',

    weiterBtn: 'section#section-course button[data-next-label=\'Weiter\']',
    classesOfTheCourse: 'section#section-2 input[data-testid=\'classes\']',
    pupilsOfTheCourse: 'section#section-course select[data-testid=\'pupils\']',
    kursAnlegenUndWeiterBtn:
      'section#section-course button[data-submit-label=\'Kurs anlegen und Weiter\']',
    zurUebersichtBtn: 'section#section-course a[id=\'preshow\']',
    teilnehmerFenster: 'section#section-courses '
  }
};
