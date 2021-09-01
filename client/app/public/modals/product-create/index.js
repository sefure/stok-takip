import bootstrap from "bootstrap";

Template.publicModalProductCreate.onRendered(function() {
  const self = this;

  const modalElement = document.getElementById('brdPublicModalProductCreateModal');
  this.modal = new bootstrap.Modal(modalElement);

  modalElement.addEventListener('hidden.bs.modal', function (event) {
    self.$('form#brdPublicModalProductCreateForm').trigger("reset");
  });
});

Template.publicModalProductCreate.events({
  'submit form#brdPublicModalProductCreateForm': function (event, template) {
    event.preventDefault();
    
    const name = event.target.name.value
    const description = event.target.description.value
   
    const obj = {
      product: {
        name: name,
        description: description,

      }
    }

    console.log(obj);
    
    Meteor.call('products.create', obj, function (error, result) {
      if (error) {
        console.log('error', error);
      }


      console.log(result);
      AppUtil.refreshTokens.set('products', Random.id());
      event.target.reset();
      template.modal.hide();
    });
  }
});