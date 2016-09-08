import React from 'react';
import { expect, assert } from 'chai';
import { Router } from 'react-router';

import { shallow, mount, render } from 'enzyme';

import LoginForm from 'components/organisms/LoginForm';
import InputField from 'components/atoms/InputField';
import SubmitButton from 'components/atoms/SubmitButton';

describe("Login page suite", function() {
  it("contains two inputs", function() {
    const wrapper = shallow(< LoginForm />);
    expect(wrapper.find(InputField)).to.have.length(2);
  });

  it("contains username and password fields", function() {
    const wrapper = shallow(< LoginForm />);
    const inputs = wrapper.find(InputField);

    inputs.forEach(function(input){
        expect(input.props().type).to.oneOf(['username', 'password']);
    });
  });

  it("contains a submit button", function() {
    expect(shallow(<LoginForm />).contains(<SubmitButton/>)).to.equal(true);
  });
});
