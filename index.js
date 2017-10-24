var fs = require("fs"),

//*** Edit the section below ***
nrAcctNumber = 'NEW_RELIC_ACCOUNT_#',
nrDashNumber = 'DASHBOARD_#',
nrLogin = 'NEW_RELIC_LOGIN_ACCOUNT',
nrPass = 'NEW_RELIC_LOGIN_PASSWORD',

imgPath = '/PATH/TO/FILE', //path to image file, do not use / at end

emailRecips = 'EMAIL_ADDRESSES_SEPARATED_WITH_COMMAS',
emailSubject = 'SUBJECT_OF_EMAIL',
emailSender = 'SENDER_NAME <SENDER_EMAIL_ADDRESS>',
// Nodemailer settings
// For more information: https://github.com/andris9/nodemailer-smtp-transport
emailSettings = {
    service: 'Gmail',
    auth: {
        user: 'EMAIL_ADDRESS',
        pass: 'EMAIL_PASSWORD'
    }
};
//*** End of edits ***

insightsURL = 'https://insights.newrelic.com/accounts/' + nrAcctNumber + '/dashboards/' + nrDashNumber + '?kiosk=true',
nodemailer = require('nodemailer'),
inlineBase64 = require('nodemailer-plugin-inline-base64'),
webdriver = require("selenium-webdriver"),
date = new Date(),
year = date.getFullYear(),
month = date.getMonth() + 1,
day = date.getUTCDate(),
hour = date.getHours(),
minute = date.getMinutes(),
second = date.getSeconds(),
timestamp = year + '-' + month + '-' + day + '_' + hour + '.' + minute + '.' + second,
imgFile = timestamp + '_' + nrDashNumber + '.png';

//console.log(timestamp);

var transporter = nodemailer.createTransport(emailSettings);

var mailOptions = {
    from: emailSender,
    to: emailRecips,
    subject: emailSubject,
    html: '<a href="' + insightsURL + '"><b>Click here to visit dashboard in New Relic Insights!</b><br><br><img src="cid:insightsImage@newrelic.com"/></a>',
    attachments: [
        {
            path: imgPath + '/' + imgFile,
            cid: 'insightsImage@newrelic.com'
        }
    ]
};

function createDriver() {
    var driver = new webdriver.Builder().usingServer('http://localhost:4444/wd/hub').withCapabilities(webdriver.Capabilities.chrome()).build();
    driver.manage().timeouts().setScriptTimeout(10000);
    return driver;
}

function writeScreenshot(data, name) {
    name = name || imgFile;
    fs.writeFileSync(imgPath + '/' + name, data, 'base64');
};

var driver = createDriver();
var By = webdriver.By;

driver.get(insightsURL);
driver.findElement(By.id("login_email")).clear();
//*** Need to edit Insights login info ***
driver.findElement(By.id("login_email")).sendKeys(nrLogin);
driver.findElement(By.id("login_password")).clear();
driver.findElement(By.id("login_password")).sendKeys(nrPass);
//*** End of edits ***
driver.findElement(By.id("login_submit")).click();
driver.sleep(5000);
driver.takeScreenshot().then(function(data) {
    writeScreenshot(data);
});
driver.quit().then(function() {
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
});
