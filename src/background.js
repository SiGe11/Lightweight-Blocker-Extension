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
        let tabDomain = new URL(tab.url).hostname
        if (actualUrlsToBlock.includes(tabDomain)) {
            await blockUrls()
        }
    });
}

async function blockUrls() {
    chrome.tabs.update({url: "assets/blocked.html"})
}

async function getCurrentTab() {
    let queryOptions = {active: true, lastFocusedWindow: true};
    let [tab] = await chrome.tabs.query(queryOptions);
    console.log(tab.url)
    return tab
}