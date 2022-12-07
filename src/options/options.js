function constructOptions() {
    browser.storage.local.get(['urlsToBlock'], function (result) {
        let blockingUrls = result.urlsToBlock
        if (blockingUrls === undefined) {
            blockingUrls = ''
        }
        inputUrl.value = blockingUrls
    })
    saveInputUrl.addEventListener('click', saveUrl)
}

function sanitizeInput(str) {
    if (str.length > 10000) {
        str = str.slice(0, 10000)
    }
    return str.replace(/[^a-zA-Z\d-._~:/?#[\]@!$&'()*+,;= ]/g, "")
}

function saveUrl() {
    inputUrl.value = sanitizeInput(inputUrl.value)
    browser.storage.local.set({urlsToBlock: inputUrl.value})
}

constructOptions()
