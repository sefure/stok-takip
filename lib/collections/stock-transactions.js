import SimpleSchema from "simpl-schema";

StockTransactions = new Mongo.Collection("stockTransactions");

StockTransactionSchema = new SimpleSchema({
  stockCardId: SimpleSchema.RegEx.Id,
  quantity: Number,
  type: String,
  price: Number,

  payload: {
    type: Object,
    blackbox: true,
    optional: true,
  },
});

StockTransactions.attachSchema(StockTransactionSchema);