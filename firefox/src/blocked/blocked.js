function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function setPageText() {
    const pageLink = document.getElementById('pageLink');
    pageLink.href = getQueryParam('page');
}

setPageText();
