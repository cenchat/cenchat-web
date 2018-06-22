import Route from '@ember/routing/route';

/**
 * @class DocsInstallation
 * @namespace Route
 * @extends Ember.Route
 */
export default Route.extend({
  /**
   * @type {Object}
   */
  platforms: [
    {
      id: 'blogger',
      name: 'Blogger',
      description: null,
      logoUrl: 'https://firebasestorage.googleapis.com/v0/b/cenchat-prod.appspot.com/o/assets%2Fimages%2Flogos%2Fblogger%2Fblogger-logo_600.png?alt=media&token=6319c57d-a44e-4062-b99e-24f538a7ff17',
    },
    {
      id: 'wordpress',
      name: 'WordPress',
      description: null,
      logoUrl: 'https://firebasestorage.googleapis.com/v0/b/cenchat-prod.appspot.com/o/assets%2Fimages%2Flogos%2Fwordpress%2Fwordpress-logo_500.png?alt=media&token=789368c7-bfd5-496f-96f7-dd9aab796405',
    },
    {
      id: 'universal',
      name: 'Universal',
      description: 'For platforms not listed',
      logoUrl: 'https://firebasestorage.googleapis.com/v0/b/cenchat-prod.appspot.com/o/assets%2Fimages%2Flogos%2Fhtml5%2Fhtml5-logo_512.png?alt=media&token=0a329fa8-7691-41a0-b764-6ea6845443ea',
    },
  ],

  /**
   * @override
   */
  model(param) {
    return this.platforms.findBy('id', param.platform_id);
  },
});
