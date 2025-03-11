# Lightweight Blocker

A minimalist, lightweight site blocker extension for Google Chrome, with privacy and security in mind, for productivity.

Add to Chrome: https://chrome.google.com/webstore/detail/lightweight-blocker/gppkhppnogcgodjackcgcfoepdngfcpm

- minimalist: the UI and the feature set are extremely basic. The blocker needs to do one thing and do it well: blocking unwanted pages.
- lightweight: the extension must be extremely fast, ensuring no noticeable delay when loading pages.
- private: the extension doesn't collect any data.
- secure: there should be no security holes and security issues with the application.

To ensure these quadruple attributes, we avoid using any third-party libraries and prioritize simplicity and effectiveness in every aspect.
In that way, we can ensure that the extension doesn't have security holes or doesn't collect any
private data.

The whole extension is open source, under MIT license, at: https://github.com/SiGe11/Lightweight-Blocker-Extension

## Configuration
You can configure which pages to block from the Options menu (accessed by right-clicking the extension's icon).
You can list the pages to be blocked in the text area. These can be separated with spaces, commas or semicolons. The blocker distinguishes between subdomains. You should specify all subdomains, even 'www'.

By default, the blocker is inactive. You can activate it by left-clicking on the icon of the extension and clicking on the
extension's current status.

## FAQ
### Why do I see the loaded page for some seconds before it is blocked?
To ensure the speed the extension checks the pages for blocking asynchronously. This way it has a quasi-zero impact on pages where
that should be blocked.