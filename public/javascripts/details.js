const notificationModal = document.querySelector("div#notificationModal");
const modalText = document.querySelector("p#modal-text");
const modalWrapper = document.querySelector("div.modal-wrapper");

{
  /* <div
          id="details-actions-button"
          class="details-actions-button"
          onclick="addTitleToUserGallery(<%= id %>)"
        >
          <i id="details-actions-button-icon" class="fas fa-list"></i>
          <div
            id="details-actions-button-tooltip-gallery"
            class="details-actions-button-tooltip-gallery"
          >
            Adicionar à galeria
          </div>
        </div> */
}

function addTitleToUserGallery(titleId) {
  fetch("/user/add/gallery", {
    method: "POST",
    body: JSON.stringify({ titleId: titleId.toString() }),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then(() => {
      modalText.innerHTML = "Título adicionado com sucesso!";
      notificationModal.style.display = "block";
      window.setTimeout(() => {
        modalWrapper.style.maxHeight = "300px";

        window.setTimeout(() => {
          notificationModal.style.display = "none";

          const detailsActionsButton = document.querySelector(
            "div#details-actions-button"
          );
          const detailsActionsButtonIcon = document.querySelector(
            "i#details-actions-button-icon"
          );
          const detailsActionsButtonTooltip = document.querySelector(
            "div#details-actions-button-tooltip-gallery"
          );

          detailsActionsButton.setAttribute("onclick", () =>
            removeTitleFromUserGallery(titleId)
          );
          detailsActionsButtonIcon.className = "fas fa-times";
          detailsActionsButtonTooltip.innerHTML = "Remover da galeria";
        }, 2200);
      }, 50);
    });
}

function removeTitleFromUserGallery(titleId) {
  fetch("/user/remove/gallery", {
    method: "POST",
    body: JSON.stringify({ titleId: titleId.toString() }),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then(() => {
      modalText.innerHTML = "Título removido com sucesso!";
      notificationModal.style.display = "block";

      window.setTimeout(() => {
        modalWrapper.style.maxHeight = "300px";

        window.setTimeout(() => {
          notificationModal.style.display = "none";

          const detailsActionsButton = document.querySelector(
            "div#details-actions-button"
          );
          const detailsActionsButtonIcon = document.querySelector(
            "i#details-actions-button-icon"
          );
          const detailsActionsButtonTooltip = document.querySelector(
            "div#details-actions-button-tooltip-gallery"
          );

          detailsActionsButton.setAttribute("onclick", () =>
            addTitleToUserGallery(titleId)
          );
          detailsActionsButtonIcon.className = "fas fa-list";
          detailsActionsButtonTooltip.innerHTML = "Adicionar à galeria";
        }, 2200);
      }, 50);
    });
}
