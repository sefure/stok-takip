import Swal from 'sweetalert2';

Template.publicPageStockCard.onCreated(function () {
  this.state = new ReactiveDict(null, {
    stockCards: [],
    quantity: 0,
    
  });
  this.number = ReactiveVar(0);

});

Template.publicPageStockCard.onRendered(function () {
  const self = this;


  this.autorun(function () {
    AppUtil.refreshTokens.get('stockCards');

    Meteor.call('stockCards.list', {}, function (error, result) {
      if (error) {
        console.log('error', error);
      }
      if (result) {

        console.log(result);
        self.state.set('stockCards', result);
      }
    });
  });
});

Template.publicPageStockCard.events({
  
  'click .brd-stockCard-remove': function (event, template) {

    const stockCard = this;

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
        Meteor.call('stockCards.delete', { _id: stockCard._id }, function (error, result) {
          Loading.hide();

          if (error) {
            console.log('error', error);
          }

          AppUtil.refreshTokens.set('stockCards', Random.id());
        });
      }
    });

  },
 'click .brd-class-add' : function (event, template) {
   AppUtil.temp.set('productId', this._id)
 },
 'click .brd-select-class': function (event, template) {
   event.preventDefault();

   console.log(this);
   template.state.set('product', this);
 },


});