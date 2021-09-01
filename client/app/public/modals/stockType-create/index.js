import bootstrap from "bootstrap";

Template.publicModalStockTypeCreate.onRendered(function() {
  const self = this;

  const modalElement = document.getElementById('brdPublicModalStockTypeCreateModal');
  this.modal = new bootstrap.Modal(modalElement);

  modalElement.addEventListener('hidden.bs.modal', function (event) {
    self.$('form#brdPublicModalStockTypeCreateForm').trigger("reset");
  });
});

Template.publicModalStockTypeCreate.events({
  'submit form#brdPublicModalStockTypeCreateForm': function (event, template) {
    event.preventDefault();
    
    const name = event.target.name.value
    const description = event.target.description.value
   
    const obj = {
      stockType: {
        name: name,
        description: description,

      }
    }

    console.log(obj);
    
    Meteor.call('stockTypes.create', obj, function (error, result) {
      if (error) {
        console.log('error', error);
      }


      console.log(result);
      AppUtil.refreshTokens.set('stockTypes', Random.id());
      event.target.reset();
      template.modal.hide();
    });
  }
});