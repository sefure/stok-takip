import Swal from 'sweetalert2';

Template.publicPageStockType.onCreated(function () {
  this.state = new ReactiveDict(null, {
    stockTypes: [],
  });

});

Template.publicPageStockType.onRendered(function () {
  const self = this;

  this.autorun(function () {
    AppUtil.refreshTokens.get('stockTypes');

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

Template.publicPageStockType.events({
  
  'click .brd-stockType-remove': function (event, template) {
    event.preventDefault();

    const stockType = this;

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
        Meteor.call('stockTypes.delete', { _id: stockType._id }, function (error, result) {
          Loading.hide();

          if (error) {
            console.log('error', error);
          }

          AppUtil.refreshTokens.set('stockTypes', Random.id());
        });
      }
    });

  },
  'click .brd-stockType-update': function (event, template) {
    event.preventDefault();
    const stockType = this;

    AppUtil.temp.set('stockType',this.data);
    $('#brdPublicModalStockTypeUpdateModal').modal('show');
  }
});

Template.publicPageStockType.onDestroyed(function () {

});