import React, { Component } from 'react';
import { Checkbox, Input, Container, Button, Form, Select } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { shippingOptions, stateOptions, countryOptions } from '../utils';

const Shipping = () => {

  return (
    <Form>
      <Form.Field>
        <label> Address </label>
        <Input placeholder='123 Abc St.' />
      </Form.Field>
      <Form.Field>
        <label> City</label>
        <Input placeholder='Your City' />
      </Form.Field>
      <Form.Field>
        <label> State</label>
        <Select placeholder='Select your State' options={stateOptions} />
      </Form.Field>
      <Form.Field>
        <Select placeholder='Select your country' options={countryOptions} />
      </Form.Field>
      <Form.Field>
        <Checkbox label='I agree to pay for this stuff' />
      </Form.Field>
      <Select placeholder='Shipping Options' options={shippingOptions} />
      <Button type='submit'>Submit</Button>
    </Form>
  );
};

class OrderInfo extends Component {

  render(){
    return (
      <Container>
        <Shipping />
      </Container>
    );
  }
}

const mapState = () => {
  return {
  };
};

const mapDispatch = () => {
  return {
    loadCart: () => {

    },
    handleChange: () => {

    }
  };
};

const OrderInfoContainer = connect(mapState, mapDispatch)(OrderInfo);

export default OrderInfoContainer;
