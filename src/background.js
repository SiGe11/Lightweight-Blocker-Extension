chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && tab.active) {

        chrome.storage.local.get(['isEnabled'], async function (result) {
            if (result.isEnabled) {
                await checkBlocking()
            }
        })

    }
})

async function checkBlocking() {
    chrome.storage.sync.get(['urlsToBlock'], async function (result) {
        let actualUrlsToBlock = await result.urlsToBlock
        if (actualUrlsToBlock === undefined) {
            actualUrlsToBlock = ''
        }

        let tab = await getCurrentTab();
        tab = new URL(tab.url)
        let tabDomain = tab.hostname
        if (tabDomain.trim().length === 0) {
            return
        }
        if (actualUrlsToBlock.includes(tabDomain)) {
            await blockUrls(tab)
        }
    });
}

async function blockUrls(blockedUrl) {
    chrome.tabs.update({url: `src/blocked/blocked.html?page=${blockedUrl}`})
}

async function getCurrentTab() {
    let queryOptions = {active: true, lastFocusedWindow: true};
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab
}
