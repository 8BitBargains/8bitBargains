import axios from 'axios';
const _ = require('lodash');

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART';
const ADD_GAME = 'ADD_GAME';
const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
const REMOVE_GAME = 'REMOVE_GAME';
const UPDATE_ADDRESS = 'UPDATE_ADDRESS';

/**
 * ACTION CREATORS
 */
const getCart = cart => ({ type: GET_CART, cart });
const addGame = game => ({ type: ADD_GAME, game });
const updateQuantity = updatedCart => ({ type: UPDATE_QUANTITY, updatedCart });
const removeGame = updatedCart => ({ type: REMOVE_GAME, updatedCart });
const updateAddressAction = updatedCart => ({ type: UPDATE_ADDRESS, updatedCart });

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
          games: res.data.games.map( game => {
            return {
              game: _.omit(game, 'game_order'),
              quantity: game.game_order.quantity
            }
          })
        }
        dispatch(getCart(cart))
      })
      .catch(err => console.log(err))
  );

export const addToCart = (product, history) =>
  // add games to cart on back end
  dispatch => (
    axios.post(`/api/orders/cart`, product)
    .then(res => {
      const game = {
        game: res.data,
        quantity: 1
      }
      dispatch(addGame(game));
      history.push('/cart');
    })
    .catch(err => console.log(err))
  );

export const updateCart = (orderId, game, newQuantity) =>
  // update the quantity of a game in the cart
  dispatch => (
    axios.put(`/api/orders/cart/${orderId}`, {...game, newQuantity: newQuantity})
      .then(res => {
        console.log(res.data)
        dispatch(updateQuantity(res.data));
      })
      .catch(err => console.log(err))
  );

export const updateAddress = address =>
  // update the address of the cart
  dispatch => (
    axios.put('/api/orders/cart/address', address)
      .then(res => {
        dispatch(updateAddressAction(res.data));
      })
      .catch(err => console.log(err))
  );

export const removeFromCart = (game) =>
  // remove a game from the cart
  dispatch => (
    axios.delete('/api/orders/cart/' + game.id + '/' + game.game_order.orderId)
    .then(res => {
      dispatch(removeGame(res.data));
    })
    .catch(err => console.log(err))
  );

/**
 * REDUCER
 */
export default function (state = {id: null, games: [], address: ''}, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case ADD_GAME:
      return Object.assign({}, state, { games: [...state.games, action.game]});
    case UPDATE_QUANTITY:
      return action.updatedCart;
    case REMOVE_GAME:
      return action.updatedCart;
    case UPDATE_ADDRESS:
      return action.updatedCart;
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
