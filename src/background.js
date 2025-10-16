chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && tab.active) {

        chrome.storage.local.get(['isEnabled'], async function (result) {
            if (result.isEnabled) {
                checkBlocking();
            }
        })

    }
})

async function checkBlocking() {
    chrome.storage.local.get(['urlsToBlock'], async function (result) {
        let urlsToBlock = new Set(result.urlsToBlock || []);

        let tab = await getCurrentTab();
        tab = new URL(tab.url);
        let tabDomain = tab.hostname;
        if (tabDomain.trim().length === 0) {
            return;
        }
        if (urlsToBlock.has(tabDomain)) {
            await blockUrls(tab);
        }
    });
}

async function blockUrls(blockedUrl) {
    const blockedPage = chrome.runtime.getURL(
        `src/blocked/blocked.html?page=${encodeURIComponent(blockedUrl.href)}`
    );
    await chrome.tabs.update({url: blockedPage});
}

async function getCurrentTab() {
    let queryOptions = {active: true, lastFocusedWindow: true};
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}
