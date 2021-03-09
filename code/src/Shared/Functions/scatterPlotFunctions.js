export const createScatterPlot = (yAxis, arr, x, i) => {
  const obj = {};
  obj.x = x;
  obj.y = yAxis[i];
  arr.push(obj);
};
