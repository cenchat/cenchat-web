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

  function fixedEncodeURIComponent(value) {
    return encodeURIComponent(value).replace(/[.!'()*]/g, (c) => {
      return '%' + c.charCodeAt(0).toString(16);
    });
  }

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

  function getCenchatCommentQueryParam() {
    const params = window.location.search.split('&');
    let comment;

    params.forEach((param) => {
      if (param.includes('cenchat_comment')) {
        const startIndex = param.search('cenchat_comment');
        const endIndex = param.length;
        const cenchatCommentParam = param.slice(startIndex, endIndex);

        comment = cenchatCommentParam.split('=')[1];
      }
    });

    return comment;
  }

  function removeCenchatCommentQueryParam(url, comment) {
    url = url.replace(`&cenchat_comment=${comment}`, '');
    url = url.replace(`cenchat_comment=${comment}&`, '');
    url = url.replace(`cenchat_comment=${comment}`, '');

    return url;
  }

  function getSlug(url) {
    return fixedEncodeURIComponent(`${url.pathname}${url.search}`);
  }

  function getIframeSrcSearch() {
    const canonicalUrlElement = getCanonicalUrlElement();
    const comment = getCenchatCommentQueryParam();

    if (canonicalUrlElement) {
      const slug = getSlug(canonicalUrlElement);

      return comment ? `?slug=${slug}&comment=${comment}` : `?slug=${slug}`;
    }

    const pageUrlElement = document.createElement('a');

    pageUrlElement.href = window.location.href;

    if (comment) {
      pageUrlElement.href = removeCenchatCommentQueryParam(
        pageUrlElement.href,
        comment,
      );

      return `?slug=${getSlug(pageUrlElement)}&comment=${comment}`;
    }

    return `?slug=${getSlug(pageUrlElement)}`;
  }

  function getIframeSrc() {
    const siteId = getSiteId();
    const pageId = getPageId();
    let iframeUrl = `https://comments.cenchat.com/sites/${siteId}`;

    if (pageId) {
      iframeUrl = `${iframeUrl}/pages/${pageId}`;
    }

    return `${iframeUrl}${getIframeSrcSearch()}`;
  }

  function createIframeElement() {
    const iframeElement = document.createElement('iframe');

    iframeElement.style = 'width: 100%; border: none';
    iframeElement.id = 'cenchat-comments-thread';
    iframeElement.src = getIframeSrc();
    iframeElement.onload = () => {
      if (window.iFrameResize) {
        iFrameResize({}, '#cenchat-comments-thread');
      }
    };

    return iframeElement;
  }

  function showIframeElement() {
    const cenchatContainerElement = document.querySelector('#cenchat-comments');  

    if (cenchatContainerElement) {
      const iframeElement = createIframeElement();

      cenchatContainerElement.appendChild(iframeElement);
    }
  }

  function createCenchatContainerElement(commentsSectionElement) {
    const element = document.createElement('div');

    element.id = 'cenchat-comments';

    commentsSectionElement.appendChild(element);
  }

  function setupCenchatComments() {
    const commentsSectionElement = document.querySelector('#comments');

    if (commentsSectionElement) {
      createCenchatContainerElement(commentsSectionElement);
      showIframeElement();
    }
  }

  setupCenchatComments();
})();
