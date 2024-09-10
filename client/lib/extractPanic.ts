export const extractPanic = (err: string | String) => {
  let startIndex = err.indexOf("panic(");
  startIndex = err.indexOf(`"`, startIndex);

  const endIndex = err.indexOf(`"`, startIndex + 1);

  return err.slice(startIndex + 1, endIndex);
};
