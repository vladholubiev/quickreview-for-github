chrome.runtime.onMessage.addListener((message, {tab}) => {
  if (Array.isArray(message?.openURLs)) {
    for (const [i, url] of (message.openURLs as string[]).entries()) {
      chrome.tabs.create({
        url,
        index: tab!.index + i + 1,
        active: true,
      });
    }
  }
});
