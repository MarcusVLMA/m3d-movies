const searchContentWrapper = document.querySelector("div#search-main-wrapper");
const orderBySelect = document.querySelector("select#orderby-select");

window.addEventListener("load", () => {
  let queryParameters = new URLSearchParams(window.location.search);

  if (queryParameters.toString()) {
    const orderByParam = queryParameters.get("orderby");
    if (orderByParam) {
      orderBySelect.value = orderByParam;
    }
  }
});

orderBySelect.addEventListener("change", (event) => {
  const newOrderBy = event.target.value;
  let queryParameters = new URLSearchParams(window.location.search);

  queryParameters.set("orderby", newOrderBy);

  console.log("O TAL DO PATHNAME", window.location.pathname);
  const currentPathname = window.location.pathname;

  window.location.href = `${currentPathname}?${queryParameters.toString()}`;
});
