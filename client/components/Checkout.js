import React, { Component } from 'react';
import { Checkbox, Input, Container, Button, Form, Select } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { shippingOptions, stateOptions, countryOptions } from '../utils';
import { submitOrder } from '../store';
import CheckoutButton from './stripe/Checkout';

const initialState = {
  name: '',
  address: '',
  city: '',
  state: '',
  country: '',
  shipping: '',
};
class Checkout extends Component {
  constructor(props){
    super(props);
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (evt, value) {
    // updates local state only based on the change of the form inputs
    let newState = {};
    let key;

    if (typeof value === 'string'){
      // hack to get around the weird way react semantic ui handles select elements
      key = evt;
    } else {
      key = value.name;
      value = value.value;
    }
    newState[key] = value;
    this.setState(newState);
  }

  handleSubmit (formData) {
    // takes the submit information from the form and passes it onto the container
    const { name, address, city, state, country } = formData;
    const shippingAddress = `${name},${address},${city},${state},${country}`;
    // if implementing shipping details, add it here
    this.setState(initialState);
    this.props.handleSubmit(shippingAddress);
  }
  render(){
    const { handleSubmit, handleChange } = this;
    const { name, address, city, state, country, shipping } = this.state;

    return (
      <Container>
        <Form id="order-info-form" onSubmit={ () => handleSubmit(this.state)} >
          <div className="component" >
            <div className="section">
              <label>Shipping Address</label>
              <Form.Field required>
                <label>Name</label>
                <Input name="name" value={name} onChange={handleChange} placeholder="Name" />
              </Form.Field>
              <Form.Field required>
                <label>Address</label>
                <Input name="address" value={address} onChange={handleChange} placeholder="Address" />
              </Form.Field>
              <Form.Field required>
                <label>City</label>
                <Input name="city" value={city} onChange={handleChange} placeholder="City" />
              </Form.Field>
              <Form.Field required>
                <label>State</label>
                <Select
                  name="state"
                  value={state}
                  onChange={(evt, { value }) => handleChange('state', value)}
                  placeholder="State"
                  options={stateOptions} />
              </Form.Field>
              <Form.Field required>
                <label>Country</label>
                <Select
                  name="country"
                  value={country}
                  onChange={(evt, { value }) => handleChange('country', value)}
                  placeholder="Country"
                  options={countryOptions} />
              </Form.Field>
              <Form.Field required>
                <label>Shipping Options</label>
                <Select
                  name="shipping"
                  value={shipping}
                  onChange={(evt, { value }) => handleChange('shipping', value)}
                  placeholder="Shipping Options"
                  options={shippingOptions} />
              </Form.Field>
            </div>
            <div className="section">
              <label>Billing Address</label>
              <Checkbox label="Same as Shipping Address" />
            </div>
          </div>
          <Form.Field>
            <Checkbox label="I agree to pay for this stuff" />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
          <CheckoutButton
            name={'Pay for Your Stuff, Please'}
            description={'Really...We Need Money'}
            amount={1}
            orderId={1}
            history={this.props.history}
          />
      </Container>
    );
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit: (formData) => {
      dispatch(submitOrder(formData, ownProps.history));
    }
  };
};

const CheckoutContainer = connect(null, mapDispatch)(Checkout);

export default CheckoutContainer;
