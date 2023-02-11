function mediaFactory(mediaData, photographer) {
  let mediaArray = [];
  const { price, likes, image, video, title, date, id } = mediaData;

  const mediaImage = `assets/photographers/medias/${image}`;
  // console.log("mediaImage", mediaImage);
  const mediaVideo = `assets/photographers/medias/${video}`;
  const like = `${likes}`;
  const dates = `${date}`;
  const titles = `${title}`;
  const mediaId = `${id}`;

  mediaArray.push(mediaData);

  let i = 0;

  function getUserMedia() {
    const mediaContainer = document.createElement("div");
    const mediaDescription = document.createElement("p");
    const mediaTitle = document.createElement("h2");
    const mediaLikes = document.createElement("h3");
    const mediaPrice = document.createElement("h4");
    const mediaLikesButton = document.createElement("button");
    const mediaLikesButtonImage = document.createElement("img");
    const icon = `assets/icons/heart.svg`;
    const mediaLikesContainer = document.createElement("div");
    const mediaLink = document.createElement("a");

    mediaContainer.setAttribute("class", "media_container");
    mediaContainer.setAttribute("data-likes", like);
    mediaContainer.setAttribute("data-date", dates);
    mediaContainer.setAttribute("data-title", titles);
    mediaLikesButtonImage.dataset.id = mediaId;

    // Pop method for media
    // In MP4 case
    if (mediaVideo.split(".").pop() == "mp4") {
      const video = document.createElement("video");
      video.setAttribute("controls", "");
      video.setAttribute("class", "media_image");
      video.setAttribute("src", mediaVideo);
      const source = document.createElement("source");
      source.setAttribute("src", mediaVideo);
      source.setAttribute("type", "video/mp4");

      mediaContainer.append(mediaLink, video, mediaDescription);
      video.appendChild(source);
      mediaLink.append(video);
    }
    // In JPG case
    if (mediaImage.split(".").pop() == "jpg") {
      const image = document.createElement("img");
      image.setAttribute("class", "media_image");
      image.setAttribute("src", mediaImage);
      image.setAttribute("mediaId", mediaId);

      mediaContainer.append(mediaLink, image, mediaDescription);
      mediaLink.append(image);
    }

    // Lightbox
    const lightbox = document.getElementById("lightbox");
    const mediaLightbox = document.createElement("div");
    const closeBtn = document.querySelector("#close");
    const mediaImg = document.createElement("img");
    const mediaVid = document.createElement("video");

    if (!mediaImage.includes("undefined")) {
      mediaImg.setAttribute("src", mediaImage);
    } else {
      mediaVid.setAttribute("src", mediaVideo);
    }
    mediaImg.setAttribute("class", "medias");
    mediaImg.setAttribute("mediaId", mediaId);
    mediaImg.setAttribute("id", "lightboxMedia");

    mediaLightbox.setAttribute("id", "mediaLightbox");

    mediaLink.onclick = function () {
      if (!mediaImage.includes("undefined")) {
        openLightbox(mediaImg);
      } else {
        openLightbox(mediaVid);
      }
    };

    closeBtn.onclick = function () {
      closeLightbox();
    };

    function openLightbox(media) {
      lightbox.style.display = "block";
      const lightboxImg = document.getElementById("lightboxMedia");
      const lightboxVideo = document.getElementById("lightboxVideo");
      if (media.tagName === "IMG") {
        if (lightboxVideo) {
          lightboxVideo.style.display = "none";
        }
        if (lightboxImg) {
          lightboxImg.style.display = "block";
          lightboxImg.src = media.src;
          lightboxImg.setAttribute("mediaid", media.getAttribute("mediaid"));
        } else {
          lightbox.append(media);
        }
      } else {
        console.log("video", media);
        lightboxImg.style.display = "none";
        if (lightboxVideo) {
          lightboxVideo.style.display = "block";
          lightboxVideo.src = media.src;
        } else {
          media.id = "lightboxVideo";
          media.setAttribute("controls", "");
          lightbox.append(media);
        }
      }
      lightbox.setAttribute("mediaId", media.getAttribute("mediaid"));
    }

    function closeLightbox() {
      lightbox.style.display = "none";
      // lightbox.innerHTML = "";
    }

   /* const previousBtn = document.querySelector(".gauche");
    /*const nextBtn = document.querySelector(".droite");

    nextBtn.addEventListener("click", function () {
      nextMedia(true);
    });*/

    // Arrow event
    document.onkeyup = function (event) {
      if (event.key === "ArrowLeft") {
        previousMedia(true);
      } else if (event.key === "ArrowRight") {
        nextMedia(true);
      }
    };

    // left arrow event : previous media onclick
    function previousMedia(internalCall = false) {
      if (internalCall) {
        const media = document
          .querySelector("#lightbox")
          .querySelector("#lightboxMedia");
        const actualMediaIndex = photographer.media.findIndex(
          ({ id }) => id == media.getAttribute("mediaId")
          //
        );

        let previousMediaIndex = actualMediaIndex - 1;

        if (previousMediaIndex > photographer.media.length) {
          previousMediaIndex = 0;
          media.src =
            "assets/photographers/medias/" + photographer.media[0].image;
          media.setAttribute("mediaid", photographer.media[0].id);
        } else {
          media.src =
            "assets/photographers/medias/" +
            photographer.media[previousMediaIndex].image;
          media.setAttribute(
            "mediaid",
            photographer.media[previousMediaIndex].id
          );
        }
      } else {
        previousBtn.onclick = () => {
          const media = document
            .parentElement("#lightbox")
            .querySelector("#lightboxMedia");
          const actualMediaIndex = photographer.media.findIndex(
            ({ id }) => id == media.getAttribute("mediaId")
            //
          );

          let previousMediaIndex = actualMediaIndex - 1;

          if (previousMediaIndex > photographer.media.length) {
            previousMediaIndex = 0;
            media.src =
              "assets/photographers/medias/" + photographer.media[0].image;
            media.setAttribute("mediaid", photographer.media[0].id);
          } else {
            media.src =
              "assets/photographers/medias/" +
              photographer.media[previousMediaIndex].image;
            media.setAttribute(
              "mediaid",
              photographer.media[previousMediaIndex].id
            );
          }
        };
      }
    }

    function nextMedia(internalCall = false) {
      // console.log("internal call", internalCall);
      // if (internalCall) {
      const media = document
        .querySelector("#lightbox")
        .querySelector("#lightboxMedia");
      const actualMediaIndex = photographer.media.findIndex(
        ({ id }) => id == media.getAttribute("mediaId")
        //
      );
      console.log(
        "actualMediaIndex",
        actualMediaIndex,
        " for ",
        media.getAttribute("mediaId")
      );
      let nextMediaIndex = actualMediaIndex + 1;

      if (nextMediaIndex > photographer.media.length) {
        nextMediaIndex = 0;
        media.src =
          "assets/photographers/medias/" + photographer.media[0].image;
        media.setAttribute("mediaid", photographer.media[0].id);
      } else {
        media.src =
          "assets/photographers/medias/" +
          photographer.media[nextMediaIndex].image;
        media.setAttribute("mediaid", photographer.media[nextMediaIndex].id);
      }
      
    }

    // listen to the keyboard keys on the lightbox
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeLightbox();
      }
    });

    mediaDescription.setAttribute("class", "media_description");
    mediaTitle.setAttribute("class", "media_title");
    mediaTitle.textContent = `${title}`;
    mediaLikesContainer.setAttribute("class", "media_likescontainer");
    mediaLikes.setAttribute("class", "media_likes");
    mediaLikes.textContent = `${likes}`;
    mediaLikesButton.setAttribute("class", "media_likesbutton");
    mediaLikesButton.setAttribute("type", "button");
    mediaLikesButtonImage.setAttribute("class", "media_likesbuttonimage");
    mediaLikesButtonImage.setAttribute("src", icon);
    mediaLikesButtonImage.dataset.likes = likes;
    mediaPrice.setAttribute("class", "media_price");
    mediaPrice.textContent = `${price}€/jour`;

    mediaDescription.append(mediaTitle, mediaLikes, mediaLikesContainer);
    mediaLikesContainer.append(
      mediaLikes,
      mediaLikesButton,
      mediaLikesButtonImage
    );
    mediaLikesButton.appendChild(mediaLikesButtonImage);

    

    return mediaContainer;
  }

  return {
    getUserMedia,
  };
}
