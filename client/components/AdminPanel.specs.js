import { expect } from 'chai';
import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AdminPanel from 'AdminPanel';

const adapter = new Adapter();
enzyme.configure({adapter});

describe('The Admin Panel', () => {
  let adminPanel;

  beforeEach(() => {
    adminPanel = shallow(<AdminPanel />);
  });

  it('Renders a thing', () => {
    expect(adminPanel.find('h1').text()).to.be.equal('Administrator Panel')
  })
});
