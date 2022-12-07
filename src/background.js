browser.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && tab.active) {

        browser.storage.local.get(['isEnabled'], async function (result) {
            if (result.isEnabled) {
                await checkBlocking()
            }
        })

    }
})

async function checkBlocking() {
    browser.storage.sync.get(['urlsToBlock'], async function (result) {
        let actualUrlsToBlock = await result.urlsToBlock
        if (actualUrlsToBlock === undefined) {
            actualUrlsToBlock = ''
        }

        let tab = await getCurrentTab();
        let tabDomain = new URL(tab.url).hostname
        if (tabDomain.trim().length === 0) {
            return
        }
        if (actualUrlsToBlock.includes(tabDomain)) {
            await blockUrls()
        }
    });
}

async function blockUrls() {
    browser.tabs.update({url: "assets/blocked.html"})
}

async function getCurrentTab() {
    let queryOptions = {active: true, currentWindow: true};
    let [tab] = await browser.tabs.query(queryOptions);
    return tab[0];
}
