import { produce } from 'immer';

function reducer(items, action) {
  return produce(items, (draftItems) => {
    switch (action.type) {
      case 'init-items': {
        return action.items;
      }
      case 'add-item': {
        const itemIndex = items.findIndex((item) => item.id === action.item.id);

        if (itemIndex !== -1) {
          draftItems[itemIndex].quantity += 1;
          return;
        }

        draftItems.push({
          ...action.item,
          quantity: 1,
        });
        return;
      }

      case 'delete-item': {
        const itemIndex = items.findIndex((item) => item.id === action.item.id);

        draftItems.splice(itemIndex, 1);
        return;
      }
    }
  });
}

export default reducer;
