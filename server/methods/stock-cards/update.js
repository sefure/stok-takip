import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'stockCards.updateByQuantity',
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
    quantity: Number,
  }).validator(),
  run: function (data) {
    this.unblock();

  }
});