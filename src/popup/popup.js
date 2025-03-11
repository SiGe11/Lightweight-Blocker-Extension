function showCurrentStatus() {
    chrome.storage.local.get(['isEnabled'], async function (result) {
        if (result.isEnabled === undefined) {
            result.isEnabled = false;
            chrome.storage.local.set({isEnabled: false});
        }
        if (result.isEnabled) {
            currentStatus.textContent = 'Active';
        } else {
            currentStatus.textContent = 'Inactive';
        }

    })

    currentStatus.addEventListener('click', changeCurrentStatus);

}

function changeCurrentStatus() {
    chrome.storage.local.get(['isEnabled'], async function (result) {
        if (result.isEnabled) {
            chrome.storage.local.set({isEnabled: false}, function () {
                currentStatus.textContent = 'Inactive';
            })
        } else {
            chrome.storage.local.set({isEnabled: true}, function () {
                currentStatus.textContent = 'Active';
            })
        }

    })

}

showCurrentStatus();
