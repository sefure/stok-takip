import bootstrap from "bootstrap";
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';


Template.publicModalStockTransactionCreate.onCreated(function () {
  this.state = new ReactiveDict(null, {
    stockCards: [],

  });

});

Template.publicModalStockTransactionCreate.onRendered(function() {
  const self = this;

  const modalElement = document.getElementById('brdPublicModalStockTransactionCreateModal');
  this.modal = new bootstrap.Modal(modalElement);

  modalElement.addEventListener('hidden.bs.modal', function (event) {
  });

});

Template.publicModalStockTransactionCreate.events({
  'submit form#brdPublicModalStockTransactionCreateForm': function (event, template) {
    event.preventDefault();
    

    const stockCardId = FlowRouter.getParam('stockCardId');
    const quantity = event.target.quantity.value
    const type = event.target.type.value
    const price = event.target.price.value

    const obj = {
      stockTransaction: {
        stockCardId: stockCardId,
        quantity: parseInt (quantity),
        type: type,
        price: parseInt (price),
      },  
    }

    console.log(obj);
    
    Meteor.call('stockTransactions.create', obj, function (error, result) {
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