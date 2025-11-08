function constructOptions() {
    function setBlockingUrls(result) {
        // directly set the textarea value to avoid a redundant local variable
        inputUrl.value = Array.from(result.urlsToBlock || []).join(' ');
    }

    browser.storage.local.get(['urlsToBlock']).then(function (result) {
        setBlockingUrls(result);
        if (inputUrl.value.length < 8000) {
            browser.storage.sync.get(['urlsToBlock']).then(setBlockingUrls).catch(()=>{});
        }
    }).catch(()=>{});

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
        browser.storage.local.set({urlsToBlock: urlsToBlock}).then(function(){
            saveMessage.textContent = 'Saved';
        }).catch(function(){
            saveMessage.textContent = 'Failed to save';
        });
    } else if (inputUrl.value.length > 8000) {
        warningMessage.textContent = 'Input exceeds 8000 characters. Data is stored locally and not synced.';
        browser.storage.local.set({urlsToBlock: urlsToBlock}).then(function(){
            saveMessage.textContent = 'Saved';
        }).catch(function(){
            saveMessage.textContent = 'Failed to save';
        });
    } else {
        warningMessage.textContent = '';
        // write sync and local; ignore sync failures
        browser.storage.sync.set({urlsToBlock: urlsToBlock}).then(function(){
            browser.storage.local.set({urlsToBlock: urlsToBlock}).then(function(){
                saveMessage.textContent = 'Saved';
            }).catch(function(){
                saveMessage.textContent = 'Failed to save';
            });
        }).catch(function(){
            // fallback to local storage if sync not available
            browser.storage.local.set({urlsToBlock: urlsToBlock}).then(function(){
                saveMessage.textContent = 'Saved (local only)';
            }).catch(function(err2){
                saveMessage.textContent = 'Failed to save: ' + err2;
            });
        });
    }
}

constructOptions();
