(async () =>
{
  let off = await new Promise(resolve =>
  {
    // https://youtu.be/NEdOCvexyck?t=5
    chrome.storage.sync.get('off', ({ off }) => resolve(off))
  })

  // update extension icon based on on/off state
  const setIcon = () => chrome.browserAction.setIcon({ path: `/src/assets/icon${ off ? '-off' : '' }.png` })

  chrome.storage.sync.onChanged.addListener(({ off: _off }) =>
    _off && ( (off = _off.newValue), setIcon() ))

  // update extension icon
  setIcon()
})()
