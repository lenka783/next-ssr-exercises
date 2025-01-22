import { produce } from 'immer';

const ITEMS_LOCAL_STORAGE_ID = 'checkout-items';

function reducer(state, action) {
  return produce(state, (draftState) => {
    switch (action.type) {
      case 'get-stored-items': {
        const savedItems = window.localStorage.getItem(ITEMS_LOCAL_STORAGE_ID);
        draftState.items = savedItems ? JSON.parse(savedItems) : [];
        draftState.isLoading = false;
        return;
      }
      case 'store-items': {
        window.localStorage.setItem(
          ITEMS_LOCAL_STORAGE_ID,
          JSON.stringify(draftState.items)
        );
        return;
      }
      case 'add-item': {
        console.log({ state, draftState });
        const itemIndex = state.items.findIndex(
          (item) => item.id === action.item.id
        );

        if (itemIndex !== -1) {
          draftState.items[itemIndex].quantity += 1;
          return;
        }

        draftState.items.push({
          ...action.item,
          quantity: 1,
        });
        return;
      }

      case 'delete-item': {
        const itemIndex = state.items.findIndex(
          (item) => item.id === action.item.id
        );

        draftState.items.splice(itemIndex, 1);
        return;
      }
    }
  });
}

export default reducer;
