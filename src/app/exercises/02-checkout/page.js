import React from 'react';

import DATA from './data';
import StoreItem from './StoreItem';
import CheckoutFlow from './CheckoutFlow';
import './styles.css';
import CheckoutProvider from './CheckoutProvider';

function CheckoutExercise() {
  return (
    <>
      <h1>Neighborhood Shop</h1>

      <main>
        <CheckoutProvider>
          <div className='items'>
            {DATA.map((item) => (
              <StoreItem key={item.id} item={item} />
            ))}
          </div>

          <CheckoutFlow />
        </CheckoutProvider>
      </main>
    </>
  );
}

export default CheckoutExercise;
