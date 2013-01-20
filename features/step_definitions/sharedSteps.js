var myStepDefinitionsWrapper = function () {
  this.World = require("../support/world.js").World; // overwrite default World constructor

  this.Given(/^a phantomjs browser engine connected via phantom-proxy$/, function(callback) {
    if(this.phantom===undefined) {
      callback.fail('No phantom-proxy bridge present');
    } else {
      callback();
    }
  });

  this.When("a web page is loaded", function(callback) {
    var results = {'isPageLoaded': false};
    this.results = results;
    this.phantom.create({}, function(proxy) {
      var page = proxy.page;
      page.open('http://www.w3.org', function() {
        page.waitForSelector('body', function() {
          results['isPageLoaded'] = true;
          proxy.end();
          callback();
        });
      });
    });
  });

  this.Then("the page will finish rendering", function(callback) {
    if(this.results['isPageLoaded']) {
      callback();
    } else {
      callback.fail('Page did not render');
    }
  });
};

module.exports = myStepDefinitionsWrapper;

