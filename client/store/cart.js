import axios from 'axios';
const _ = require('lodash');

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART';

const ADD_CART_PRODUCT = 'ADD_CART_PRODUCT';
const UPDATE_PRODUCT_QUANTITY = 'UPDATE_PRODUCT_QUANTITY';
const REMOVE_CART_PRODUCT = 'REMOVE_CART_PRODUCT';

const UPDATE_CART_ADDRESS = 'UPDATE_CART_ADDRESS';

/**
 * ACTION CREATORS
 */
const getCart = cart => ({ type: GET_CART, cart });

const addCartProduct = cartProduct => ({ type: ADD_CART_PRODUCT, cartProduct });
const updateProductQuantity = cartProduct => ({ type: UPDATE_PRODUCT_QUANTITY, cartProduct });
const removeCartProduct = removedProductId => ({ type: REMOVE_CART_PRODUCT, removedProductId });

const updateCartAddress = address => ({ type: UPDATE_CART_ADDRESS, address });

/**
 * THUNK CREATORS
 */
export const fetchCart = () =>
  // retrieve the cart from the back end
  dispatch => (
    axios.get('/api/orders/cart')
      .then(res => {
        const cart = {
          id: res.data.id,
          address: res.data.address,
          games: res.data.games.map(game => {
            return {
              game: _.omit(game, 'game_order'),
              quantity: game.game_order.quantity
            };
          })
        };
        dispatch(getCart(cart))
      })
      .catch(err => console.log(err))
  );

export const addToCart = (product, history) =>
  // add games to cart on back end
  dispatch => (
    axios.post(`/api/orders/cart`, product)
      .then(res => {
        const cartProduct = {
          game: res.data,
          quantity: 1
        };
        dispatch(addCartProduct(cartProduct));
        history.push('/cart');
      })
      .catch(err => console.log(err))
  );

export const updateCart = (orderId, productId, quantity) =>
  // update the quantity of a game in the cart
  dispatch => {
    return (
      axios.put(`/api/orders/cart/${orderId}`, { productId, quantity })
        .then(res => {
          const cartProduct = {
            game: res.data,
            quantity
          };
          dispatch(updateProductQuantity(cartProduct));
        })
        .catch(err => console.log(err))
    );
  };

export const removeFromCart = (orderId, productId) =>
  // remove a game from the cart
  dispatch => (
    axios.put(`/api/orders/cart/${orderId}`, { productId, quantity: 0 })
      .then(res => {
        console.log(res.data);
        const removedProductId = res.data.productId;
        dispatch(removeCartProduct(removedProductId));
      })
      .catch(err => console.log(err))
  );

export const updateAddress = address =>
  // update the address of the cart
  dispatch => (
    axios.put('/api/orders/cart/address', address)
      .then(res => {
        dispatch(updateCartAddress(res.data));
      })
      .catch(err => console.log(err))
  );


/**
 * REDUCER
 */
export default function (state = { id: null, games: [], address: '' }, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case ADD_CART_PRODUCT:
      return Object.assign({}, state, { games: [...state.games, action.cartProduct] });
    case UPDATE_PRODUCT_QUANTITY:
      return Object.assign({}, state, {
        games: [...state.games.filter(cartProduct => cartProduct.game.id !== action.cartProduct.game.id), action.cartProduct]
      });
    case REMOVE_CART_PRODUCT:
      return Object.assign({}, state, {
        games: [...state.games.filter(cartProduct => cartProduct.game.id !== action.removedProductId)]
      });
    case UPDATE_CART_ADDRESS:
      return Object.assign({}, state, { address: action.address });
    default:
      return state;
  }
}


/*
BELOW IS THE REDUCER FOR SENIOR ENRICHMENT THAT FOLLOWS THE SAME PATTERN
WE'RE LOOKING FOR.

ACTION CREATORS

export function getStudents(students){
  const action = { type: GET_STUDENTS, students};
  return action;
};

export function addStudent(student){
  const action = { type: ADD_STUDENT, student};
  return action;
};

export function removeStudent(studentId){
  const action = { type: REMOVE_STUDENT, studentId};
  return action;
};

export function modifyStudent(student){
  const action = { type: MODIFY_STUDENT, student };
  return action;
};


THUNKS

export function fetchStudents(){
  return function thunk(dispatch){
      axios.get('/api/students')
      .then(res => {
        return res.data
      })
      .then(students => {
        const action = getStudents(students);
        dispatch(action);
      })
      .catch(err => {
        console.error(err)
      });
  };
};

export function putStudent (student, history) {
  return function thunk (dispatch) {
    return axios.put(`/api/students/${student.studentId}`, student)
      .then(res => res.data)
      .then(updatedStudent => {
        dispatch(modifyStudent(updatedStudent));
        history.push(`/students/${updatedStudent.id}`);
      })
      .catch(err => {
        console.error(err);
      });
  };
}

export function postStudent (student, history) {

  return function thunk (dispatch) {
    return axios.post('/api/students', student)
      .then(res => res.data)
      .then(newStudent => {
        dispatch(addStudent(newStudent));
        history.push(`/students/${newStudent.id}`);
      })
      .catch(err => {
        console.error(err);
      });
  };
}

export function deleteStudent (studentId, history) {
  return function thunk (dispatch) {
    return axios.delete(`/api/students/${studentId}`)
    .then(res => res.data)
    .then((studentId)=> {
      history.push('/students')
      dispatch(removeStudent(Number(studentId)))
    })
    .catch(err => {
      console.error(err);
    });
  };
}


const initialState= {
  students: []
}

export default function reducer (state = initialState, action) {

  switch (action.type) {

    case GET_STUDENTS:
      const allStudents = [...state.students].concat(action.students)
      return Object.assign({}, state, {students: allStudents});

    case ADD_STUDENT:
      const addStudents = [...state.students, action.student];
      return Object.assign({}, state, {students: addStudents})

    case REMOVE_STUDENT:
      const newStudents = state.students.filter(student => student.id !==action.studentId)
      return Object.assign({}, state, {students: newStudents})

    case MODIFY_STUDENT:
      const modifiedStudents = state.students.map(student => {
        if(student.id === action.student.id){
          return action.student;
        } else {
          return student
        }
      })
      return Object.assign({}, state, {students: modifiedStudents});

    default:
      return state;
  }

}

*/
