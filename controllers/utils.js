exports.formatSearchParamsToView = (searchParams) => {
  const properties = Object.keys(searchParams);

  let finalString = "";
  for (let i = 0; i < properties.length; i++) {
    const property = properties[i];
    const value = searchParams[property];

    if (property !== "status") {
      // "Status" é uma propriedade de busca interna e não é bom expor
      if (!finalString) {
        finalString = finalString.concat(`?${property}=${value}`);
      } else {
        finalString = finalString.concat(`&${property}=${value}`);
      }
    }
  }

  return finalString;
};
