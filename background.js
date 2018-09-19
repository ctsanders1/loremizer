const CSS = 'body { border: 20px solid red; }';
const TITLE_APPLY = 'loremiscous';
const TITLE_REMOVE = 'Remove loremiscous';

const browser = window.chrome || browser;

function toggle(tab) {
	function gotTitle(title) {
		if (title === TITLE_APPLY) {
			browser.browserAction.setIcon({ tabId: tab.id, path: 'icons/on.png' });
			browser.browserAction.setTitle({ tabId: tab.id, title: TITLE_REMOVE });
			browser.tabs.executeScript(tab.id, {
				file: 'script.js'
			});
		} else {
			browser.browserAction.setIcon({ tabId: tab.id, path: 'icons/off.png' });
			browser.browserAction.setTitle({ tabId: tab.id, title: TITLE_APPLY });
			browser.tabs.executeScript(tab.id, {
				code: `window.loremiscous();`
			});
		}
	}

	if (window.chrome) {
		browser.browserAction.getTitle({ tabId: tab.id }, gotTitle);
	} else {
		var gettingTitle = browser.browserAction.getTitle({ tabId: tab.id });
		gettingTitle.then(gotTitle);
	}
}

/*
Toggle CSS when the page action is clicked.
*/
browser.browserAction.onClicked.addListener(toggle);
