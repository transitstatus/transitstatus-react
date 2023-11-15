export const clearCodeCache = async () => {
  console.log('Confirming')
  if (window.confirm("Are you sure you would like to clear the code cache?")) {
    const cacheKeys = await caches.keys();

    for (let i = 0; i < cacheKeys.length; i++) {
      const cache = await caches.open(cacheKeys[i]);
      const requests = await cache.keys();

      for (let j = 0; j < requests.length; j++) {
        const request = requests[j];

        console.log(request);

        if (request.url.startsWith('https://transitstat.us/assets')) {
          cache.delete(request);
        }
      }
    }

    console.log('Alerting')

    window.alert("The code cache has been cleared. The page will reload once you press 'OK'.")

    console.log('Reloading')
    location.reload();
  }
};

export const clearTransitDataCache = () => {
  console.log('Confirming')
  if (window.confirm("Are you sure you would like to clear the transit data cache?")) {
    localStorage.removeItem('transitstatus_datamanager_v1_endpoints');
    localStorage.removeItem('transitstatus_datamanager_v1_data');
    console.log('Alerting')

    window.alert("The transit data cache has been cleared. The page will reload once you press 'OK'.")

    console.log('Reloading')
    location.reload();
  }
}

export const clearSettings = () => {
  console.log('Confirming')
  if (window.confirm("Are you sure you would like to reset your settings?")) {
    localStorage.removeItem('transitstatus_v1_settings');
    console.log('Alerting')

    window.alert("Your settings have been reset. The page will reload once you press 'OK'.")

    console.log('Reloading')
    location.reload();
  }
}

export const clearLocalStorage = () => {
  console.log('Confirming')
  if (window.confirm("***PLEASE READ THIS***\n\nThis WILL delete ALL of your favorites and probably won't fix anything if something is broken. If you are having an issue, one of the above buttons will probably fix it, NOT this. ONLY use this if you want a clean slate using Transitstatus.")) {
    localStorage.clear();
    console.log('Alerting')

    window.alert("Everything has been reset. The page will reload once you press 'OK'.")

    console.log('Reloading')
    location.reload();
  }
}