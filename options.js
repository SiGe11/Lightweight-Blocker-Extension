function constructOptions() {
    chrome.storage.sync.get(['urlsToBlock'], function (result) {
        let blockingUrls = result.urlsToBlock
        if (blockingUrls === undefined) {
            blockingUrls = ''
        }
        inputUrl.value = blockingUrls
    })
    saveInputUrl.addEventListener('click', saveUrl)
}

function sanitzeInput(str) {
    if (str.length > 10000) {
        str = str.slice(0, 10000)
    }
    return str.replace(/[^a-zA-Z . //]/g, "")
}

function saveUrl() {
    inputUrl.value = sanitzeInput(inputUrl.value)
    chrome.storage.sync.set({urlsToBlock: inputUrl.value})
}

constructOptions()
