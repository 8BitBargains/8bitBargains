import React, { Component } from 'react';
import { Checkbox, Input, Container, Button, Form, Select } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { shippingOptions, stateOptions, countryOptions } from '../utils';
import { submitInfo } from '../store';

const Shipping = (props) => {

  const { handleSubmit } = props.handleSubmit

  return (
    <Container>
      <Form id="order-info-form" >
        <div className="component" >
          <div className="section">
            <label>Shipping Address</label>
            <Form.Field required>
              <label>Name</label>
              <Input placeholder="Name" />
            </Form.Field>
            <Form.Field required>
              <label>Address</label>
              <Input placeholder="Address" />
            </Form.Field>
            <Form.Field required>
              <label>City</label>
              <Input placeholder="City" />
            </Form.Field>
            <Form.Field required>
              <label>State</label>
              <Select placeholder="State" options={stateOptions} />
            </Form.Field>
            <Form.Field required>
              <label>Country</label>
              <Select placeholder="Country" options={countryOptions} />
            </Form.Field>
            <Form.Field required>
              <label>Shipping Options</label>
              <Select placeholder="Shipping Options" options={shippingOptions} />
            </Form.Field>
          </div>
          <div className="section">
            <label>Billing Address</label>
            <Checkbox label="Same as Shipping Address" />
            <Form.Field>
              <label>Name</label>
              <Input placeholder="Name" />
            </Form.Field>
            <Form.Field>
              <label>Address</label>
              <Input placeholder="Address" />
            </Form.Field>
            <Form.Field>
              <label>City</label>
              <Input placeholder="City" />
            </Form.Field>
            <Form.Field>
              <label>State</label>
              <Select placeholder="State" options={stateOptions} />
            </Form.Field>
            <Form.Field>
              <label>Country</label>
              <Select placeholder="Country" options={countryOptions} />
            </Form.Field>
          </div>
        </div>
        <Form.Field>
          <Checkbox label="I agree to pay for this stuff" />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

class OrderInfo extends Component {

  render(){
    return (
      <Container>
        <Shipping handleChange={this.props.handleSubmit}/>
      </Container>
    );
  }
}

const mapState = () => {
  return {
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit: (formData) => {
      dispatch(submitInfo(formData));
    }
  };
};

const OrderInfoContainer = connect(mapState, mapDispatch)(OrderInfo);

export default OrderInfoContainer;