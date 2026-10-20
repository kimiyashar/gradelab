(() => {
  const config = window.GradeLabAds || { enabled: false };
  const slots = [...document.querySelectorAll('[data-ad-slot]')];
  slots.forEach((slot) => { slot.dataset.adState = 'disabled'; });
  if (!config.enabled) return;

  if (config.provider !== 'adsense' || !config.clientId) {
    console.warn('GradeLab ads are enabled without a configured provider.');
    return;
  }

  const configured = slots.filter((slot) => config.placements?.[slot.dataset.adSlot]);
  if (!configured.length) return;

  const script = document.createElement('script');
  script.async = true;
  script.crossOrigin = 'anonymous';
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(config.clientId)}`;
  document.head.append(script);

  for (const slot of configured) {
    slot.hidden = false;
    slot.dataset.adState = 'loading';
    slot.innerHTML = `<span>Sponsored</span><ins class="adsbygoogle" style="display:block" data-ad-client="${config.clientId}" data-ad-slot="${config.placements[slot.dataset.adSlot]}" data-ad-format="auto" data-full-width-responsive="true"></ins>`;
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }
})();
