import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'stockCards.create',
  validate: new SimpleSchema({
    stockCard: StockCardSchema.omit('quantity')
  }).validator(),
  run: function (data) {
    this.unblock();
    data.stockCard.quantity = 0;
    return StockCards.insert(data.stockCard);
  }
});