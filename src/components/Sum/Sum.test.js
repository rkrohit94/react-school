import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import Sum from './Sum'

describe('Sum', () => {
  it('Should render with out error', () => {
    const wrapper = shallow(<Sum />)
    expect(wrapper).to.be.ok;
  })
  it('Should find component using its className', () => {
    const wrapper = shallow(<Sum />)
    console.log('lenght:',wrapper.find(".sum").length);
    expect(wrapper.find(".sum").length).to.equal(1);
  })
  it('Should get the text from its component', () => {
    const wrapper = shallow(<Sum />)
    expect(wrapper.text()).to.include('Sum');
  })
  // it('Should get the html from its component', () => {
  //   const wrapper = shallow(<Sum />)
  //   expect(wrapper.html()).to.equal('<div class="sum"><h1>Sum</h1><input type="number" class="a"/><button>+</button><input type="number" class="b"/><h2><span></span></h2></div>' to equal '<div class="sum"><h1>Sum</h1><input type="number" class="a"/><button>+</button><input type="number" class="b"/><span></span></div>');
  // })
  it('Should call add function when + button is clicked', () => {
    const wrapper = mount(<Sum />)
    const instance = wrapper.instance()
    const add = sinon.stub(instance,'add',()=>0);
    instance.forceUpdate();
    wrapper.update();
    wrapper.find('button').simulate('click');
    expect(add.callCount).to.equal(1);
  })
  it('Should call add function when + button is clicked', () => {
    const wrapper = mount(<Sum />)
    wrapper.find('input.a').get(0).value = 3
    wrapper.find('input.b').get(0).value = 5
    wrapper.find('button').simulate('click');
    expect(wrapper.state('sum')).to.equal(8);
    expect(wrapper.text()).to.equal('Sum+8')
  })
})
