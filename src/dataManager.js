import { agencies } from "./config";

export class DataManager {
  constructor() {
    const now = new Date().valueOf();

    this._data = JSON.parse(localStorage.getItem('transitstatus_datamanager_v1_data')) ?? {};
    this._endpoints = JSON.parse(localStorage.getItem('transitstatus_datamanager_v1_endpoints')) ?? {
      rutgers: {
        lastAccessed: 10,
        lastUpdated: 0,
      }
    };
    this._lastUpdatedEver = localStorage.getItem('transitstatus_datamanager_v1_last_updated') ?? 0;

    const updateData = () => {
      Object.keys(this._endpoints).forEach((endpointKey) => {
        const endpointMeta = this._endpoints[endpointKey];
        const endpointConfig = agencies[endpointKey];

        if (endpointMeta.lastAccessed > now - 1000 * 60 * 15) { //within the last 15 minutes
          try {
            fetch(new Request(endpointConfig.endpoint, {
              cache: 'reload'
            }))
              .then((res) => res.json())
              .then((data) => {
                this._data[endpointKey] = data;
                this._endpoints[endpointKey].lastUpdated = new Date().valueOf();
              })
          } catch (e) {
            console.log(`Error updaing endpoint ${endpointKey}:`, e)
          }
        }
      })

      //i know this is gonna be 1 refresh out of date. fuck you, i don't give a shit
      localStorage.setItem('transitstatus_datamanager_v1_data', JSON.stringify(this._data));
      localStorage.setItem('transitstatus_datamanager_v1_endpoints', JSON.stringify(this._endpoints));
    }

    setInterval(() => {
      updateData();
    }, 30000) //every 30 seconds, refresh
  }

  async getData(endpoint, path) {
    const now = new Date().valueOf();

    if (!this._endpoints[endpoint] || this._endpoints[endpoint].lastUpdated < now - 1000 * 15) { //if it doesnt exist yet or if out of date by 30 seconds
      this._endpoints[endpoint] = { //creating the record
        lastAccessed: now,
        lastUpdated: now,
      }

      console.log(`DataManager: Endpoint ${endpoint} does not exist or is out of date, adding before returning`)

      //saving the record
      localStorage.setItem('transitstatus_datamanager_v1_endpoints', JSON.stringify(this._endpoints));

      try {
        const res = await fetch(new Request(agencies[endpoint].endpoint, {
          cache: 'reload'
        }));
        const data = await res.json();

        this._data[endpoint] = data;
        this._endpoints[endpoint].lastUpdated = new Date().valueOf();

        //saving data
        localStorage.setItem('transitstatus_datamanager_v1_data', JSON.stringify(this._data));
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