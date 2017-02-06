import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import Box from './Box'

describe('Box', () => {
  it('Should render with out erroraaaaaabbbb', () => {
      console.error('BOX***********************************************************')
    const wrapper = shallow(<Box />)
    expect(wrapper).to.be.ok;
  })
  it('Should get the text from its component', () => {
      console.log('BOX***********************************************************')
    const wrapper = shallow(<Box text="thiru@hotmail.com" />)
    expect(wrapper.text()).to.include('thiru@hotmail.com');
  })
  it('Should get the css class from its component', () => {
    const wrapper = shallow(<Box css="selected" />)
    const html = wrapper.html()
    expect(html).to.equal('<div class="box"><div class="selected"></div></div>')
  })
  it('Should get primary key {id} from its component', () => {
    const wrapper = shallow(<Box id="3" />)
    const html = wrapper.html()
    expect(html).to.equal('<div class="box"><div data-id="3"></div></div>')
  })
  it('Should render out full component', () => {
    const wrapper = shallow(<Box css="empty" text ="thiru@hotmail.com" id="3" />)
    const html = wrapper.html()
    expect(html).to.equal('<div class="box"><div data-id="3" class="empty">thiru@hotmail.com</div></div>')
  })
  it('Should call the parents function when clicked', () => {
    const stub = sinon.stub();
    const wrapper = shallow(<Box click={stub} />)
    wrapper.find('.box > div').simulate('click');
    expect(stub.callCount).to.equal(1);
  })

})
