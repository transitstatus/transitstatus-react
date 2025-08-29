import { useEffect, useState } from "react";
import HeartSVG from "./heartSVG";

const StationHeart = ({ agency, station, style }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const favID = `${agency}-${station.stationID}`;

  useEffect(() => {
    const favorites =
      JSON.parse(localStorage.getItem("favorites-transitstatus-v0")) || {};

    if (favorites[favID]) {
      setIsFavorite(true);
    }
  }, [agency, station.stationID]);

  const addFavorite = () => {
    console.log(`Adding ${favID} to favorites`);
    const favorites =
      JSON.parse(localStorage.getItem("favorites-transitstatus-v0")) || {};
    favorites[favID] = station;
    localStorage.setItem(
      "favorites-transitstatus-v0",
      JSON.stringify(favorites)
    );

    setIsFavorite(true);

    console.log("New Favorites: ", favorites);
  };

  const removeFavorite = () => {
    console.log(`Removing ${favID} from favorites`);
    const favorites =
      JSON.parse(localStorage.getItem("favorites-transitstatus-v0")) || {};
    delete favorites[favID];
    localStorage.setItem(
      "favorites-transitstatus-v0",
      JSON.stringify(favorites)
    );

    setIsFavorite(false);

    console.log("New Favorites: ", favorites);
  };

  return isFavorite ? (
    <HeartSVG
      onClick={() => removeFavorite()}
      style={{ marginTop: '8px' }}
      filledIn={true}
    />
  ) : (
    <HeartSVG
      onClick={() => addFavorite()}
      style={{ marginTop: '8px' }}
      filledIn={false}
    />
  );
};

export default StationHeart;
