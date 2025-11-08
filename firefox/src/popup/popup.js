function showCurrentStatus() {
    browser.storage.local.get(['isEnabled']).then(function (result) {
        if (result.isEnabled === undefined) {
            result.isEnabled = false;
            browser.storage.local.set({isEnabled: false});
        }
        if (result.isEnabled) {
            currentStatus.textContent = 'Active';
        } else {
            currentStatus.textContent = 'Inactive';
        }

    });

    currentStatus.addEventListener('click', changeCurrentStatus);

}

function changeCurrentStatus() {
    browser.storage.local.get(['isEnabled']).then(function (result) {
        if (result.isEnabled) {
            browser.storage.local.set({isEnabled: false}).then(function () {
                currentStatus.textContent = 'Inactive';
            });
        } else {
            browser.storage.local.set({isEnabled: true}).then(function () {
                currentStatus.textContent = 'Active';
            });
        }

    });

}

var settingsButton = document.getElementById('settingsButton');
if (settingsButton) {
    settingsButton.addEventListener('click', function () {
        browser.runtime.openOptionsPage();
    });
}

showCurrentStatus();
