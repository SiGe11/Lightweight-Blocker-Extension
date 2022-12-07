function showCurrentStatus() {
    browser.storage.local.get(['isEnabled'], async function (result) {
        if (result.isEnabled === undefined) {
            result.isEnabled = false
            browser.storage.local.set({isEnabled: false})
        }
        if (result.isEnabled) {
            currentStatus.textContent = 'Active'
        } else {
            currentStatus.textContent = 'Inactive'
        }

    })

    currentStatus.addEventListener('click', changeCurrentStatus)

}

function changeCurrentStatus() {
    browser.storage.local.get(['isEnabled'], async function (result) {
        if (result.isEnabled) {
            browser.storage.local.set({isEnabled: false}, function () {
                currentStatus.textContent = 'Inactive'
            })
        } else {
            browser.storage.local.set({isEnabled: true}, function () {
                currentStatus.textContent = 'Active'
            })
        }

    })

}

showCurrentStatus()
