export const formatNumber = (number) => {
    if (isNaN(number)) return "Invalid number";
    return new Intl.NumberFormat("en-US").format(number);
  };