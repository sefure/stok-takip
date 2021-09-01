import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'products.list',
  validate: function () { },
  run: function (data) {
    this.unblock();

    return Products.find({}).fetch();
  }
});