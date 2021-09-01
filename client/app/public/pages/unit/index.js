import Swal from 'sweetalert2';

Template.publicPageUnit.onCreated(function () {
  this.state = new ReactiveDict(null, {
    units: [],
  });

});

Template.publicPageUnit.onRendered(function () {
  const self = this;

  this.autorun(function () {
    AppUtil.refreshTokens.get('units');

    Meteor.call('units.list', {}, function (error, result) {
      if (error) {
        console.log('error', error);
      }
      if (result) {

        console.log(result);
        self.state.set('units', result);
      }
    });
  });
});

Template.publicPageUnit.events({
  
  'click .brd-update': function (event, template) {

    const unit = this;

    console.log(this);

    AppUtil.temp.set('unit',this);

  },
  'click .brd-unit-remove': function (event, template) {
    event.preventDefault();

    const unit = this;

    console.log(this);

    Swal.fire({
      title: 'Silmek istiyor musunuz?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--bs-danger)',
      cancelButtonColor: 'var(--bs-dark)',
      cancelButtonText: 'Hayır',
      confirmButtonText: 'Evet'
    }).then((result) => {
      if (result.value) {

        Loading.show();
        Meteor.call('units.delete', { _id: unit._id }, function (error, result) {
          Loading.hide();

          if (error) {
            console.log('error', error);
          }

          AppUtil.refreshTokens.set('units', Random.id());
        });
      }
    });

  },
  'click .brd-unit-update': function (event, template) {
    event.preventDefault();
    const unit = this;

    AppUtil.temp.set('unit',this.data);
    $('#brdPublicModalUnitUpdateModal').modal('show');
  }
});

Template.publicPageUnit.onDestroyed(function () {

});