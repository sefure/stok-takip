import bootstrap from "bootstrap";

Template.publicModalUnitCreate.onRendered(function() {
  const self = this;

  const modalElement = document.getElementById('brdPublicModalUnitCreateModal');
  this.modal = new bootstrap.Modal(modalElement);

  modalElement.addEventListener('hidden.bs.modal', function (event) {
    self.$('form#brdPublicModalUnitCreateForm').trigger("reset");
  });
});

Template.publicModalUnitCreate.events({
  'submit form#brdPublicModalUnitCreateForm': function (event, template) {
    event.preventDefault();
    
    const name = event.target.name.value
    const description = event.target.description.value
   
    const obj = {
      unit: {
        name: name,
        description: description,

      }
    }

    console.log(obj);
    
    Meteor.call('units.create', obj, function (error, result) {
      if (error) {
        console.log('error', error);
      }


      console.log(result);
      AppUtil.refreshTokens.set('units', Random.id());
      event.target.reset();
      template.modal.hide();
    });
  }
});