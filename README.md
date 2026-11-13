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

## Visit alerts (preview only, remove before launch)

The end of `assets/site.js` sends a short anonymous push note to Kev's phone through ntfy.sh (topic `orp-preview-bw5njyis27`) when the published preview is opened, or when someone taps Call, WhatsApp or Get directions. It sends the page, the `?for=` link tag, the device type and the screen width. No cookies, no visitor IDs and no IP addresses. Links sent out: `?for=mark` and `?for=stuart`. Visit with `?me` once to stop your own device sending alerts.
