import React, { Component } from 'react';
import { Input, Container, Form, Select } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { shippingOptions, stateOptions, countryOptions, subtotal } from '../utils';
import CheckoutButton from './stripe/Checkout';


const initialState = {
  name: '',
  address: '',
  city: '',
  state: '',
  country: '',
  shipping: ''
};

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt, value) {
    // updates local state only based on the change of the form inputs
    let newState = {};
    let key;

    // hack to get around the weird way react semantic ui handles select elements
    // select elements accept onChange events differently than input elements.
    // doing the following enables handleChange function to work for both
    // semantic ui select elements and semantic ui input elements.
    if (typeof value === 'string'){
      key = evt;
    } else {
      key = value.name;
      value = value.value;
    }
    newState[key] = value;
    this.setState(newState);
  }

  render(){
    const { handleChange } = this;
    const { name, address, city, state, country, shipping } = this.state;
    const { history, orderId, cartProducts } = this.props;
    const shippingAddress = `${name},${address},${city},${state},${country}`;

    return (
      <Container>
        <Form id="order-info-form" >
          <div className="component" >
            <div className="section">
              <label>Shipping Address</label>
              <Form.Field required>
                <label>Name</label>
                <Input
                  name="name"
                  value={name}
                  onChange={handleChange}
                  placeholder="Name"
                />
              </Form.Field>
              <Form.Field required>
                <label>Address</label>
                <Input
                  name="address"
                  value={address}
                  onChange={handleChange}
                  placeholder="Address"
                />
              </Form.Field>
              <Form.Field required>
                <label>City</label>
                <Input
                  name="city"
                  value={city}
                  onChange={handleChange}
                  placeholder="City"
                />
              </Form.Field>
              <Form.Field required>
                <label>State</label>
                <Select
                  name="state"
                  value={state}
                  onChange={(evt, { value }) => handleChange('state', value)}
                  placeholder="State"
                  options={stateOptions}
                />
              </Form.Field>
              <Form.Field required>
                <label>Country</label>
                <Select
                  name="country"
                  value={country}
                  onChange={(evt, { value }) => handleChange('country', value)}
                  placeholder="Country"
                  options={countryOptions}
                />
              </Form.Field>
              <Form.Field required>
                <label>Shipping Options</label>
                <Select
                  name="shipping"
                  value={shipping}
                  onChange={(evt, { value }) => handleChange('shipping', value)}
                  placeholder="Shipping Options"
                  options={shippingOptions}
                />
              </Form.Field>
            </div>
          </div>

        </Form>
        <CheckoutButton
          name={'Pay for Your Stuff, Please'}
          description={'Really...We Need Money'}
          amount={subtotal(cartProducts) / 100}
          orderId={orderId}
          history={history}
          address={shippingAddress}
        />
      </Container>
    );
  }
}
const mapState = (state) => {
  return {
    cartProducts: state.cart.cartProducts,
    orderId: state.cart.id
  };
};

const CheckoutContainer = connect(mapState)(Checkout);

export default CheckoutContainer;
