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
		# Then <userRole> should see that all menu items are visible: '<menuItems>'
		Examples:
			| userRole | username                          | password       | language  | menuItems                                                                                                                |
			| admin    | olivier.admin.qa@schul-cloud.org  | Schulcloud1qa! | English   | Dashbord,Courses,Teams,Files,News,Calendar,Learning Store,Add-ons,Management,Help Section,System                         |
			| teacher  | dmitri.teacher.qa@schul-cloud.org | Schulcloud1qa! | English   | Dashbord,Courses,Teams,Tasks,Files,News,Calendar,Learning Store,Add-ons,Management,Help Section,System                    |
			| student  | ole.bart.qa@schul-cloud.org       | Schulcloud1qa! | English   | Dashbord,Courses,Teams,Tasks,Files,News,Calendar,Learning Store,Add-ons,Help Section,System                                     |
			| admin    | olivier.admin.qa@schul-cloud.org  | Schulcloud1qa! | Spanish   | Panel,Cursos,Equipos,Archivos,Noticias,Calendario,Lern-Store,Complementos,Administración,Sección de ayuda,Sistema                |
			| teacher  | dmitri.teacher.qa@schul-cloud.org | Schulcloud1qa! | Spanish   | Panel,Cursos,Equipos,Tareas,Archivos,Noticias,Calendario,Lern-Store,Complementos,Administración,Sección de ayuda,Sistema         |
			| student  | ole.bart.qa@schul-cloud.org       | Schulcloud1qa! | Spanish   | Panel,Cursos,Equipos,Tareas,Archivos,Noticias,Calendario,Lern-Store,Complementos,Sección de ayuda,Sistema                        					|
			| admin    | olivier.admin.qa@schul-cloud.org  | Schulcloud1qa! | Ukrainian | Панель керування,Курси,Команди,Файли,Новини,Календар,Навчальний магазин,Доповнення,Управління,Довідковий розділ,Cистема         	|
			| teacher  | dmitri.teacher.qa@schul-cloud.org | Schulcloud1qa! | Ukrainian | Панель керування,Курси,Команди,Завдання,Файли,Новини,Календар,Навчальний магазин,Доповнення,Управління,Довідковий розділ,Cистема	|
			| student  | ole.bart.qa@schul-cloud.org       | Schulcloud1qa! | Ukrainian | Панель керування,Курси,Команди,Завдання,Файли,Новини,Календар,Навчальний магазин,Доповнення,Довідковий розділ,Cистема            	|