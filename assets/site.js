/* Old Road Paint & Wallpaper Supplies — homepage preview */
(function () {
  "use strict";

  /* WhatsApp: optional, awaiting a confirmed number from the shop.
     When Mark confirms a WhatsApp mobile, put it here in international format
     without spaces or "+", e.g. "447700900000". Leave "" to keep the button inactive.
     Never use the landline (01255 428918) here. */
  var WHATSAPP_NUMBER = "";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function isLive(offer, today) {
    if (!offer.ends) return true;
    var end = new Date(offer.ends + "T23:59:59");
    return isNaN(end) || end >= today;
  }

  function endsText(ends) {
    var d = new Date(ends + "T12:00:00");
    if (isNaN(d)) return "";
    return "Offer ends " + d.toLocaleDateString("en-GB", { day: "numeric", month: "long" });
  }

  function renderOffers() {
    var data = window.OLD_ROAD_OFFERS;
    var grid = document.getElementById("offer-grid");
    if (!data || !grid) return;
    var today = new Date();
    var offers = (data.offers || []).filter(function (o) { return isLive(o, today); }).slice(0, 2);
    if (!data.example) {
      var label = document.getElementById("offers-label");
      var note = document.getElementById("offer-note");
      if (label) label.hidden = true;
      if (note) note.innerHTML = 'While stocks last. Call <a href="tel:+441255428918">01255 428918</a> to check stock.';
    }
    if (!offers.length) return; // keeps the "call for this week's offers" fallback
    grid.classList.toggle("is-single", offers.length === 1);
    grid.innerHTML = offers.map(function (o) {
      return '<article class="offer">' +
        '<img src="' + esc(o.image) + '" alt="' + esc(o.alt) + '" width="290" height="194" loading="lazy">' +
        '<div class="offer-text">' +
          '<h3>' + esc(o.title) + '</h3>' +
          (o.detail ? '<p class="offer-detail">' + esc(o.detail) + '</p>' : '') +
          '<p class="offer-price">' + esc(o.price) + '</p>' +
          (o.unit ? '<p class="offer-unit">' + esc(o.unit) + '</p>' : '') +
          (o.ends ? '<p class="offer-ends">' + esc(endsText(o.ends)) + '</p>' : '') +
        '</div>' +
      '</article>';
    }).join("");
  }

  function setupWhatsApp() {
    var btn = document.getElementById("whatsapp-btn");
    var note = document.getElementById("wa-note");
    if (!btn) return;
    if (/^44\d{9,10}$/.test(WHATSAPP_NUMBER)) {
      btn.href = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" +
        encodeURIComponent("Hi Old Road, can you check the price and stock for this paint, please?");
      btn.target = "_blank";
      btn.rel = "noopener";
      btn.removeAttribute("aria-disabled");
      btn.removeAttribute("role");
      if (note) note.hidden = true;
    } else {
      btn.addEventListener("click", function (e) { e.preventDefault(); });
    }
  }

  renderOffers();
  setupWhatsApp();
})();
