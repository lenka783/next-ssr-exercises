'use client';
import React from 'react';

import DATA from './data';
import StoreItem from './StoreItem';
import CheckoutFlow from './CheckoutFlow';
import './styles.css';
import reducer from './reducer';

const LOCAL_STORAGE_ITEMS = 'checkout-items';

function CheckoutExercise() {
  const [items, dispatch] = React.useReducer(reducer, null);

  React.useEffect(() => {
    const savedItems = window.localStorage.getItem(LOCAL_STORAGE_ITEMS);

    dispatch({
      type: 'init-items',
      items: savedItems ? JSON.parse(savedItems) : [],
    });
  }, []);

  React.useEffect(() => {
    if (items !== null) {
      window.localStorage.setItem(LOCAL_STORAGE_ITEMS, JSON.stringify(items));
    }
  }, [items]);

  return (
    <>
      <h1>Neighborhood Shop</h1>

      <main>
        <div className='items'>
          {DATA.map((item) => (
            <StoreItem
              key={item.id}
              item={item}
              handleAddToCart={(item) => {
                dispatch({ type: 'add-item', item });
              }}
            />
          ))}
        </div>

        <CheckoutFlow
          items={items}
          taxRate={0.15}
          handleDeleteItem={(item) => {
            dispatch({ type: 'delete-item', item });
          }}
        />
      </main>
    </>
  );
}

export default CheckoutExercise;
