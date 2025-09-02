export const sanitizeValues = <T>(values: (string | T)[]): (string | T)[] => {
  return values.map((value) => (typeof value === "string" ? value.trim() : value));
};
