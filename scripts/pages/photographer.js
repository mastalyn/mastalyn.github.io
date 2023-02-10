
const mediaLikes = {};

async function getPhotographer() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const photographers = await fetch("./data/photographers.json").then(
    (response) => response.json()
  );

  photographers.photographers = photographers.photographers.filter(
    (photographer) => photographer.id == id
  )[0];
  photographers.media = photographers.media.filter(
    (media) => media.photographerId == id
  );

  return photographers;
}

async function init() {
  // Récupère les datas des photographes
  const photographer = await getPhotographer();
  displayData(photographer.photographers);
  displayDataMedia(photographer.media, photographer);
  addEventsListeners();
}

// Fonction qui fait appraitre les photographes
function displayData(photographer) {
  const photographersSection = document.getElementById("photographeInfos");
  const profileModel = photographerFactory(photographer);
  const profiles = profileModel.getPhotographerProfil();
  photographersSection.appendChild(profiles);
}

// Fonction qui fait appraitre les médias
function displayDataMedia(medias, photographer) {
  const mediaslist = document.querySelector(".photographer_media");
  Array.from(medias).forEach((media) => {
    const mediaModel = mediaFactory(media, photographer);
    const displaymedia = mediaModel.getUserMedia();
    mediaslist.appendChild(displaymedia);
  });

  // Affichage du total des likes
  let totalLike = 0;

  const displaylikes = medias.map((media) => {
    totalLike += media.likes;
    document.querySelector("#totalLike").innerHTML = totalLike;
  });
}

// Fonction pour l'affichage des médias dans la lightbox

// Fonction pour le tri des médias
function mediasSort(type) {
  let mediaContainer = document.querySelectorAll(".media_container");
  mediaContainer = [].slice.call(mediaContainer);
  if (type === "title") {
    sortByTitle(mediaContainer);
  } else if (type === "date") {
    sortByDate(mediaContainer);
  } else {
    sortByLike(mediaContainer);
  }

  // Fonction pour l'affichage alphabétique
  function sortByTitle(mediaContainer) {
    mediaContainer.sort(function (a, b) {
      return a.dataset.title.localeCompare(b.dataset.title);
    });
  }

  // Fonction pour l'affichage par popularité
  function sortByLike(mediaContainer) {
    mediaContainer.sort(function (a, b) {
      return b.dataset.likes - a.dataset.likes;
    });
  }

  // Fonction pour l'affichage par date
  function sortByDate(mediaContainer) {
    mediaContainer.sort(function (a, b) {
      return a.dataset.date.localeCompare(b.dataset.date);
    });
  }

  const mediaslist = document.querySelector(".photographer_media");
  mediaslist.innerHTML = "";

  mediaContainer.forEach((media) => {
    mediaslist.append(media);
  });
}
function addEventsListeners() {
  const collection = document.querySelectorAll(".media_likesbuttonimage");
 

  collection.forEach(function (el) {
    el.addEventListener("click", function handleClick() {
      const { id, likes } = el.dataset;
      let count = likes;
      const totalLike = document.getElementById("totalLike");
      let totalCount = parseInt(totalLike.innerText, 10);
      const isLiked = mediaLikes[id];
      console.log(isLiked)
      const likesText =
        el.parentElement.parentElement.querySelector(".media_likes");
      console.log("likesText", likesText);
      if (!isLiked) {
        count++;
        totalCount++;
        mediaLikes[id] = true;
      } else {
        count--;
        totalCount--;
        mediaLikes[id] = false;
      }
      if (likesText) {
        likesText.textContent = count;
      } else {
        console.error("likesText is undefined");
      }
      el.dataset.likes = count;
      totalLike.innerText = totalCount.toString();
    });
  });
}
init();
