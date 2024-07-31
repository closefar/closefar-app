export const extractPanic = (err: string) => {
  const error = new String(err);

  let startIndex = error.indexOf("panic(");
  if (startIndex === -1) return "an error ocurred";
  startIndex = error.indexOf(`"`, startIndex);

  const endIndex = error.indexOf(`"`, startIndex + 1);

  return error.slice(startIndex + 1, endIndex);
};
