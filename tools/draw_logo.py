"""Redraw the blue Old Road logo (line-art shopfront + lettering) at high resolution."""
import sys
from PIL import Image, ImageDraw, ImageFont

OUT = sys.argv[1]
S = 3                      # supersample factor
W, H = 2000, 650           # design canvas (matches the supplied artwork's proportions)
NAVY = (20, 36, 58, 255)
BLUE = (31, 92, 164, 255)
SW = 17                    # stroke width in design units
AVENIR = "/System/Library/Fonts/Avenir Next.ttc"

img = Image.new("RGBA", (W * S, H * S), (255, 255, 255, 0))
d = ImageDraw.Draw(img)


def P(*pts):
    return [(x * S, y * S) for x, y in pts]


def line(pts, col=NAVY, w=SW):
    d.line(P(*pts), fill=col, width=w * S, joint="curve")
    for x, y in pts:  # round caps
        r = w * S / 2
        d.ellipse((x * S - r, y * S - r, x * S + r, y * S + r), fill=col)


def arc(cx, cy, rx, ry, a0, a1, col=NAVY, w=SW):
    h = w / 2  # PIL draws the stroke inside the box, so grow the box to centre it on the path
    d.arc(((cx - rx - h) * S, (cy - ry - h) * S, (cx + rx + h) * S, (cy + ry + h) * S), a0, a1, fill=col, width=w * S)


# --- Awning ---
top_y, eave_y = 132, 222
line([(150, top_y), (475, top_y)])
line([(150, top_y), (84, eave_y)])
line([(475, top_y), (541, eave_y)])
# four scallops along the bottom edge
left, right = 84, 541
n = 4
sw = (right - left) / n
for i in range(n):
    cx = left + sw * i + sw / 2
    arc(cx, eave_y, sw / 2, 52, 0, 180)
# end caps of the eave (short verticals into the scallops)
line([(84, eave_y), (84, eave_y + 6)])
line([(541, eave_y), (541, eave_y + 6)])
# stripe dividers, fanning out from the ridge to the scallop joins
for i in range(1, n):
    x_bottom = left + sw * i
    x_top = 150 + (475 - 150) * i / n
    line([(x_top, top_y), (x_bottom, eave_y)])

# --- Shop body ---
body_top = 274
line([(112, body_top), (112, 522), (508, 522), (508, body_top)])
# window
line([(276, 312), (508, 312)])
line([(276, 312), (276, 522)])

# --- Open door (blue) ---
door = [(152, 300), (243, 333), (243, 518), (152, 562), (152, 300)]
line(door, col=BLUE, w=14)
r = 13
d.ellipse(((216 - r) * S, (433 - r) * S, (216 + r) * S, (433 + r) * S), fill=NAVY)


# --- Lettering ---
def fit(text, index, target_w):
    size = 100
    f = ImageFont.truetype(AVENIR, size * S, index=index)
    w = d.textlength(text, font=f) / S
    size = size * target_w / w
    return ImageFont.truetype(AVENIR, round(size * S), index=index)


f1 = fit("Old Road", 7, 1285)          # Regular
f2 = fit("Paint & Wallpaper Supplies", 7, 1300)
# place by cap top: "Old Road" caps from y=160 to 400; subtitle caps ~452 to 515
def draw_text(text, font, x, cap_top):
    bbox = d.textbbox((0, 0), "O", font=font)
    d.text((x * S, cap_top * S - bbox[1]), text, font=font, fill=NAVY)

draw_text("Old Road", f1, 632, 160)
draw_text("Paint & Wallpaper Supplies", f2, 634, 452)

img = img.resize((W, H), Image.LANCZOS)
bb = img.getchannel("A").point(lambda p: 255 if p > 8 else 0).getbbox()
pad = 6
img = img.crop((bb[0] - pad, bb[1] - pad, bb[2] + pad, bb[3] + pad))
img.save(OUT)
print(img.size)
