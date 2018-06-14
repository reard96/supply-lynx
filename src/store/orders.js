const GET_ORDERS = 'GET_ORDERS';
const ADD_ORDER = 'ADD_ORDER';
const EDIT_ORDER = 'EDIT_ORDER';

const getOrders = orders => ({ type: GET_ORDERS, orders });
const addOrder = order => ({ type: ADD_ORDER, order });
const editOrder = order => ({ type: EDIT_ORDER, order });

export function fetchOrders(contract) {
  return function thunk(dispatch) {
    contract.getOrdersCount().then(async (data) => {
      const orders = await Promise.all(Array(parseInt(data.toNumber()))
        .fill()
        .map(async (element, index) => {
          const order = await contract.orders(index);
          return {
            id: index,
            productId: order[1].toNumber(),
            quantity: order[2].toNumber(),
            price: order[3].toNumber(),
            unit: order[4],
            // category
            status: order[6],
            buyer: order[7],
            seller: order[8],
          };
        }));
      return dispatch(getOrders(orders));
    });
  };
}

export function postOrder(order) {
  return function thunk(dispatch) {
    return dispatch(addOrder(order));
  };
}

export function updateOrder(order) {
  return function thunk(dispatch) {
    return dispatch(editOrder(order));
  };
}

export default function reducer(orders = [], action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders;
    case ADD_ORDER:
      return [...orders, action.order];
    case EDIT_ORDER:
      return orders.map(order => (order.id === action.order.id ? action.order : order));
    default:
      return orders;
  }
}
