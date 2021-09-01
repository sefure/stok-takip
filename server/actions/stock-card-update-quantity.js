ActionStockCardUpdateQuantity = (_id, quantity, type) => {

  let cond = type == 'delete' ? -1 : 1;
  // let cond = 1;
  // switch (type) {
  //   case 'create':
  //     cond = 1;
  //     break;
  //   case 'delete':
  //     cond = -1;
  //     break;
  //   case 'update':
  //     cond = 1;
  //     break;
  // }

  StockCards.update({ _id: _id }, {
    $inc: {
      quantity: cond * quantity,
    }
  });
}