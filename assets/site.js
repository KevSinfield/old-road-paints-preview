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
      (o.unit ? '<p class="offer-unit">' + esc(o.unit) + '</p>' : '') +
      '<p class="offer-price">' + esc(o.price) + '</p>' +
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
        return '<article class="offer-card">' +
          '<img src="' + esc(o.image) + '" alt="' + esc(o.alt) + '" width="300" height="226" loading="lazy">' +
          '<div class="offer-card-text">' + offerText(o) + '</div>' +
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

/* ---------- Visit alerts (preview only; remove before launch) ----------
   A short, anonymous note to Kev's phone via ntfy.sh when the published preview is opened or a
   key button is tapped, as on the Vintage Pine and TT Automotive previews. It sends only the page,
   the ?for= / ?from= link tag (if any), the device type and browser, and the screen width.
   No cookies, no visitor IDs, and we don't log IP addresses. It runs only on the GitHub Pages copy.
   Visit any page with ?me once to stop your own device sending alerts (?me=0 to undo). */
(function () {
  "use strict";
  var TOPIC = "https://ntfy.sh/orp-preview-bw5njyis27";
  function store(kind, k, v) { try { var s = window[kind]; if (v === undefined) return s.getItem(k); if (v === null) s.removeItem(k); else s.setItem(k, v); } catch (e) { return null; } }
  var q = new URLSearchParams(location.search);
  if (q.has("me")) store("localStorage", "orp-me", q.get("me") === "0" ? null : "1");
  var off = store("localStorage", "orp-me") === "1" || location.hostname !== "kevsinfield.github.io";
  var tag = (q.get("for") || q.get("from") || "").toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 20);
  if (tag) store("sessionStorage", "orp-from", tag); else tag = store("sessionStorage", "orp-from") || "";

  function device() {
    var u = navigator.userAgent;
    var d = /iPhone/.test(u) ? "iPhone" : /iPad/.test(u) || (/Macintosh/.test(u) && navigator.maxTouchPoints > 1) ? "iPad"
      : /Android/.test(u) ? "Android" : /Macintosh/.test(u) ? "Mac" : /Windows/.test(u) ? "Windows PC" : "Other device";
    var b = /Edg\//.test(u) ? "Edge" : /CriOS|Chrome\//.test(u) ? "Chrome" : /FxiOS|Firefox\//.test(u) ? "Firefox" : /Safari\//.test(u) ? "Safari" : "";
    return d + (b ? " (" + b + ")" : "") + ", " + screen.width + "px screen";
  }
  function page() {
    var p = location.pathname;
    return /paint\.html$/.test(p) ? "Paint page" : /offers\.html$/.test(p) ? "Offers page" : "Homepage";
  }
  function send(title, icon) {
    if (off) return;
    var msg = page() + " · " + device() + (tag ? " · for: " + tag : "");
    try {
      fetch(TOPIC + "?title=" + encodeURIComponent(title) + "&tags=" + (icon || "eyes"),
        { method: "POST", body: msg, keepalive: true, mode: "cors" }).catch(function () {});
    } catch (e) {}
  }

  var key = "orp-seen-" + location.pathname;
  if (store("sessionStorage", key) !== "1") {
    store("sessionStorage", key, "1");
    var ref = "";
    try { if (document.referrer && new URL(document.referrer).hostname !== location.hostname) ref = " (came from " + new URL(document.referrer).hostname + ")"; } catch (e) {}
    send("Old Road preview opened" + (tag ? " by " + tag : "") + ": " + page() + ref, "eyes");
  }

  /* Key taps, once each per page view */
  var done = {};
  function once(k, title, icon) { if (done[k]) return; done[k] = 1; send(title, icon); }
  document.addEventListener("click", function (e) {
    var t = e.target && e.target.closest ? e.target : null; if (!t) return;
    if (t.closest('a[href^="tel:"]')) once("call", "Tapped a Call button", "telephone_receiver");
    else if (t.closest("#whatsapp-btn")) once("wa", "Tapped the WhatsApp button (not live yet)", "speech_balloon");
    else if (t.closest('a[href*="google.com/maps"]')) once("map", "Tapped Get directions", "round_pushpin");
  });
})();
