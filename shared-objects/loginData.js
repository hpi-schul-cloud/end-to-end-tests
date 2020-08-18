const { CLIENT } = require("./servers");

module.exports = {
  url: `${CLIENT.URL}`,
  
  urlAdministration: `${CLIENT.URL}/administration`,



  elem: {
    
    

    resultInitials: '.avatar-circle .initials',
    icon: 'div[data-testid="icon-clickable"]',
    settings: 'a[data-testid="settings"]',
    logout: 'a[data-testid="logout"]',
    // Einwilligungserklärung:
   
    //Login Credentials
    dashboardTitle: 'Übersicht',
    dashboardHeader: '#titlebar h1#page-title',
    fullSchoolName: 'Paul-Gerhardt-Gymnasium',
    schoolName: '.nav-item.school-data',

    //Login Sidebar
    loginTabs: 'ul.sidebar-list[title]',
    // course_tabs:
    topics: 'button[data-testid="topics"]',
    tasks_tab: 'button[data-testid="hometasks"]',
    tools: 'button[data-testid="tools"]',
    groups: 'button[data-testid="groups"]',
    // news:
   
    // new password
    iconClickable: '[data-testid="initials"]',
    
  
    loginNotification: 'div[data-testid="notification"]',
    

  }
};
