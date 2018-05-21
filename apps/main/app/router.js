import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('about', function() {
    this.route('terms');
    this.route('privacy');
    this.route('rules');
  });
  this.route('comments', { path: '/comments/:comment_id' });
  this.route('docs', function() {
    this.route('installation', { path : 'installation/:platform_id' });
  });
  this.route('home', { path: '/' }, function() {});
  this.route('notifications');
  this.route('profile', { path: '/profile/:user_id' }, function() {
    this.route('edit');
    this.route('followings');
    this.route('follow-suggestions');
    this.route('settings');
  });
  this.route('search');
  this.route('sign-in');
  this.route('sites', function() {
    this.route('index', { path: '/' }, function() {
      this.route('new');
    });
    this.route('site', { path : '/:site_id' }, function() {
      this.route('index', { path: '/' }, function() {
        this.route('approved-comments');
        this.route('rejected-comments');
      });
      this.route('pages');
      this.route('manage', function() {
        this.route('roles');
      });
    });
  });

  this.route('site', function() {
    this.route('site', function() {});
  });
});

export default Router;
