function constructOptions() {
    function setBlockingUrls(result) {
        let blockingUrls = Array.from(result.urlsToBlock || []).join(' ');
        inputUrl.value = blockingUrls;
    }

    chrome.storage.local.get(['urlsToBlock'], function (result) {
        setBlockingUrls(result);
        if (inputUrl.value.length < 8000) {
            chrome.storage.sync.get(['urlsToBlock'], setBlockingUrls);
        }
    });

    saveInputUrl.addEventListener('click', saveUrl);
}

function sanitizeInput(str) {
    return str.replace(/[^a-zA-Z\d-._~:/?#[\]@!$&'()*+,;= ]/g, "");
}

function saveUrl() {
    inputUrl.value = sanitizeInput(inputUrl.value);
    let actualUrlsToBlock = inputUrl.value;
    let urlsToBlock = Array.from(new Set(actualUrlsToBlock.split(/\s|,|;/).filter(Boolean)));

    if (inputUrl.value.length > 10000000) {
        warningMessage.textContent = 'Input exceeds 10,000,000 characters. Data is truncated, stored locally, and not synced.';
        inputUrl.value = inputUrl.value.slice(0, 10000000);
        chrome.storage.local.set({urlsToBlock: urlsToBlock});
    } else if (inputUrl.value.length > 8000) {
        warningMessage.textContent = 'Input exceeds 8000 characters. Data is stored locally and not synced.';
        chrome.storage.local.set({urlsToBlock: urlsToBlock});
    } else {
        warningMessage.textContent = '';
        chrome.storage.sync.set({urlsToBlock: urlsToBlock});
        chrome.storage.local.set({urlsToBlock: urlsToBlock});
    }
    if (chrome.runtime.lastError) {
        saveMessage.textContent = "Failed to save: " + chrome.runtime.lastError;
    } else {
        saveMessage.textContent = 'Saved';
    }
}

constructOptions();
