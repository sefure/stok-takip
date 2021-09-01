import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'stockTransactions.list',
  validate: function () { },
  run: function (data) {
    this.unblock();

    const stockTransactions = StockTransactions.find({ stockCardId: data.stockCardId }).fetch();
    stockTransactions.map(stockTransaction => {
      stockTransaction.stockCard = StockCards.findOne({_id: stockTransaction.stockCardId})
      return stockTransaction;
    })
    return stockTransactions;
  }
});