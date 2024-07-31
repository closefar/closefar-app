const last100Years = (function () {
  const years = [];
  const currentYear = new Date().getFullYear();
  for (let i = currentYear; i > currentYear - 100; i--) {
    years.push(i);
  }
  return years;
})();

export default last100Years;
