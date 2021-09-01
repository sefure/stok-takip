import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'stockTransactions.update',
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
    stockTransaction: StockTransactionSchema
  }).validator(),
  run: function (data) {
    this.unblock();

    const _stockTransaction = StockTransactions.findOne({ _id: data._id });

    const resultQuantity = data.stockTransaction.quantity - _stockTransaction.quantity;

    StockTransactions.update({_id: data._id },{
      $set : data.stockTransaction
    })

    ActionStockCardUpdateQuantity(_stockTransaction.stockCardId, resultQuantity, 'update');
  }
});

