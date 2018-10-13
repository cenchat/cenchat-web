(function () {
  /**
   * @return {string} Site ID
   * @function
   */
  function getSiteId() {
    return document.querySelector('meta[property="cenchat:id"]').getAttribute('content');
  }

  /**
   * @return {string} Page ID
   * @function
   */
  function getPageId() {
    return document.querySelector('#cenchat-widget-button').getAttribute('data-page-id');
  }

  /**
   * @param {string} value
   * @return {string} Encoded URL
   * @function
   */
  function fixedEncodeURIComponent(value) {
    return encodeURIComponent(value).replace(/[.!'()*]/g, c => `%${c.charCodeAt(0).toString(16)}`);
  }

  /**
   * @return {Element|null} URL Element
   * @function
   */
  function getCanonicalUrlElement() {
    const canonicalUrlElement = document.querySelector('link[rel="canonical"]');

    if (canonicalUrlElement && canonicalUrlElement.hasAttribute('href')) {
      const urlElement = document.createElement('a');

      urlElement.href = canonicalUrlElement.getAttribute('href');

      return urlElement;
    }

    const ogUrlElement = document.querySelector('meta[property="og:url"]');

    if (ogUrlElement && ogUrlElement.hasAttribute('content')) {
      const urlElement = document.createElement('a');

      urlElement.href = ogUrlElement.getAttribute('content');

      return urlElement;
    }

    return null;
  }

  /**
   * @param {string} url
   * @return {string} Slug
   * @function
   */
  function getSlug(url) {
    return fixedEncodeURIComponent(`${url.pathname}${url.search}`);
  }

  /**
   * @return {string} IFrame source URL search
   * @function
   */
  function getIframeSrcSearch() {
    const canonicalUrlElement = getCanonicalUrlElement();

    if (canonicalUrlElement) {
      const slug = getSlug(canonicalUrlElement);

      return `?slug=${slug}`;
    }

    const pageUrlElement = document.createElement('a');

    pageUrlElement.href = window.location.href;

    return `?slug=${getSlug(pageUrlElement)}`;
  }

  /**
   * @return {string} IFrame src
   * @function
   */
  function getIframeSrc() {
    const siteId = getSiteId();
    const pageId = getPageId();
    let iframeUrl = `https://widget.cenchat.com/sites/${siteId}`;

    if (pageId) {
      iframeUrl = `${iframeUrl}/pages/${pageId}`;
    }

    return `${iframeUrl}${getIframeSrcSearch()}`;
  }

  /**
   * @return {Element} IFrame
   * @function
   */
  function createIframeElement() {
    const iframeElement = document.createElement('iframe');

    iframeElement.classList.add('cenchat-widget-iframe');

    iframeElement.src = getIframeSrc();

    return iframeElement;
  }

  /**
   * @function
   */
  function showIframeElement() {
    if (!document.querySelector('.cenchat-widget-iframe')) {
      const iframeElement = createIframeElement();

      document.querySelector('.cenchat-widget-container').appendChild(iframeElement);
    }
  }

  /**
   * @function
   */
  function setupCenchatStyles() {
    const styleElement = document.createElement('style');

    styleElement.type = 'text/css';
    styleElement.innerHTML = `
      .cenchat-widget-container {
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 10000;
        display: flex;
        flex-direction: column;
        height: 100%;
        background-color: #fff;
        transform: translateY(110%);
        transition-duration: 200ms;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      }

      @media (min-width: 960px) {
        .cenchat-widget-container {
          right: 72px;
          left: auto;
          width: 320px;
          height: 568px;
          overflow: hidden;
          border-top-right-radius: 8px;
          border-top-left-radius: 8px;
          box-shadow: 0 8px 10px -5px rgba(0, 0, 0, 0.2), 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12);
        }
      }

      .cenchat-widget-container--visible {
        transform: translateY(0);
      }

      .cenchat-widget-container__menu {
        font-family: Arial, Helvetica, sans-serif;
        background-color: #000;
      }

      .cenchat-widget-container__close-button {
        padding: 4px 12px;
        font-size: 12px;
        color: #fff;
        background: none;
        border: none;
      }

      .cenchat-widget-iframe {
        flex: 1;
        width: 100%;
        overflow: hidden;
        border: none;
      }
    `;

    document.querySelector('head').appendChild(styleElement);
  }

  /**
   * @function
   */
  function setupCenchatWidgetContainer() {
    const containerElement = document.createElement('div');

    containerElement.classList.add('cenchat-widget-container');

    const menuElement = document.createElement('div');

    menuElement.classList.add('cenchat-widget-container__menu');

    containerElement.appendChild(menuElement);

    const closeButtonElement = document.createElement('button');

    closeButtonElement.innerHTML = '&#10006;';

    closeButtonElement.classList.add('cenchat-widget-container__close-button');
    closeButtonElement.addEventListener('click', () => (
      document.querySelector('.cenchat-widget-container').classList.remove('cenchat-widget-container--visible')
    ));
    menuElement.appendChild(closeButtonElement);
    document.body.appendChild(containerElement);
  }

  /**
   * @function
   */
  function setupCenchatButton() {
    const buttonElement = document.querySelector('#cenchat-widget-button');

    buttonElement.addEventListener('click', () => {
      document.querySelector('.cenchat-widget-container').classList.add('cenchat-widget-container--visible');

      showIframeElement();
    });
  }

  setupCenchatStyles();
  setupCenchatWidgetContainer();
  setupCenchatButton();
}());
