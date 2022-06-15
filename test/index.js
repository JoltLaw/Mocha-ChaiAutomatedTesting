var expect = require('chai').expect;
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var request = require('request');
chai.should();
chai.use(sinonChai);
var getUsers = require('../getUsers.js');
describe('GetUsers Tests', function() {
    var spy;

    beforeEach(function(){
        spy = sinon.spy();
        sinon.stub(request, 'get').callsFake(function(url, callback){
            callback({}, {body: '{"users":["user1", "user2"]}'})
        })
    })

    afterEach(function(){
        sinon.restore();
    })

    it('Calls the callback', function(){
        getUsers(spy)
        spy.should.be.calledOnce;
    })

    it('Calls the correct URL', function(){
        getUsers(spy)
        request.get.should.calledWith("https://www.mysite.com/api/users");
    })

    it('Returns correct data', function(){
        getUsers(spy);
        spy.should.calledWith({users: ['user1', 'user2']});
    })

});