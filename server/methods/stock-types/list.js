import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'stockTypes.list',
  validate: function () { },
  run: function (data) {
    this.unblock();

    return StockTypes.find({}).fetch();
  }
});