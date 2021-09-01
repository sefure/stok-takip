import Swal from 'sweetalert2';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.publicPageStockTransaction.onCreated(function () {
  this.state = new ReactiveDict(null, {
    stockCard: null,
    stockTransactions: [],
  });

});

Template.publicPageStockTransaction.onRendered(function () {
  const self = this;

  this.autorun(function () {
    AppUtil.refreshTokens.get('stockCards');
    AppUtil.refreshTokens.get('stockTransactions');

    const stockCardId = FlowRouter.getParam('stockCardId');

    if (!stockCardId) {
      return;
    }

    Meteor.call('stockCards.show', { _id: stockCardId }, function (error, result) {
      if (error) {
        console.log('error', error);
      }
      if (result) {

        console.log(result);
        self.state.set('stockCard', result);
      }
    });
  });

  this.autorun(function () {
    AppUtil.refreshTokens.get('stockTransactions');

    const stockCardId = FlowRouter.getParam('stockCardId');

    if (!stockCardId) {
      return;
    }

    Meteor.call('stockTransactions.list', { stockCardId: stockCardId }, function (error, result) {
      if (error) {
        console.log('error', error);
      }
      if (result) {

        console.log(result);
        self.state.set('stockTransactions', result);
      }
    });
  });
});

Template.publicPageStockTransaction.events({
  'click .brd-stockTransaction-remove': function (event, template) {
    event.preventDefault();

    const stockTransaction = this;

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
        Meteor.call('stockTransactions.delete', { _id: stockTransaction._id }, function (error, result) {
          Loading.hide();

          if (error) {
            console.log('error', error);
          }

          AppUtil.refreshTokens.set('stockTransactions', Random.id());
        });
      }
    });

  },

  'click .brd-stockTransaction-update': function (event, template) {
    AppUtil.temp.set('stockTransaction', this)
  },

  'click .brd-select-class': function (event, template) {
    event.preventDefault();

    console.log(this);
    template.state.set('stockCard', this);
  },


});