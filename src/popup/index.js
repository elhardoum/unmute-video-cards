(async () =>
{
  const svgOn = document.querySelector('#control svg:last-child')
      , svgOff = document.querySelector('#control svg:first-child')
      , state = document.getElementById('state')

  svgOn.addEventListener('click', e => (e.preventDefault(), toggle()))
  svgOff.addEventListener('click', e => (e.preventDefault(), toggle()))

  const toggle = () => ((off = ! off), chrome.storage.sync.set({ off: off }, () => undefined))

  const setToggles = () =>
  {
    svgOn.parentElement.style.display = ''
    svgOn.style.display = off ? 'none' : ''
    svgOff.style.display = off ? '' : 'none'
    state.textContent = off ? 'Disabled' : 'Enabled'
  }

  let off = await new Promise(resolve =>
    chrome.storage.sync.get('off', ({ off }) => resolve(off)))

  chrome.storage.sync.onChanged.addListener(({ off }) =>
    off && ( (off = off.newValue), setToggles() ))

  setToggles()
})()