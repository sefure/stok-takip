import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'units.create',
  validate: new SimpleSchema({
    unit: UnitSchema
  }).validator(),
  run: function (data) {
    this.unblock();

    return Units.insert(data.unit);
  }
});