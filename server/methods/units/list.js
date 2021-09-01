import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'units.list',
  validate: function () { },
  run: function (data) {
    this.unblock();

    return Units.find({}).fetch();
  }
});