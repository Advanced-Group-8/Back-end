export const getMaxTempAllowed = (): number => {
  const options = [6, 7, 8];
  return options[Math.floor(Math.random() * options.length)];
};

export const getMaxHumidityAllowed = (): number => {
  const options = [0.4, 0.45, 0.5];
  return options[Math.floor(Math.random() * options.length)];
};
