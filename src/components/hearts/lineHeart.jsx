import { useEffect, useState } from "react";
import HeartSVG from "./heartSVG";

const LineHeart = ({ agency, line, style }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const favID = `${agency}-${line.lineCode}`;

  useEffect(() => {
    const favorites =
      JSON.parse(localStorage.getItem("favorites-transitstatus-v1-lines")) || {};

    if (favorites[favID]) {
      setIsFavorite(true);
    }
  }, [agency, line.lineCode]);

  const addFavorite = () => {
    console.log(`Adding ${favID} to favorites`);
    const favorites =
      JSON.parse(localStorage.getItem("favorites-transitstatus-v1-lines")) || {};
    favorites[favID] = line;
    localStorage.setItem(
      "favorites-transitstatus-v1-lines",
      JSON.stringify(favorites)
    );

    setIsFavorite(true);

    console.log("New Favorites: ", favorites);
  };

  const removeFavorite = () => {
    console.log(`Removing ${favID} from favorites`);
    const favorites =
      JSON.parse(localStorage.getItem("favorites-transitstatus-v1-lines")) || {};
    delete favorites[favID];
    localStorage.setItem(
      "favorites-transitstatus-v1-lines",
      JSON.stringify(favorites)
    );

    setIsFavorite(false);

    console.log("New Favorites: ", favorites);
  };

  return isFavorite ? (
    <HeartSVG
      onClick={() => removeFavorite()}
      filledIn={true}
    />
  ) : (
    <HeartSVG
      onClick={() => addFavorite()}
      filledIn={false}
    />
  );
};

export default LineHeart;
