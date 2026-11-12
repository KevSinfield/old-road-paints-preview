/*
  OLD ROAD IN-STORE OFFERS — edit this file to change the offers on the homepage.

  How to update when Mark texts a new offer:
    1. Put the product photo in assets/img/ (WebP or JPG, about 600px wide is plenty).
    2. Change the fields below. Keep one or two offers in the list.
    3. Set "ends" to the last day of the offer (YYYY-MM-DD). The offer hides itself
       the day after. Leave it as "" for no end date.
    4. Commit and push. GitHub Pages updates within a minute or two.

  Fields:
    title     — product name, e.g. "White matt emulsion"
    detail    — size or small print shown under the title, e.g. "5 litre tin" (optional)
    price     — the price exactly as it should appear, e.g. "£19.99"
    unit      — shown under the price, e.g. "per roll" (optional)
    image     — path to the photo, relative to the site root
    alt       — short description of the photo for screen readers
    ends      — last day of the offer, YYYY-MM-DD, or ""

  "example: true" keeps the "Example offers" label on the section. Set it to false
  only once Mark has confirmed the offers and prices are real.
*/
window.OLD_ROAD_OFFERS = {
  example: true,
  offers: [
    {
      title: "White matt emulsion",
      detail: "5 litre tin",
      price: "£19.99",
      unit: "",
      image: "assets/img/offer-emulsion.webp",
      alt: "A 5 litre tub of white matt emulsion on a shop counter",
      ends: ""
    },
    {
      title: "Selected wallpaper",
      detail: "",
      price: "£8.99",
      unit: "per roll",
      image: "assets/img/offer-wallpaper.webp",
      alt: "Rolls of leaf-pattern, linen-effect and floral wallpaper",
      ends: ""
    }
  ]
};
