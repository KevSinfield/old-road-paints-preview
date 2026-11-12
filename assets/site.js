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

  function offerText(o) {
    return '<h3>' + esc(o.title) + '</h3>' +
      (o.detail ? '<p class="offer-detail">' + esc(o.detail) + '</p>' : '') +
      (o.unit && o.layout === "card" ? '<p class="offer-unit">' + esc(o.unit) + '</p>' : '') +
      '<p class="offer-price">' + esc(o.price) + '</p>' +
      (o.unit && o.layout !== "card" ? '<p class="offer-unit">' + esc(o.unit) + '</p>' : '') +
      (o.ends ? '<p class="offer-ends">' + esc(endsText(o.ends)) + '</p>' : '');
  }

  function renderOffers() {
    var data = window.OLD_ROAD_OFFERS;
    if (!data) return;
    var today = new Date();
    var live = (data.offers || []).filter(function (o) { return isLive(o, today); });

    if (!data.example) {
      var label = document.getElementById("offers-label");
      var note = document.getElementById("offer-note");
      if (label) label.hidden = true;
      if (note) note.innerHTML = 'While stocks last. Call <a href="tel:+441255428918">01255 428918</a> to check stock.';
    }

    /* Homepage: first two live offers, image beside text */
    var grid = document.getElementById("offer-grid");
    if (grid && live.length) {
      var two = live.slice(0, 2);
      grid.classList.toggle("is-single", two.length === 1);
      grid.innerHTML = two.map(function (o) {
        return '<article class="offer">' +
          '<img src="' + esc(o.image) + '" alt="' + esc(o.alt) + '" width="290" height="194">' +
          '<div class="offer-text">' + offerText(o) + '</div>' +
        '</article>';
      }).join("");
    }

    /* Offers page: every live offer, image above text */
    var list = document.getElementById("offer-list");
    if (list && live.length) {
      list.classList.toggle("count-1", live.length === 1);
      list.classList.toggle("count-2", live.length === 2);
      list.innerHTML = live.map(function (o) {
        var c = Object.assign({}, o, { layout: "card" });
        return '<article class="offer-card">' +
          '<img src="' + esc(o.image) + '" alt="' + esc(o.alt) + '" width="300" height="226" loading="lazy">' +
          '<div class="offer-card-text">' + offerText(c) + '</div>' +
        '</article>';
      }).join("");
    }
  }

  function setupMenu() {
    var btn = document.querySelector(".menu-toggle");
    var nav = document.getElementById("site-menu");
    if (!btn || !nav) return;
    function setOpen(open) {
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      nav.classList.toggle("is-open", open);
    }
    btn.addEventListener("click", function () {
      setOpen(btn.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") { setOpen(false); btn.focus(); }
    });
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

  setupMenu();
  renderOffers();
  setupWhatsApp();
})();
