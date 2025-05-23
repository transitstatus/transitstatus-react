class FavoritesHandlerV0 {
  constructor() {
    this.favorites = {};

    if (!localStorage['favorites-transitstatus-v0']) {
      localStorage['favorites-transitstatus-v0'] = JSON.stringify({});
    }

    this.favorites = JSON.parse(localStorage['favorites-transitstatus-v0']);
    console.log('FavoritesHandler initialized')
  }

  addFavorite(favorite, operator) {
    const favID = `${operator}-${favorite.stationID}`;

    this.favorites[favID] = favorite;
    localStorage['favorites-transitstatus-v0'] = JSON.stringify(this.favorites);
    console.log(`Favorite ${favID} added`)
  }

  removeFavorite(favorite, operator) {
    const favID = `${operator}-${favorite.stationID}`;

    delete this.favorites[favID];
    localStorage['favorites-transitstatus-v0'] = JSON.stringify(this.favorites);
    console.log(`Favorite ${favID} removed`)
  }

  getFavorites() {
    console.log('Returning all favorites')
    return this.favorites;
  }

  getFavorite(favorite, operator) {
    const favID = `${operator}-${favorite.stationID}`;

    console.log(`Returning favorite ${favID}`)
    return this.favorites[favID];
  }

  getFavoriteKeys() {
    console.log('Returning all favorite keys')
    return Object.keys(this.favorites);
  }

  isFavorite(favorite, operator) {
    const favID = `${operator}-${favorite.stationID}`;

    console.log(`Checking if ${favID} is a favorite`)
    return this.favorites[favID] != undefined;
  }
}

class FavoritesHandlerV1 {
  constructor() {
    this.favorites = {};

    if (!localStorage['favorites-transitstatus-v1']) {
      localStorage['favorites-transitstatus-v1'] = JSON.stringify({
        stations: {},
        agencies: {},
        lines: {},
      });
    }

    this.favorites = JSON.parse(localStorage['favorites-transitstatus-v1']);
    console.log('FavoritesHandler initialized')
  }

  addFavoriteStation(favorite, operator) {
    const favID = `${operator}-${favorite.stationID}`;

    this.favorites.stations[favID] = favorite;
    localStorage['favorites-transitstatus-v0'] = JSON.stringify(this.favorites);
    console.log(`Favorite ${favID} added`)
  }

  removeFavoriteStation(favorite, operator) {
    const favID = `${operator}-${favorite.stationID}`;

    delete this.favorites[favID];
    localStorage['favorites-transitstatus-v1'] = JSON.stringify(this.favorites);
    console.log(`Favorite ${favID} removed`)
  }

  getFavorites() {
    console.log('Returning all favorites')
    return this.favorites;
  }

  getFavorite(favorite, operator) {
    const favID = `${operator}-${favorite.stationID}`;

    console.log(`Returning favorite ${favID}`)
    return this.favorites[favID];
  }

  getFavoriteKeys() {
    console.log('Returning all favorite keys')
    return Object.keys(this.favorites);
  }

  isFavorite(favorite, operator) {
    const favID = `${operator}-${favorite.stationID}`;

    console.log(`Checking if ${favID} is a favorite`)
    return this.favorites[favID] != undefined;
  }
};

export default FavoritesHandlerV0;