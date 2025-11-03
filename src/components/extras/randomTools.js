export const hoursMinutesUntilArrival = (arrivalTime) => {
  const now = new Date();
  const arrival = new Date(arrivalTime);

  const minutes = Math.floor((arrival - now) / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  let finalString = '';

  if (minutes < 1 && hours < 1) return 'Due';
  if (days > 0) finalString += `${days}d `;
  if (hours % 24 > 0 || days > 0) finalString += `${hours % 24}h `;
  if (minutes % 60 > 0 || days > 0) finalString += `${minutes % 60}m`;

  return finalString.trim();
};

const calculateDistance = (point1, point2) => {
  const dx = point1[0] - point2[0];
  const dy = point1[1] - point2[1];
  return Math.sqrt(dx * dx + dy * dy);
};

export const sortFeaturesByClosestToPoint = (targetPoint, features) => {
  console.log(targetPoint)
  console.log(features)
  return features.sort((featureA, featureB) => {
    console.log([featureA.properties.lon, featureA.properties.lat], [featureB.properties.lat, featureB.properties.lon])
    const distanceA = calculateDistance([featureA.properties.lon, featureA.properties.lat], targetPoint);
    const distanceB = calculateDistance([featureB.properties.lat, featureB.properties.lon], targetPoint);
    return distanceB - distanceA;
  });
};