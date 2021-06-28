@userSettings @language @e2eCore
Feature: Test set for user settings

    Background: User opens Schul-cloud homepage Website
        Given user arrives on the Schul-Cloud homepage

    @changeLanguageMenu
    Scenario Outline: As a user, I want to be able to change the language
        Given <userRole> logs in with email '<username>' and password '<password>'
        #And <userRole> login is successful
        And <userRole> goes to user settings
        When <userRole> fill password in settings '<password>'
        And <userRole> changes language to '<language>'
        Then <userRole> should see that all menu items are visible: '<menuItems>'
        Examples:
            | userRole | username                          | password       | language | menuItems                                                                                                                  |
            | admin    | olivier.admin.qa@schul-cloud.org  | Schulcloud1qa! | Englisch | DASHBOARD,COURSES,TEAMS,ALL TASKS,MY FILES,NEWS,CALENDAR,LEARNING STORE,ADD-ONS,MANAGEMENT,HELP SECTION                    |
            | teacher  | dmitri.teacher.qa@schul-cloud.org | Schulcloud1qa! | Englisch | DASHBOARD,COURSES,TEAMS,CURRENT TASKS,ALL TASKS,MY FILES,NEWS,CALENDAR,LEARNING STORE,ADD-ONS,MANAGEMENT,HELP SECTION                    |
            | student  | ole.bart.qa@schul-cloud.org       | Schulcloud1qa! | Englisch | DASHBOARD,COURSES,TEAMS,OPEN TASKS,ALL TASKS,MY FILES,NEWS,CALENDAR,LEARNING STORE,ADD-ONS,HELP SECTION                               |
            | admin    | olivier.admin.qa@schul-cloud.org  | Schulcloud1qa! | Spanisch | PANEL,CURSOS,EQUIPOS,TODAS TAREAS,MIS ARCHIVOS,NOTICIAS,CALENDARIO,LERN-STORE,COMPLEMENTOS,ADMINISTRACIÓN,SECCIÓN DE AYUDA |
            | teacher  | dmitri.teacher.qa@schul-cloud.org | Schulcloud1qa! | Spanisch | PANEL,CURSOS,EQUIPOS,TODAS TAREAS,MIS ARCHIVOS,NOTICIAS,CALENDARIO,LERN-STORE,COMPLEMENTOS,ADMINISTRACIÓN,SECCIÓN DE AYUDA |
            | student  | ole.bart.qa@schul-cloud.org       | Schulcloud1qa! | Spanisch | PANEL,CURSOS,EQUIPOS,TAREAS ABIERTAS,TODAS TAREAS,MIS ARCHIVOS,NOTICIAS,CALENDARIO,LERN-STORE,COMPLEMENTOS,SECCIÓN DE AYUDA                |
