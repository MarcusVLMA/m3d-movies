const title = document.querySelector("input#title");
const spanTitle = document.querySelector("span#title-erro");
const genre = document.querySelector("select#genre");
const spanGenre = document.querySelector("span#genre-erro");
const filme = document.querySelector("input#filme");
const serie = document.querySelector("input#serie");
const animacao = document.querySelector("input#animacao");
const spanType = document.querySelector("span#type-erro");
const description = document.querySelector("textarea#description");
const spanDescription = document.querySelector("span#description-erro");
const time = document.querySelector("input#running-time");
const spanTime = document.querySelector("span#time-erro");
const date = document.querySelector("input#release-date");
const spanDate = document.querySelector("span#date-erro");
const trailer = document.querySelector("input#trailer-path");
const spanTrailer = document.querySelector("span#trailer-erro");
const poster = document.querySelector("input#poster-path");
const spanPoster = document.querySelector("span#poster-erro");
const backdrop = document.querySelector("input#backdrop-path");
const spanBackdrop = document.querySelector("span#backdrop-erro");
const titleForm = document.querySelector("form#titleForm");
const rejBtn = document.querySelector("button#rejBtn");
const loadRej = document.querySelector("img#loadRejIcon");
const btnRejText = document.querySelector("span#btnRejText");
const accBtn = document.querySelector("button#accBtn");
const loadAcc = document.querySelector("img#loadAccIcon");
const btnAccText = document.querySelector("span#btnAccText");
const subBtn = document.querySelector("button#subBtn");
const loadSub = document.querySelector("img#loadSubIcon");
const btnSubText = document.querySelector("span#btnSubText");
const alertSuccess = document.querySelector("div#alertSuccess");
const btnModal = document.querySelector("button#btnModal");
const notificationModal = document.querySelector("div#notificationModal");
const modalWrapper = document.querySelector("div.modal-wrapper");
const modalText = document.querySelector("p.modal-text");

if(rejBtn && accBtn) {
  const pathSplited = window.location.pathname.split('/');
  const id = pathSplited[pathSplited.length - 1];
  
  rejBtn.addEventListener("click", () => {
    window.location.pathname.split('/')
    titleForm.action = `reject/${id}`;
  });
  accBtn.addEventListener("click", () => {
    titleForm.action = `accept/${id}`;
  });
}

// Enviar o formulario de forma assincrona
titleForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = new URLSearchParams(new FormData(titleForm));
  blockTitleForm(true);
  let fetchParam = {};

  if(titleForm.action.includes("reject")){
    fetchParam = {
      method: "DELETE",
    };
  }
  else if(titleForm.action.includes("accept")){
    fetchParam = {
      method: "PUT",
      body: data,
    };
  }
  else {
    fetchParam = {
      method: "POST",
      body: data,
    };
  }

  fetch(titleForm.action, fetchParam)
  .then(response => {
    return response.json();
  })
  .then(jsonResponse => {
    const erros = jsonResponse.erros;
    if (erros !== undefined) {
      if (erros.id !== undefined) {
        window.location.href = "admin/requests";
      }
      spanTitle.innerHTML = erros.title !== undefined ? erros.title: "";
      spanGenre.innerHTML = erros.genre !== undefined ? erros.genre: "";
      spanType.innerHTML = erros.content_type !== undefined ? erros.content_type: "";
      spanDescription.innerHTML = erros.description !== undefined ? erros.description: "";
      spanTime.innerHTML = erros.running_time !== undefined ? erros.running_time: "";
      spanDate.innerHTML = erros.release_date !== undefined ? erros.release_date: "";
      spanTrailer.innerHTML = erros.trailer_path !== undefined ? erros.trailer_path: "";
      spanPoster.innerHTML = erros.poster_path !== undefined ? erros.poster_path: "";
      spanBackdrop.innerHTML = erros.backdrop_path !== undefined ? erros.backdrop_path: "";
      blockTitleForm(false);
    }
    else {
      // Reseta o formulario
      titleForm.reset();
      if(rejBtn && accBtn) {
        notificationModal.style.display = "block";
        if (titleForm.action.includes("reject")){
          modalText.innerHTML = "Sugestão de título rejeitada!";
        }
        else {
          modalText.innerHTML = "Sugestão de título aceita!"
        }
        
        window.setTimeout(() => {
          modalWrapper.style.maxHeight = "300px";
        },300);
      }
      else {
        // Notificação de sucesso
        alertSuccess.style.visibility = 'visible';
        alertSuccess.style.maxHeight = '40px';
        // Remove a Notificação de sucesso
        window.setTimeout(() => {
          alertSuccess.style.maxHeight = '0';
          alertSuccess.style.visibility = 'hidden';
        },5000);
        blockTitleForm(false);
      }
    }
  })
  .catch(() => {
    blockTitleForm(false);
    spanTitle.innerHTML = 'Erro de conexão!';
  });
});

function blockTitleForm(blocked) {
  if(rejBtn && accBtn) {
    if (titleForm.action.includes("reject")) {
      loadRej.style.width = blocked ? "auto" : 0;
      loadRej.style.height = blocked ? "auto" : 0;
      loadRej.style.visibility = blocked ? "visible" : 'hidden';
      btnRejText.innerHTML = blocked ? "" : "Recusar";
    }
    else {
      loadAcc.style.width = blocked ? "auto" : 0;
      loadAcc.style.height = blocked ? "auto" : 0;
      loadAcc.style.visibility = blocked ? "visible" : 'hidden';
      btnAccText.innerHTML = blocked ? "" : "Aceitar";
    }
  } else {
    loadSub.style.width = blocked ? "auto" : 0;
    loadSub.style.height = blocked ? "auto" : 0;
    loadSub.style.visibility = blocked ? "visible" : 'hidden';
    btnSubText.innerHTML = blocked ? "" : "Enviar";
  }
  title.disabled = blocked;
  genre.disabled = blocked;
  filme.disabled = blocked;
  serie.disabled = blocked;
  animacao.disabled = blocked;
  description.disabled = blocked;
  time.disabled = blocked;
  date.disabled = blocked;
  trailer.disabled = blocked;
  poster.disabled = blocked;
  backdrop.disabled = blocked;
}

// Remove as mensagens de erro
title.addEventListener('focus', () => {
  spanTitle.innerHTML = '';
});
genre.addEventListener('focus', () => {
  spanGenre.innerHTML = '';
});
filme.addEventListener('focus', () => {
  spanType.innerHTML = '';
});
serie.addEventListener('focus', () => {
  spanType.innerHTML = '';
});
animacao.addEventListener('focus', () => {
  spanType.innerHTML = '';
});
description.addEventListener('focus', () => {
  spanDescription.innerHTML = '';
});
time.addEventListener('focus', () => {
  spanTime.innerHTML = '';
});
date.addEventListener('focus', () => {
  spanDate.innerHTML = '';
});
trailer.addEventListener('focus', () => {
  spanTrailer.innerHTML = '';
});
poster.addEventListener('focus', () => {
  spanPoster.innerHTML = '';
});
backdrop.addEventListener('focus', () => {
  spanBackdrop.innerHTML = '';
});

// Modal
btnModal.addEventListener("click", () => {
  window.location.href = "/admin/requests";
})