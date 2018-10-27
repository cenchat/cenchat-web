import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('policies', function() {
    this.route('privacy');
    this.route('terms');
    this.route('rules');
  });
  this.route('docs', function() {
    this.route('verify-site');
    this.route('integration', function() {
      this.route('custom');
    });
  });
});

export default Router;
