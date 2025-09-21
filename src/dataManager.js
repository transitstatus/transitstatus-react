import { agencies } from "./config";
import localForage from "localforage";

localForage.config({
  name: "TransitstatOffline",
  storeName: "TransitstatOfflineStore",
  version: "3"
})

export class DataManager {
  constructor() {
    const now = new Date().valueOf();

    this._data = localForage.getItem('transitstatus_datamanager_v1_data') ?? {};
    this._endpoints = JSON.parse(localStorage.getItem('transitstatus_datamanager_v1_endpoints') ?? '{}');
  };

  //if the data hasnt been updated within 5 minute or is null, update it
  async checkDataStatusAndUpdate() {
    const endpointKeys = Object.keys(this._endpoints);
    const tempData = await localForage.getItem('transitstatus_datamanager_v1_data') ?? {};

    const updateFeed = async (endpointKey) => {
      if (!this._endpoints[endpointKey]) return; //nope

      try {
        const data = await fetch(`${agencies[endpointKey].endpoint}?t=${Date.now()}`, { cache: 'reload', signal: AbortSignal.timeout(5000) }).then((res) => res.json());
        this._data[endpointKey] = data;
        this._endpoints[endpointKey].lastUpdated = new Date().valueOf();
        localForage.setItem('transitstatus_datamanager_v1_data', JSON.stringify(this._data));
        console.log(`DataManager: ${endpointKey} ${new Date().toISOString()}`);
      } catch (e) {
        console.log(`DataManager: Error updating endpoint ${endpointKey}. Falling back. Most likely a timeout.`);
        console.log(e)
        this._data[endpointKey] = tempData[endpointKey];
        // notably not updating the time of update
      };
    };

    //prefetching recent agencies
    for (let i = 0; i < endpointKeys.length; i++) {
      const endpointKey = endpointKeys[i];
      const endpoint = this._endpoints[endpointKey];

      if (endpoint.lastAccessed < Date.now() - (1000 * 60 * 15)) continue; // been a while, dont autofetch
      updateFeed(endpointKey); // fetch new data in the background
    };

    //setting update loops
    Object.keys(agencies).forEach((endpointKey) => {
      setInterval(() => updateFeed(endpointKey), agencies[endpointKey].updateFrequency ?? 30000);
    });

    return;
  };

  async getData(endpoint, path) {
    const now = new Date().valueOf();

    if (!this._endpoints[endpoint] || !this._data[endpoint] || this._endpoints[endpoint].lastUpdated < now - 1000 * 15) { //if it doesnt exist yet or if out of date by 30 seconds
      this._endpoints[endpoint] = { //creating the record
        lastAccessed: now,
        lastUpdated: now,
      }

      console.log(`DataManager: Endpoint ${endpoint} does not exist or is out of date, adding before returning`)

      //saving the record
      localStorage.setItem('transitstatus_datamanager_v1_endpoints', JSON.stringify(this._endpoints));

      try {
        const res = await fetch(`${agencies[endpoint].endpoint}?t=${Date.now()}`, {
          cache: 'reload'
        });
        const data = await res.json();

        this._data[endpoint] = data;
        this._endpoints[endpoint].lastUpdated = new Date().valueOf();

        //saving data
        localForage.setItem('transitstatus_datamanager_v1_data', JSON.stringify(this._data));
      } catch (e) {
        console.log(`DataManager: Error with initial request for endpoint ${endpoint}:`, e)

        if (!this._data[endpoint]) return 'Not found';
      }
    }

    this._endpoints[endpoint].lastAccessed = now;

    let finalData = this._data[endpoint];
    const endpointArr = path.split('/').filter(n => n);

    for (let i = 0; i < endpointArr.length; i++) {
      if (finalData[endpointArr[i]]) {
        finalData = finalData[endpointArr[i]];
      } else {
        console.log(`DataManager: Not Found ${endpoint} data ${path}`)
        return 'Not found'
      }
    }

    console.log(`DataManager: Returning ${endpoint} data '${path}' (Valid as of ${new Date(this._endpoints[endpoint].lastUpdated).toLocaleString()})`)
    return finalData;
  }
}