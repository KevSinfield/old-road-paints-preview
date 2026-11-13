# Old Road Paint & Wallpaper Supplies — homepage preview

A one-page design preview for Old Road Paint & Wallpaper Supplies, 112–116 Old Road, Clacton-on-Sea. Plain HTML, CSS and a little JavaScript, served by GitHub Pages. It is not the live site (paintsandwallpapers.co.uk), which is untouched.

## Changing the in-store offers

Edit **`data/offers.js`**. It holds one or two offers, each with a title, size, price, unit, photo, alt text and optional end date. Instructions are at the top of the file. Put new photos in `assets/img/`. An offer hides itself the day after its end date; if none are left, the section asks people to call for this week's offers.

`example: true` keeps the "Example offers" label. Set it to `false` only once the shop has confirmed the offers.

## WhatsApp

The WhatsApp button is shown but inactive, marked as awaiting a confirmed number. To switch it on, set `WHATSAPP_NUMBER` at the top of `assets/site.js` (international format, e.g. `447700900000`). Never use the landline.

## Notes

- Photos are cropped from the design mock-up and are illustrative, not the shop's own.
- `robots.txt` and a `noindex` tag keep the preview out of search results.
- Bump the `?v=` on the CSS/JS links in `index.html` after edits so returning visitors get the new files.
- The blue logo (`assets/img/logo.webp`) was redrawn from the supplied artwork by `tools/draw_logo.py` (Pillow + macOS Avenir Next). Swap in the original file if the shop can supply it.
