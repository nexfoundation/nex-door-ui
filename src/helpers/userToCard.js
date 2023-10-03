export const userToCard = (u) =>
  u.Attributes.reduce((result, a) => {
    result[a.Name] = a.Value;
    return result;
  }, {})
