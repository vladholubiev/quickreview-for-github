export function openNewTab(url): void {
  chrome.tabs.create({
    url,
    active: true
  });
}
