# insights-mailer
## Script to send out Insights dashboards as PDFs in emails

**Insights-mailer** is a node.js-based script that utilizes the selenium web driver. This script opens an Insights dashboard of your choosing, takes a screenshot, and uses nodemailer to then email the report to selected recipient(s).

**NOTE**: This will only work with accounts/users that DON'T have SSO enabled. This relies on the simple New Relic login page. You're welcome to enhance this to work with SSO.

### Setup

#### Prerequisites
* Linux or mac server
* Chrome (latest version)
* Node.JS (v4.2+)
  * run in terminal to identify installed version of node: `node -v`
  * new installs of node: https://nodejs.org/en/download/
* Node package manager ("npm")
  * run to upgrade: `sudo npm install npm -g`  

#### Setup steps
* Download the latest version of this script
  * https://github.com/mcough2/insights-mailer.git
* Open terminal window
* Unzip insights mailer ZIP and change name to NewRelicInsightsMailer
  * `unzip insights-mailer-master.zip`
  * `mv insights-mailer-master NewRelicInsightsMailer`
  * Optional: move NewRelicInsightsMailer to any location of your choosing
* Change to NewRelicInsightsMailer directory: `cd /<path_to_mailer>/ NewRelicInsightsMailer`
* Run `npm install` to install the requisite node packages
* Install selenium standalone server
  * Download latest jar from here:  http://www.seleniumhq.org/download/
  * Copy jar file to the NewRelicInsightsMailer directory
* Install chrome-driver
  * Download latest chrome driver here: https://sites.google.com/a/chromium.org/chromedriver/downloads
  * Ensure that chrome-driver matches version of Chrome installed
  * Copy and unzip chrome driver file to the NewRelicInsightsMailer directory

### Usage

Once above setup tasks are completed, here are the last few tasks that will need to be completed to run the script.

1. To start selenium server, you will need to run the following in a terminal window from within the NewRelicInsightsMailer directory:
`java -Dwebdriver.chrome.driver=chromedriver -jar selenium-server-standalone-<ver>.jar`
  * Where <ver> = version of selenium jar file downloaded
2. Ensure that selenium instance stays running
3. Execute the script using the following command:
  * `cd /<path_to_mailer/NewRelicInsightsMailer`
  * `node index.js`

### Optional steps

* Setup cron job to run on a schedule to meet your needs
* Depending on needs, schedule a job to delete or move image files on a scheduled basis
