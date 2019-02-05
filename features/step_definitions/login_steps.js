var webdriver = require('selenium-webdriver');
var {Given, When, Then} = require('cucumber');
var assert = require('assert');
var driver = new webdriver.Builder().forBrowser('chrome').build();

//const chrome = require('selenium-webdriver/chrome');
//const {Builder, By, Key, until} = require('selenium-webdriver');

Given('user navigates to {string}', function (string) {
    return driver.get(string);
});

When('user logs in using Username {string} and Password {string}', function (string, string2) { 
    driver.sleep(3000);

    var usernameElement = driver.findElement(webdriver.By.xpath("/html/body[@class='window-inline']/div[@class='container']/div[@class='row']/aside[@class='col-md-4']/div[@class='hidden-sm-down']/section[@id='loginarea'][2]/div[@class='card-block']/div[@class='card-text form-wrapper']/form[@class='login-form']/div[@class='form-group'][1]/input[@class='form-control form-control-lg'][1]"));
    usernameElement.sendKeys(string);

    var passwordElement = driver.findElement(webdriver.By.xpath("/html/body[@class='window-inline']/div[@class='container']/div[@class='row']/aside[@class='col-md-4']/div[@class='hidden-sm-down']/section[@id='loginarea'][2]/div[@class='card-block']/div[@class='card-text form-wrapper']/form[@class='login-form']/div[@class='form-group'][1]/input[@class='form-control form-control-lg'][2]"));
    passwordElement.sendKeys(string2);

    var loginButton = driver.findElement(webdriver.By.xpath("/html/body[@class='window-inline']/div[@class='container']/div[@class='row']/aside[@class='col-md-4']/div[@class='hidden-sm-down']/section[@id='loginarea'][2]/div[@class='card-block']/div[@class='card-text form-wrapper']/form[@class='login-form']/div[@class='form-group'][2]/input[@class='btn btn-block btn-primary btn-login']"));
    return loginButton.click();
});

Then('login should be successful', function () {
    driver.sleep(3000);

    //check if school-data in top-right corner is available
    return driver.findElement(webdriver.By.xpath("/html/body[@class='loaded']/section[@class='content-wrapper']/div[@class='content-min-height']/nav[@class='topbar navbar hide-inline']/ul[@class='nav navbar-nav float-xs-none dropdowns']/li[@class='nav-item school-data hidden-sm-down']"));;
});

