import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('sites', function() {
    this.route('site', { path: '/:site_id' }, function() {
      this.route('pages', function() {
        this.route('page', { path: '/:page_postfix_id' }, function() {
          this.route('explore', function() {
            this.route('chat', { path: '/:chat_id' }, function() {
              this.route('messages');
            });
          });
          this.route('account');
          this.route('my-chat', function() {
            this.route('messages');
          });
          this.route('chats', function() {
            this.route('chat', { path: '/:chat_id' }, function() {
              this.route('messages');
            });
          });
        });
      });
    });
  });
  this.route('sign-in');
});

export default Router;
