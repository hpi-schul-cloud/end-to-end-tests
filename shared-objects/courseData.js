const { CLIENT } = require("./servers");

module.exports = {
	urlCourses: `${CLIENT.URL}/courses`,
	urlCoursesAdd: `${CLIENT.URL}/courses/add`,
	urlLogin: `${CLIENT.URL}/login`,
	urlLogout: `${CLIENT.URL}/logout`,
	urlLernStore: `${CLIENT.URL}/content/?inline=1&isCourseGroupTopic=true`,
	urlHomework: `${CLIENT.URL}/homework`,
	apiRequestUrl: `${CLIENT.URL}/me`,
	elem: {
		addBtn: 'section#section-courses a[data-testid=\'courseAddButton\']',
		courseContainer:
			'section#section-courses div[class=\'sc-card-wrapper col-xl-3 col-lg-4 col-md-6 col-sm-12\']',
		nameCourse: 'input.js-course-name-input',
		colorCourse: 'label[style=\'background: #FFEE58\']',
		teacherCourse: 'select[data-testid=\'teachersearch\']',
		findTeacher: 'option[data-testid=\'teacher\']',
		representativeCourse: '[data-testid=\'substituent\']',
		representativeContainer: '[data-testid=\'courseSubstitute_container\']',
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
		uploadBtn: '//*[@id="main-content"]/div/section[1]/div/div/div[1]/input',
		importCourseBtn: '[data-testid="import-course-btn"]',
		createCourseBtn: '[data-testid="create-course-btn"]',
		stage1Selector: '[data-testid="section-1"]',
		stage2Selector: '[data-testid="section-2"]',
		stage2Selector: '[data-testid="section-3"]',
		teacherNamesInCreateCourse: '[data-testid="teachers_container"]',
		timeSpan: {
			start: '[data-testid="date_start"]',
			end: '#untilDate',
		},
		courseColours: {
			grey:         '[#input#ACACAC]', 
			metallicGold: '[#input#ACACAC]',
			blue:         '[#input#00E5FF]', 
			green:        '[#input#1DE9B6]', 
			darkGrey:     '[#input#546E7A]', 
			goldenPoppy:  '[#input#FFC400]', 
			martini:      '[#input#BCAAA4]', 
			violetRed:    '[#input#FF4081]', 
			corn:         '[#input#FFEE58]',  

		},
		sections: {
			sectionOne: '[data-testid="section-1-area" ]',
			sectionTwo: '[data-testid="section-2-area" ]',
			sectionThree: '[data-testid="section-3-area" ]',
		},
		classContainer: '[data-testid="class_container"]',
		studentsContainer: '[data-testid="students_container"]',
		section_three_btns: {
			einen_weiteren_kurs_anlegen_btn: '[data-testid="einen-weiteren-kurs-anlegen-btn"]',
			zur_uebersicht_btn:  '[data-testid="zur-uebersicht-btn"]',
		},
		activeCourses: '[data-section="js-active"]',
		coursesPage: {
			container_of_element: '[data-testid="container_of_element"]', // in this case testid of a single course
			header_of_element: '[data-testid="header-of-element"]', //  eg background colour
			title: '[data-testid="title_of_an_element"]'
		}




}
}
