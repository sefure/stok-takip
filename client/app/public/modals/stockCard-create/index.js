import bootstrap from "bootstrap";

Template.publicModalStockCardCreate.onCreated(function () {
  this.state = new ReactiveDict(null, {
    products: [],
    units: [],
    stockTypes: [],
    
  });
  this.number = ReactiveVar(0);

});

Template.publicModalStockCardCreate.onRendered(function() {
  const self = this;

  const modalElement = document.getElementById('brdPublicModalStockCardCreateModal');
  this.modal = new bootstrap.Modal(modalElement);

  modalElement.addEventListener('hidden.bs.modal', function (event) {
  });

  this.autorun(function () {
    AppUtil.refreshTokens.get('products');
    AppUtil.refreshTokens.get('units');
    AppUtil.refreshTokens.get('stockTypes');

    Meteor.call('products.list', {}, function (error, result) {
      if (error) {
        console.log('error', error);
      }
      if (result) {

        console.log(result);
        self.state.set('products', result);
      }
    });

    Meteor.call('units.list', {}, function (error, result) {
      if (error) {
        console.log('error', error);
      }
      if (result) {

        console.log(result);
        self.state.set('units', result);
      }
    });

    Meteor.call('stockTypes.list', {}, function (error, result) {
      if (error) {
        console.log('error', error);
      }
      if (result) {

        console.log(result);
        self.state.set('stockTypes', result);
      }
    });
  });
});

Template.publicModalStockCardCreate.events({
  'submit form#brdPublicModalStockCardCreateForm': function (event, template) {
    event.preventDefault();
    
    const productId = event.target.productId.value
    const unitId = event.target.unitId.value
    const stockTypeId = event.target.stockTypeId.value
    //const quantity = event.target.quantity.value

    const obj = {
      stockCard: {
        productId: productId,
        unitId: unitId,
        stockTypeId: stockTypeId,
        //quantity: parseInt (quantity),
      },
      
    }

    console.log(obj);
    
    Meteor.call('stockCards.create', obj, function (error, result) {
      if (error) {
        console.log('error', error);
      }


      console.log(result);
      AppUtil.refreshTokens.set('stockCards', Random.id());
      event.target.reset();
      template.modal.hide();
    });

  }
});