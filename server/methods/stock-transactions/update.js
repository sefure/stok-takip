import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'stockTransactions.updateByQuantity',
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
    quantity: Number,
  }).validator(),
  run: function (data) {
    this.unblock();

    ActionStockTransactionUpdateQuantity(data._id, data.quantity)
  }
});
ActionStockTransactionUpdateQuantity = (_id, quantity, type)=> {
  const cond = type == 'create' ? 1 : -1;
  StockTransactions.update( { _id: _id },{ 
    $inc: { 
      quantity: cond * quantity,
      
    }
  });
}

