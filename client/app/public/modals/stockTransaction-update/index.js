import bootstrap from "bootstrap";
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.publicModalStockTransactionUpdate.onRendered(function () {
  const self = this;

  const modalElement = document.getElementById('brdPublicModalStockTransactionUpdateModal');
  this.modal = new bootstrap.Modal(modalElement);

  modalElement.addEventListener('hidden.bs.modal', function (event) {
    AppUtil.temp.set('stockTransaction', null);
  });

});

Template.publicModalStockTransactionUpdate.events({
  'submit form#brdPublicModalStockTransactionUpdateForm': function (event, template) {
    event.preventDefault();

    const stockTransaction = AppUtil.temp.get('stockTransaction');

    const stockCardId = FlowRouter.getParam('stockCardId');
    const quantity = event.target.quantity.value
    const type = event.target.type.value
    const price = event.target.price.value

    const obj = {
      _id: stockTransaction._id,
      stockTransaction: {
        stockCardId: stockCardId,
        quantity: parseInt(quantity),
        type: type,
        price: parseInt(price),
      },
    }

    console.log(obj);

    Meteor.call('stockTransactions.update', obj, function (error, result) {
      if (error) {
        console.log('error', error);
      }


      console.log(result);
      AppUtil.refreshTokens.set('stockTransactions', Random.id());
      event.target.reset();
      template.modal.hide();
    });
  }
});