import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('home', { path: '/' }, function() {});
  this.route('profile', { path: '/profile/:user_id' }, function() {
    this.route('edit');
    this.route('followings');
  });
  this.route('sites', function() {
    this.route('index', { path: '/' }, function() {
      this.route('new');
    });
    this.route('site', { path : '/:site_id' }, function() {
      this.route('index', { path: '/' }, function() {});
      this.route('page', { path: '/pages/:page_id' }, function() {});
    });
  });
  this.route('notifications');
  this.route('docs', function() {
    this.route('installation', { path : 'installation/:platform' });
  });
  this.route('sign-in');
  this.route('about', function() {
    this.route('terms');
    this.route('privacy');
  });
});

export default Router;
