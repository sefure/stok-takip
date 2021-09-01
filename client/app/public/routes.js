import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

FlowRouter.route('/', {
  name: 'public.home',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', { page: 'publicPageHome' });
  }
});

FlowRouter.route('/stockType', {
  name: 'public.stockType',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', { page: 'publicPageStockType' });
  }
});

FlowRouter.route('/unit', {
  name: 'public.unit',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', { page: 'publicPageUnit' });
  }
});

FlowRouter.route('/stockCard', {
  name: 'public.stockCard',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', { page: 'publicPageStockCard' });
  }
});

FlowRouter.route('/stockTransaction/:stockCardId', {
  name: 'public.stockTransaction',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', { page: 'publicPageStockTransaction' });
  }
});