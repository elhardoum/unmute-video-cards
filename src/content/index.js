(async () =>
{
  new MutationObserver(function()
  {
    const video = document.querySelector('.ytd-video-preview video.video-stream:not(.processed)')
    if ( video ) {
      const api = video.parentElement.parentElement
      api.unMute()
      api.setVolume(100)
      video.__defineSetter__('muted', () => void 0)
      video.classList.add('processed')
    }
  }).observe(document, {
    subtree: true,
    childList: true,
  })
})()
