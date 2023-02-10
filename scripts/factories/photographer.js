function photographerFactory(data) {
  const { name, portrait, city, country, id, price, tagline } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const h3 = document.createElement("h3");
    const h4 = document.createElement("h4");
    const h5 = document.createElement("h5");
    const link = document.createElement("a");

    img.setAttribute("src", picture);

    h2.textContent = `${name}`;

    h3.textContent = `${city}, ${country}`;

    h4.textContent = `${tagline}`;

    h5.textContent = `${price}€/jour`;

    link.setAttribute("aria-label", `${name}`);
    link.setAttribute("href", `photographer.html?id=${id}`);

    link.appendChild(article);

    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(h3);
    article.appendChild(h4);
    article.appendChild(h5);

    return article, link;
  }

  function getPhotographerProfil() {
    const identity = document.createElement("article");
    const div = document.createElement("div");
    const nom = document.createElement("h2");
    const location = document.createElement("h3");
    const tag = document.createElement("h4");
    const image = document.createElement("img");
    const icon = "assets/icons/heart.png";
    const modalButton = document.createElement("button");

    // Encart likes + prix des pages photographes.
    const photographer_footer = document.createElement("div");
    photographer_footer.setAttribute("class", "photographer_footer");

    const photographer_footer_likes = document.createElement("div");
    photographer_footer_likes.setAttribute(
      "class",
      "photographer_footer_likes"
    );
    photographer_footer_likes.setAttribute("id", "totalLike");

    const photographer_footer_icon = document.createElement("img");
    photographer_footer_icon.setAttribute("src", icon);   
    photographer_footer_icon.setAttribute("alt", "heart icon");
    photographer_footer_icon.setAttribute("class", "photographer_footer_icon");

    const photographer_footer_price = document.createElement("p");
    photographer_footer_price.textContent = `${price}€ / jour`;
    photographer_footer_price.setAttribute(
      "class",
      "photographerPrice--profile photographer_footer_price"
    );
    photographer_footer_price.setAttribute("lang", "fr");

    identity.setAttribute("class", "photographer_header");

    div.setAttribute("class", "photographer_identity");

    nom.setAttribute("class", "photographer_name");
    nom.textContent = `${name}`;

    image.setAttribute("class", "photographer_picture");
    image.setAttribute("alt", `${name}`);
    image.setAttribute("src", `assets/photographers/${portrait}`);

    location.setAttribute("class", "photographer_location");
    location.textContent = `${city}, ${country}`;

    tag.setAttribute("class", "photographer_tag");
    tag.textContent = tagline;

    modalButton.setAttribute("class", "photographer_modal");
    modalButton.setAttribute("id", "displayModal");
    modalButton.textContent = "Contactez-moi";

    //
    identity.appendChild(div);
    identity.appendChild(modalButton);
    identity.appendChild(image);
    identity.appendChild(photographer_footer);

    photographer_footer.append(
      photographer_footer_likes,
      photographer_footer_icon,
      photographer_footer_price
    );

    div.appendChild(nom);
    div.appendChild(location);
    div.appendChild(tag);

    return identity;
  }

  return {
    getUserCardDOM,
    getPhotographerProfil,
  };
}
