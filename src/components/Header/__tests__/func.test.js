import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from '../app';

const testProps = {
  defaultAccoutName: 'ラクテンタロー',
  errorNote: '',
  inputName: 'accountNumber',
  isMobile: false,
  isValid: true,
  labelText: '口座名義',
  notes: '※お申込者ご本人名義をご入力ください',
  placeholder: '例) ラクテンタロウ（セイメイ）',
  updateAccountNumber: () => {},
  name: 'updateAccountNumber',
};

const shallowSetUp = props => shallow(<App {...props} />);
const mountSetUp = props => mount(<App {...props} />, { disableLifecycleMethods: true });

describe('App', () => {
  let shallowComponent;
  let mountComponent;
  beforeEach(() => {
    shallowComponent = additionalProps => shallowSetUp({ ...testProps, ...additionalProps });
    mountComponent = additionalProps => mountSetUp({ ...testProps, ...additionalProps });
  });

  it('snapshot', () => {
    const elem = shallowComponent();
    expect(toJson(elem)).toMatchSnapshot();
  });
});
