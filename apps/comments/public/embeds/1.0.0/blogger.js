(function() {
  function getSiteId() {
    return document
      .querySelector('meta[property="cenchat:id"]')
      .getAttribute('content');
  }

  function getPageId() {
    const element = document.querySelector('a[name]');

    if (element) {
      const pageId = element.getAttribute('name');

      if (!isNaN(pageId)) {
        return pageId;
      }
    }

    return null;
  }

  function createCenchatContainerElement(commentsSectionElement) {
    const element = document.createElement('div');

    element.id = 'cenchat-comments';

    commentsSectionElement.appendChild(element);
  }

  function createCenchatIframeElement(siteId) {
    const pageId = getPageId();
    let iframeUrl = `https://comments.cenchat.com/sites/${siteId}`;

    if (pageId) {
      iframeUrl = `${iframeUrl}/pages/${pageId}`;
    }

    const pageUrlSlug = getPageUrlSlug();

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

    document.querySelector('#cenchat-comments').appendChild(iframeElement);
  }

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
    const commentsSectionElement = document.querySelector('#comments');

    if (commentsSectionElement) {
      const siteId = getSiteId();

      createCenchatContainerElement(commentsSectionElement);
      createCenchatIframeElement(siteId);
    }
  }

  setupCenchatComments();
})();
