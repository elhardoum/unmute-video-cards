(async () =>
{
  // fetch setting
  let off = await new Promise(resolve => chrome.storage.sync.get('off', ({ off }) => resolve(off)))

  if ( off )
    return

  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = chrome.runtime.getURL('/src/content/index.js')

  new MutationObserver(function()
  {
    return document.head ? (document.head.appendChild(script), this.disconnect()) : null
  }).observe(document, {
    subtree: true,
    childList: true,
  })
})()