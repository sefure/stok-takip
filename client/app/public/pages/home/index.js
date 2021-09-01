import Swal from 'sweetalert2';

Template.publicPageHome.onCreated(function () {
  this.state = new ReactiveDict(null, {
    products: [],
  });

});

Template.publicPageHome.onRendered(function () {
  const self = this;

  this.autorun(function () {
    AppUtil.refreshTokens.get('products');

    Meteor.call('products.list', {}, function (error, result) {
      if (error) {
        console.log('error', error);
      }
      if (result) {

        console.log(result);
        self.state.set('products', result);
      }
    });
  });
});

Template.publicPageHome.events({
  'click .brd-product-remove': function (event, template) {

    const product = this;

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
        Meteor.call('products.delete', { _id: product._id }, function (error, result) {
          Loading.hide();

          if (error) {
            console.log('error', error);
          }

          AppUtil.refreshTokens.set('products', Random.id());
        });
      }
    });

  },
  'click .brd-update': function (event, template) {

    const product = this;

    console.log(this);

    AppUtil.temp.set('product',this);

  },
  
  'click .brd-product-update': function (event, template) {
    event.preventDefault();
    const product = this;

    AppUtil.temp.set('product',this.data);
    $('#brdPublicModalProductUpdateModal').modal('show');
  }
});

Template.publicPageHome.onDestroyed(function () {

});