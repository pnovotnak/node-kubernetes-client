/**
 * test kubernetes minions
 * @author huangqg
 * @date 2015-03-18
 */

var should = require('should');
var assert = require('assert');
var Client = require('../../../kubernetes/api');
var fs = require('fs');

describe('Test k8s proxy API', function() {
  this.timeout(5000);
  var client;
  beforeEach(function() {
    client = new Client(require('./config.json').k8s);
  });

  it('should return the proxy Services list', function(done) {
    client.proxyServices.get('slave2', function (err, ServicesArr) {
      if (!err) {
        console.log('Services: ' + JSON.stringify(ServicesArr));
        // output results
        fs.writeFile("results/proxyServices.json", JSON.stringify(ServicesArr, null, 4));
        assert(ServicesArr instanceof Array);
        done();
      } else {
        console.log(err);
        assert(false);
      }
    });
  });
});