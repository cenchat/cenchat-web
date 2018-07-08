import { classify } from '@ember/string';
import { inject as service } from '@ember/service';
import { scheduleOnce } from '@ember/runloop';
import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  fastboot: service(),
  metrics: service(),
  location: config.locationType,
  rootURL: config.rootURL,

  didTransition(...args) {
    this._super(...args);

    if (!this.fastboot.isFastBoot) {
      this.trackPageForAnalytics();
    }

    return true;
  },

  getSimpleRouteName(routeName) {
    let parsedRouteName = routeName;

    if (parsedRouteName.endsWith('.index')) {
      parsedRouteName = parsedRouteName.replace('.index', '');
    }

    return classify(parsedRouteName);
  },

  trackPageForAnalytics() {
    scheduleOnce('afterRender', this, () => {
      const page = document.location.pathname;
      const title = this.getSimpleRouteName(this.currentRouteName || '');

      this.metrics.trackPage({ page, title });
    });
  },
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
      this.route('pages', function() {
        this.route('page', { path: '/:page_id' });
      });
      this.route('manage', function() {
        this.route('roles');
      });
    });
  });
});

export default Router;
