export const subtotal = (cartProducts) => {
  let total = 0;
    cartProducts.forEach(product => {
    total += product.product.price * product.quantity;
  });
  return total;
};
