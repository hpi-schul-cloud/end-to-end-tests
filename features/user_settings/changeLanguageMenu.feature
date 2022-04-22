@userSettings @language @e2eCore @stableTest @navi_user_settings
Feature: Test set for user settings

    Background: User opens Schul-cloud homepage Website
        Given user arrives on the Schul-Cloud homepage

    @changeLanguageMenu
    Scenario Outline: As a user, I want to be able to change the language
        Given <userRole> logs in with email '<username>' and password '<password>'
        And <userRole> login is successful
        And <userRole> goes to user menu
        And <userRole> changes language to '<language>'
        Then <userRole> should see that all menu items are visible: '<menuItems>'
Examples:
        | userRole  | username                          | password       | language  | menuItems                                                                                                                    |
        | admin     | olivier.admin.qa@schul-cloud.org  | Schulcloud1qa! | English   | DASHBOARD,COURSES,TEAMS,MY FILES,NEWS,CALENDAR,LEARNING STORE,ADD-ONS,MANAGEMENT,HELP SECTION                               |
        | teacher   | dmitri.teacher.qa@schul-cloud.org | Schulcloud1qa! | English   | DASHBOARD,COURSES,TEAMS,TASKS,MY FILES,NEWS,CALENDAR,LEARNING STORE,ADD-ONS,MANAGEMENT,HELP SECTION                         |
        | student   | ole.bart.qa@schul-cloud.org       | Schulcloud1qa! | English   | DASHBOARD,COURSES,TEAMS,TASKS,MY FILES,NEWS,CALENDAR,LEARNING STORE,ADD-ONS,HELP SECTION                                    |
        | admin     | olivier.admin.qa@schul-cloud.org  | Schulcloud1qa! | Spanish   | PANEL,CURSOS,EQUIPOS,MIS ARCHIVOS,NOTICIAS,CALENDARIO,LERN-STORE,COMPLEMENTOS,ADMINISTRACIÓN,SECCIÓN DE AYUDA               |
        | teacher   | dmitri.teacher.qa@schul-cloud.org | Schulcloud1qa! | Spanish   | PANEL,CURSOS,EQUIPOS,TAREAS,MIS ARCHIVOS,NOTICIAS,CALENDARIO,LERN-STORE,COMPLEMENTOS,ADMINISTRACIÓN,SECCIÓN DE AYUDA        |
        | student   | ole.bart.qa@schul-cloud.org       | Schulcloud1qa! | Spanish   | PANEL,CURSOS,EQUIPOS,TAREAS,MIS ARCHIVOS,NOTICIAS,CALENDARIO,LERN-STORE,COMPLEMENTOS,SECCIÓN DE AYUDA                       |
        | admin     | olivier.admin.qa@schul-cloud.org  | Schulcloud1qa! | Ukrainian | ПАНЕЛЬ КЕРУВАННЯ,КУРСИ,КОМАНДИ,МОЇ ФАЙЛИ,НОВИНИ,КАЛЕНДАР,НАВЧАЛЬНИЙ МАГАЗИН,ДОПОВНЕННЯ,КЕРУВАННЯ,ДОВІДКОВИЙ РОЗДІЛ          |
        | teacher   | dmitri.teacher.qa@schul-cloud.org | Schulcloud1qa! | Ukrainian | ПАНЕЛЬ КЕРУВАННЯ,КУРСИ,КОМАНДИ,ЗАВДАННЯ,МОЇ ФАЙЛИ,НОВИНИ,КАЛЕНДАР,НАВЧАЛЬНИЙ МАГАЗИН,ДОПОВНЕННЯ,КЕРУВАННЯ,ДОВІДКОВИЙ РОЗДІЛ |
        | student   | ole.bart.qa@schul-cloud.org       | Schulcloud1qa! | Ukrainian | ПАНЕЛЬ КЕРУВАННЯ,КУРСИ,КОМАНДИ,ЗАВДАННЯ,МОЇ ФАЙЛИ,НОВИНИ,КАЛЕНДАР,НАВЧАЛЬНИЙ МАГАЗИН,ДОПОВНЕННЯ,ДОВІДКОВИЙ РОЗДІЛ           |