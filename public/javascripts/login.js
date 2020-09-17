
const btnEntrar = document.querySelector('button#btn-entrar');
if (btnEntrar) {
  // Abre menu de login
  btnEntrar.addEventListener('click', () => {
    document.querySelector('div#loginForm-wrapper').style.display = 'block';
  });

  // Fecha menu de login
  document.addEventListener('click', (e) => {
    const loginWrapper = document.querySelector('div#loginForm-wrapper');
    if (!loginWrapper.contains(e.target) && !btnEntrar.contains(e.target)){
      loginWrapper.style.display = 'none';
    }
  });


  const loginErroLabel = document.querySelector("label#login-erro");
  loginErroLabel.addEventListener('blur', () => {
    loginErroLabel.innerHTML = "";
  });

  const loginForm = document.querySelector('form#form-login');
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new URLSearchParams(new FormData(loginForm));
    blockLoginPopup(true);

    fetch("/user/sigin", {
      method: "POST",
      body: data,
    })
    .then(response => {
      if(!response.ok) {
        // Desbloqueia o popup de login
        blockLoginPopup(false);
        loginErroLabel.innerHTML = "E-mail ou senha incorreto";
      }
      return response.json();
    })
    .then(jsonResponse => {
      if (jsonResponse.status === "ok"){
        window.location.reload(true);
      }
      else{
        blockLoginPopup(false);
      }
    })
    .catch(() => {
      // Desbloqueia o popup de login
      blockLoginPopup(false);
      loginErroLabel.innerHTML = "Erro de conexão!";
    });
  });

  function blockLoginPopup(blocked) {
    const loadLogin = document.querySelector("img#loadLoginIcon");
    loadLogin.style.width = blocked ? "auto" : 0;
    loadLogin.style.height = blocked ? "auto" : 0;
    loadLogin.style.visibility = blocked ? "visible" : 'hidden';
    document.querySelector("span#btnLoginText").innerHTML = blocked ? "" : "Entrar";
    document.querySelector("button#loginBtn").disabled = blocked;
    document.querySelector("input#loginEmail").disabled = blocked;
    document.querySelector("input#loginPassword").disabled = blocked;
  }
}