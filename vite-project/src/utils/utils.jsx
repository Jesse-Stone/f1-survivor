import { groupBy } from 'lodash';

export const toOrdinalSuffix = (num) => {
  const int = parseInt(num),
    digits = [int % 10, int % 100],
    ordinals = ['st', 'nd', 'rd', 'th'],
    oPattern = [1, 2, 3, 4],
    tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19];
  return oPattern.includes(digits[0]) && !tPattern.includes(digits[1])
    ? ordinals[digits[0] - 1]
    : ordinals[3];
};

export const timeStampToDate = (ts) => {
  return ts === undefined
    ? null
    : new Date(ts.seconds * 1000 + ts.nanoseconds / 10000000);
};

export const userPointsArray = (picks, raceResults) => {
  const groupedData = groupBy(picks, (pick) => pick.name);
  const userPoints = {};
  for (let name in groupedData) {
    const racePicks = groupedData[name];
    for (let i = 0; i < racePicks.length; i++) {
      const { driverId, race } = racePicks[i];
      const raceResult = raceResults.find((result) => result.raceName === race);
      if (raceResult) {
        const result = raceResult.Results.find(
          (result) => result.Driver.driverId === driverId
        );
        if (result) {
          if (!userPoints[name]) {
            userPoints[name] = 0;
          }
          userPoints[name] += parseInt(result.points);
        }
      }
    }
  }

  return Object.entries(userPoints)
    .map(([id, points]) => ({
      id,
      points
    }))
    .sort((a, b) => b.points - a.points);
};
