import SimpleSchema from "simpl-schema";

StockCards = new Mongo.Collection("stockCards");

StockCardSchema = new SimpleSchema({
  productId: SimpleSchema.RegEx.Id,
  unitId: SimpleSchema.RegEx.Id,
  stockTypeId: SimpleSchema.RegEx.Id,
  quantity: Number,

  description: {
    type: String,
    optional: true,
  },

  payload: {
    type: Object,
    blackbox: true,
    optional: true,
  },
});



StockCards.attachSchema(StockCardSchema);
