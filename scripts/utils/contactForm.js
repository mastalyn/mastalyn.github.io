const form = document.querySelector("form");
const main = document.querySelector(".main");
const modalBg = document.getElementById("contact_modal");
const inputs = document.querySelectorAll(
  'input[type="text"], input[type="email"]'
);

let first, last, email, textarea;

console.log(inputs);

const addGlobalEventListener = (type, selector, callback, options) => {
  document.addEventListener(
    type,
    (event) => {
      if (event.target.matches(selector)) callback(event);
    },
    options
  );
};

addGlobalEventListener("click", "#displayModal", (event) => {
  console.log("Clicked Button");
  displayModal(event);
});

function displayModal() {
  modalBg.style.display = "block";
}

// Gestion des messages d'erreurs
const errorDisplay = (tag, message, valid) => {
  const container = document.querySelector("." + tag + "-container");
  const span = document.querySelector("." + tag + "-container > span");

  if (!valid) {
    container.classList.add("error");
    span.textContent = message;
  } else {
    container.classList.remove("error");
    span.textContent = message;
  }
};

// Vérification des inputs
const firstChecker = (value) => {
  console.log(value);
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay("first", "Le pseudo doit faire entre 3 et 20 caractères");
  } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
    errorDisplay(
      "first",
      "Le prénom ne doit pas contenir de caractères spéciaux"
    );
   
  } else {
    errorDisplay("first", "", true);
    first = value;
  }
};

const lastChecker = (value) => {
  console.log(value);
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay("last", "Le pseudo doit faire entre 3 et 20 caractères");
    
  } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
    errorDisplay("last", "Le nom ne doit pas contenir de caractères spéciaux");
    
  } else {
    errorDisplay("last", "", true);
    last = value;
  }
};

const emailChecker = (value) => {
  console.log(value);
  if (!value.match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/)) {
    errorDisplay("email", "Le mail n'est pas valide");
    email = null;
  } else {
    errorDisplay("email", "", true);
    email = true;
  }
};

const textareaChecker = (value) => {
  console.log(value);
  if (value.length === 0) {
    errorDisplay("textarea", "Le message ne peut pas être vide");
    textarea = null;
  } else {
    errorDisplay("textarea", "", true);
    textarea = value;
  }
};

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "first":
        firstChecker(e.target.value);
        break;
      case "last":
        lastChecker(e.target.value);
        break;
      case "email":
        emailChecker(e.target.value);
        break;
      case "textarea":
        textareaChecker(e.target.value);
        break;
      default:return;
        
    }
  });
});

// Fonction pour vérifier l'envoi du formulaire
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("test");
  if (first && last && email && textarea) {
    const data = {
      first,
      last,
      email,
      textarea,
    };
    console.log(data);

    inputs.forEach((input) => (input.value = ""));

    first = null;
    last = null;
    email = null;
    main.style.display = "block";
    closeModal()
    
  } else {
    
    alert("Veuillez remplir correctement les champs");
  }

 
});

function closeModal() {
  modalBg.style.display = "none";
}

// Clavier
modalBg.onkeydown = function (event) {
  if (event.key === "Escape") closeModal();
};


