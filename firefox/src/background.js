browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    const navUrl = changeInfo && changeInfo.url ? changeInfo.url : (tab && tab.url);
    if (!navUrl) return;

    if (tab && !tab.active) return;

    browser.storage.local.get(['isEnabled']).then(function (result) {
        if (result.isEnabled) {
            checkBlocking(tabId, navUrl);
        }
    });
});

async function checkBlocking(tabId, navUrl) {
    browser.storage.local.get(['urlsToBlock']).then(async function (result) {
        let urlsToBlock = new Set(result.urlsToBlock || []);
        const urlObj = new URL(navUrl);
        let tabDomain = urlObj.hostname;
        if (!tabDomain || tabDomain.trim().length === 0) {
            return;
        }
        if (urlsToBlock.has(tabDomain)) {
            await blockUrls(tabId, navUrl);
        }
    });
}

async function blockUrls(blockedTabId, originalUrl) {
    const blockedPage = browser.runtime.getURL(
        `src/blocked/blocked.html?page=${encodeURIComponent(originalUrl)}`
    );
    await browser.tabs.update(blockedTabId, {url: blockedPage});
}

async function getCurrentTab() {
    let queryOptions = {active: true, lastFocusedWindow: true};
    let [tab] = await browser.tabs.query(queryOptions);
    return tab;
}
