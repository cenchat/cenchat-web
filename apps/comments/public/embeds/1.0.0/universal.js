(function() {
  function fixedEncodeURIComponent(value) {
    return encodeURIComponent(value).replace(/[.!'()*]/g, (c) => {
      return '%' + c.charCodeAt(0).toString(16);
    });
  }

  function getCanonicalUrlElement() {
    const canonicalUrlElement = document.querySelector('link[rel="canonical"]');

    if (canonicalUrlElement) {
      return canonicalUrlElement;
    }

    const ogUrlElement = document.querySelector('meta[property="og:url"]');

    if (ogUrlElement) {
      return ogUrlElement;
    }

    return null;
  }

  function getPageUrlSlug() {
    const canonicalUrlElement = getCanonicalUrlElement();
    let pageUrl = window.location;

    if (canonicalUrlElement) {
      const canonicalUrl = canonicalUrlElement.getAttribute('href');

      if (canonicalUrl) {
        const canonicalLinkElement = document.createElement('a');

        canonicalLinkElement.href = canonicalUrl;
        pageUrl = canonicalLinkElement;
      }
    }

    return fixedEncodeURIComponent(`${pageUrl.pathname}${pageUrl.search}`);
  }

  function setupCenchatComments() {
    const cenchatContainerElement = document.querySelector('#cenchat-comments');  

    if (cenchatContainerElement) {
      const siteId = document
        .querySelector('meta[property="cenchat:id"]')
        .getAttribute('content');
      const pageId = cenchatContainerElement.getAttribute('data-page-id');
      const pageUrlSlug = getPageUrlSlug();
      let iframeUrl = `https://comments.cenchat.com/sites/${siteId}`;

      if (pageId) {
        iframeUrl = `${iframeUrl}/pages/${pageId}`;
      }

      iframeUrl = `${iframeUrl}?slug=${pageUrlSlug}`;

      const iframeElement = document.createElement('iframe');

      iframeElement.style = 'width: 100%; border: none';
      iframeElement.id = 'cenchat-comments-thread';
      iframeElement.src = iframeUrl;
      iframeElement.onload = () => {
        if (window.iFrameResize) {
          iFrameResize({}, '#cenchat-comments-thread');
        }
      };

      cenchatContainerElement.appendChild(iframeElement);
    }
  }

  setupCenchatComments();
})();
