export const AddBrString = name => {
  const parenthesisIdx = name.indexOf('(');
  return `${name.slice(0, parenthesisIdx)} <br> ${name.slice(parenthesisIdx)}`;
}