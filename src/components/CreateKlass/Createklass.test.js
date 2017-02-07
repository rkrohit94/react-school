import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import nock from 'nock';
import axios from 'axios'
import httpAdapter from 'axios/lib/adapters/http'

import CreateKlass from './CreateKlass';
axios.defaults.adapter = httpAdapter;

describe('List', () => {
  beforeEach(() => {
    nock.disableNetConnect();
  });

  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  })
  it('should render without error', () => {
    const wrapper = shallow(<CreateKlass />);
    expect(wrapper).to.be.ok;
  });

  it('should find component using its class name', () => {
    const wrapper = shallow(<CreateKlass />);
    expect(wrapper.find(".create-klass").length).to.equal(1);
  });

  it('should call prevent default when button is clicked', () => {
    const stub = sinon.stub()
    const wrapper = mount(<CreateKlass/>);
    wrapper.find('button').simulate('click',{preventDefault:stub});
    expect(stub.callCount).to.equal(1);
  });

  it('should show error message when name is null', () =>{
    const wrapper = mount(<CreateKlass />);
    wrapper.find('button').simulate('click');
    expect(wrapper.state('error')).to.equal('Name too short');
  });
  it('should show error message when semester  is null', () =>{
    const wrapper = mount(<CreateKlass />);
    wrapper.find('#klassName').get(0).value = 'class1';
    wrapper.find('button').simulate('click');
    expect(wrapper.state('error')).to.equal('date invalid');
  });

  it('should show error message when credits is less than equalto 0', () =>{
    const wrapper = mount(<CreateKlass />);
    wrapper.find('#klassName').get(0).value = 'class1';
    wrapper.find('#semester').get(0).value = '2015-05-16';
    wrapper.find('button').simulate('click');
    expect(wrapper.state('error')).to.equal('credits invalid');
  });

  it('should show error message when department not selected', () =>{
    const wrapper = mount(<CreateKlass />);
    wrapper.find('#klassName').get(0).value = 'class1';
    wrapper.find('#semester').get(0).value = '2015-05-16';
    wrapper.find('#credits').get(0).value = 2;
    wrapper.find('button').simulate('click');
    expect(wrapper.state('error')).to.equal('department not selected');
  });
  it('should show error message when fees is invalid', () =>{
    const wrapper = mount(<CreateKlass />);
    wrapper.find('#klassName').get(0).value = 'class1';
    wrapper.find('#semester').get(0).value = '2015-05-16';
    wrapper.find('#credits').get(0).value = 2;
    wrapper.find('#department').get(0).value = "SCIENCE";
    wrapper.find('button').simulate('click');
    expect(wrapper.state('error')).to.equal('fee too less');
  });

  it('should show not error message when form data is good', () =>{
    const wrapper = mount(<CreateKlass />);
    wrapper.find('#klassName').get(0).value = 'class1';
    wrapper.find('#semester').get(0).value = '2015-05-16';
    wrapper.find('#credits').get(0).value = 2;
    wrapper.find('#department').get(0).value = "SCIENCE";
    wrapper.find('#fee').get(0).value = 555.3;
    wrapper.find('button').simulate('click');
    expect(wrapper.state('error')).to.equal(null);
  });

  it('should create a Klass', (done) =>{
    nock('http://fakehost.com')
    .post('/klasses',{
          "department":"ENGINEERING",
          "fee":550
        })
    .reply(200,{
          "id": 4,
          "version": 0,
          "name": "compozed",
          "semester": 1483228800000,
          "credits": 3,
          "department": "ENGINEERING",
          "fee": 550,
          "created": 1486452308423,
          "modified": 1486452308423,
          "teacher": null
        })
        .log((data) => console.log("data",data));

    const stub = sinon.stub();

    const wrapper = mount(<CreateKlass host="http://fakehost.com" created={stub} />);
    wrapper.find('#klassName').get(0).value = 'compozed';
    wrapper.find('#semester').get(0).value = '2017-01-01';
    wrapper.find('#credits').get(0).value = 3;
    wrapper.find('#department').get(0).value = "ENGINEERING";
    wrapper.find('#fee').get(0).value = 550;
    wrapper.find('button').simulate('click');
    setTimeout(() => {
      try{
        expect(stub.callCount).to.equal(1);
        expect(stub.getCall(0).args[0]).to.deep.equal({
              "id": 4,
              "version": 0,
              "name": "compozed",
              "semester": 1483228800000,
              "credits": 3,
              "department": "ENGINEERING",
              "fee": 550,
              "created": 1486452308423,
              "modified": 1486452308423,
              "teacher": null
            });
        done();
      }
      catch(e){
        done.fail(e)
      }

    },1000);
  });

  it('should explode server', (done) =>{
    nock('http://fakehost.com')
    .post('/klasses',{
          "name":"compozed",
          "semester":"2017-01-01",
          "credits":3,
          "department":"SCIENCE",
          "fee":550
        })
    .replyWithError("server exploded");

    const stub = sinon.stub();

    const wrapper = mount(<CreateKlass host="http://fakehost.com" created={stub} />);
    wrapper.find('#klassName').get(0).value = 'compozed';
    wrapper.find('#semester').get(0).value = '2017-01-01';
    wrapper.find('#credits').get(0).value = 3;
    wrapper.find('#department').get(0).value = "SCIENCE";
    wrapper.find('#fee').get(0).value = 550;
    wrapper.find('button').simulate('click');
    setTimeout(() => {
      try{
        expect(stub.callCount).to.equal(0);
        expect(wrapper.state('error')).to.equal("server exploded")
        done();
      }
      catch(e){
        done.fail(e)
      }

    },1000);
  });
})
