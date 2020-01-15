'use strict';

const loginData = require('../shared-objects/loginData');
const courseData = require('../shared-objects/courseData');
let before;


module.exports = {
  goToCourses: async function() {
    await helpers.loadPage(courseData.urlCourses, 20)
  },
  clickAddCourseButton: async function() {
    let selectorBtn = await driver.$('.btn.btn-primary.btn-add');
    await helpers.waitAndClick(selectorBtn);
  },
  

  
  }
  


