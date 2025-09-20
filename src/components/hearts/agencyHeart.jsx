import { useEffect, useState } from "react";
import HeartSVG from "./heartSVG";
import { agencies } from "../../config";

const AgencyHeart = ({ agency, style }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const favID = agency;

  useEffect(() => {
    const favorites =
      JSON.parse(localStorage.getItem("favorites-transitstatus-v1-agencies")) ||
      {};

    if (favorites[favID]) {
      setIsFavorite(true);
    }
  }, [agency]);

  const addFavorite = () => {
    console.log(`Adding ${favID} to favorites`);
    const favorites =
      JSON.parse(localStorage.getItem("favorites-transitstatus-v1-agencies")) ||
      {};
    favorites[favID] = agency;
    localStorage.setItem(
      "favorites-transitstatus-v1-agencies",
      JSON.stringify(favorites)
    );

    setIsFavorite(true);

    console.log("New Favorites: ", favorites);
  };

  const removeFavorite = () => {
    console.log(`Removing ${favID} from favorites`);
    const favorites =
      JSON.parse(localStorage.getItem("favorites-transitstatus-v1-agencies")) ||
      {};
    delete favorites[favID];
    localStorage.setItem(
      "favorites-transitstatus-v1-agencies",
      JSON.stringify(favorites)
    );

    setIsFavorite(false);

    console.log("New Favorites: ", favorites);
  };

  return isFavorite ? (
    <HeartSVG
      onClick={() => removeFavorite()}
      filledIn={true}
      strokeColor={style.color ?? agencies[favID].textColor}
    />
  ) : (
    <HeartSVG
      onClick={() => addFavorite()}
      filledIn={false}
      strokeColor={style.color ?? agencies[favID].textColor}
    />
  );
};

export default AgencyHeart;
