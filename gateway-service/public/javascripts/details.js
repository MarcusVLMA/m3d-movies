const notificationModal = document.querySelector("div#notificationModal");
const modalText = document.querySelector("p#modal-text");
const modalWrapper = document.querySelector("div.modal-wrapper");

const allCommentsContainer = document.querySelector("div.comments");
const commentForm = document.querySelector("form#new-comment-form");
const commentText = document.querySelector("textarea#new-comment");

const deleteCommentaryIcon = document.querySelector("i#delete-commentary-icon");

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
          function removeTitle() {
            removeTitleFromUserGallery(titleId);
          }
          detailsActionsButton.onclick = removeTitle;
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
          function addTitle() {
            addTitleToUserGallery(titleId);
          }
          detailsActionsButton.onclick = addTitle;
          detailsActionsButtonIcon.className = "fas fa-list";
          detailsActionsButtonTooltip.innerHTML = "Adicionar à galeria";
        }, 2200);
      }, 50);
    });
}

commentForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const titleId = window.location.href.split("/").pop();
  const text = commentText.value;

  fetch("/title/commentary", {
    method: "POST",
    body: JSON.stringify({ titleId: titleId.toString(), text }),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((jsonResponse) => {
      const noCommentsParagraph = document.querySelector("p#no-comments-added-text");
      if(noCommentsParagraph) {
        noCommentsParagraph.innerHTML = ""
      }
      document.querySelector("textarea#new-comment").value = "";

      const commentContainer = document.createElement("div");
      const commentContent = document.createElement("div");
      const username = document.createElement("h3");
      const date = document.createElement("span");
      const commentText = document.createElement("p");

      commentContainer.className = "comment-container";
      commentContent.className = "comment-content";

      username.innerHTML = jsonResponse.user.name;
      date.innerHTML = jsonResponse.commentary.date;
      commentText.innerHTML = jsonResponse.commentary.text;

      commentContent.appendChild(username);
      commentContent.appendChild(date);
      commentContent.appendChild(commentText);

      commentContainer.appendChild(commentContent);

      allCommentsContainer.appendChild(commentContainer);
    });
});

function removeCommentary(commentaryId) {
  fetch(`/title/commentary/${commentaryId}`, {
    method: "DELETE",
    body: JSON.stringify({ commentaryId: commentaryId.toString() }),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then(() => {
      modalText.innerHTML = "Comentário removido com sucesso!";
      notificationModal.style.display = "block";
      window.setTimeout(() => {
        modalWrapper.style.maxHeight = "300px";

        window.setTimeout(() => {
          notificationModal.style.display = "none";
          window.location.reload();
        }, 2000);
      }, 50);
    });
}
