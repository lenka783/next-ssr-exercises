'use client';
import React from 'react';

import reducer from './reducer';
import './styles.css';

const INITIAL_STATE = { items: [], isLoading: true };

const CheckoutContext = React.createContext();

export const useCheckoutContext = () => {
  const context = React.useContext(CheckoutContext);

  if (!context) {
    throw new Error(
      'Checkout context must be used inside CheckoutProvider tree'
    );
  }

  return context;
};

function CheckoutProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);
  const { items, isLoading } = state;

  React.useEffect(() => {
    dispatch({ type: 'get-stored-items' });
  }, []);

  React.useEffect(() => {
    dispatch({ type: 'store-items' });
  }, [items]);

  const handleAddToCart = (item) => {
    console.log({ items });
    dispatch({
      type: 'add-item',
      item,
    });
  };

  const handleDeleteItem = (item) =>
    dispatch({
      type: 'delete-item',
      item,
    });
  console.log({ items });

  return (
    <CheckoutContext.Provider
      value={{
        items,
        isLoading,
        handleAddToCart,
        handleDeleteItem,
        taxRate: 0.15,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export default CheckoutProvider;
