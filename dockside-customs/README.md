# Dockside Customs, website

Static HTML site. No build step, no framework. Open any `.html` file in a browser, or serve the folder:

```bash
python3 -m http.server 8082
```

(A `dockside-customs` entry is already registered in the shared `../.claude/launch.json` on port 8082.)

Structure and design patterns were modeled on [wrapsonright.com](https://wrapsonright.com) (a similar marine/fleet wrap company) at the client's request: same layout skeleton, rebranded for Dockside Customs.

## Pages
- `index.html`: home. Hero, hours/contact info bar, a "Wrap vs Paint" comparison section (see below), about section (real photo), 4-service preview grid, testimonials, trust badges, a "Marine Mat" feature callout (real photo), footer (no "Start With Trust" blurb, removed per client request).
- `services.html`: four alternating photo+text panels, one per category, in the order Marine, Commercial, Store Front, Marine Mat (this order and grouping came directly from the client; the same order is used in the quick-jump pills, the nav dropdown, the footer lists, and the home page service cards), each with a real project photo, its own anchor id (`#marine`, `#commercial`, `#storefront`, `#marine-mat`), and a quick-jump pill nav at the top. The old 5-category layout (Marine, Wraps, Graphics, Commercial, Marine Mat, each with a couple of prose paragraphs) was replaced with this 4-category one at the client's request: Marine and Commercial absorbed what used to be the separate Wraps/Graphics sections, Store Front was split out of the old Commercial section, and each category now shows a short checklist of exactly what it covers (`.offer-list` in `assets/styles.css`) instead of prose:
  - **Marine:** PPF, Solid Color Change Wraps, Custom Printed Wraps, Die-Cut Logos & Registration Numbers.
  - **Commercial:** Trailers, Dump Trucks, Food Trucks.
  - **Store Front:** Window Perf, Die-Cut Decals, plus a line saying that's not the whole list.
  - **Marine Mat:** unchanged, still "Coming Soon" (see below).
- `gallery.html`: filterable project grid (All / Boats / Fleet / Storefront), one representative photo per project with just the project name as the caption (e.g. "Kraken Wrap," "Bite Me," "COCO Dessert Studio"). Each project card is clickable and opens a lightbox: projects with more than one photo (Flag Skiff Wrap and Kraken Wrap have 2, COCO Dessert Studio has 5) show a photo-count badge and step through all their photos with prev/next arrows or the keyboard arrow keys; single-photo projects just open that one photo larger. No swipe gesture yet, just click/tap and keyboard. Plus a separate "Design Concepts" section below it for the 3 non-photo mockup sheets (see below).
- `contact.html`: contact info (phone, email, placeholder address, hours, social links) on the left, an embedded Google Map on the right. No quote form, kept intentionally simple per the client's request.

## Files
- `assets/styles.css`: all styling + design tokens (`:root` at the top: colors, type, spacing).
- `assets/main.js`: mobile nav (slide-in + scrim), scroll reveal, gallery filter.
- `assets/img/logo.png`: the client's current logo (the newer transparent-background version, from `~/Downloads/ChatGPT Image Sep 18, 2026 at 07_05_53 PM.png`, resized to 900px wide). Used in the header, footer, and favicon. It replaced the original `Unknown.jpg` logo, which had a solid dark background.
- `assets/img/gallery/`: 19 real photos supplied by the client (from `~/Downloads/Unknown-2.jpg` through `Unknown-20.jpg`), sorted into `boat-01..09`, `fleet-01..09`, `storefront-01` by content, EXIF/orientation-corrected (several were sideways), and resized to a 1600px-wide max for web. Client/boat names visible in the photos (Care Package Meal Prep Co., The Coastal Cup Coffee Company, Hoops & Shoots, LOADED Halal Food Truck, COCO Dessert Studio, "The Queen's Revenge," "Bite Me") are used as project names since these are Dockside Customs' own completed installs for those customers.
  - `gallery.html` shows one photo per project (13 projects total). Where a project had multiple angles (the flag skiff boat, the kraken boat, and the COCO Dessert Studio bus each had 2 to 5 shots), only the best one is shown there, but the rest stay in the folder unused: `boat-02.jpg`, `fleet-05.jpg`, `fleet-06.jpg`, `fleet-07.jpg`, `fleet-08.jpg`. Kept on disk in case a future per-project detail page or lightbox wants them.
  - `boat-06.jpg`, `fleet-04.jpg`, `boat-08.jpg`, and `storefront-01.jpg` are reused individually on `services.html` for the Marine, Commercial, Marine Mat, and Store Front sections. `boat-04.jpg` ("Bite Me") is no longer used on `services.html` since the old Graphics section was folded into Marine, but it's still in the gallery grid.
- `assets/img/concepts/`: 3 additional images from the client's Downloads (`Unknown-21.jpg` through `Unknown-23.jpg`) that are **computer-rendered concept/mockup sheets, not photos of real installs**. Each shows 5 fish-themed camo wrap design options on the same rendered boat, branded "Dockside Wrap Co." (not "Dockside Customs," a close-but-different name). These were kept off the real-work gallery grid and given their own "Design Concepts" section on `gallery.html` with a note explaining what they are. **Ask the client whether to keep these on the site at all.** They're useful as style inspiration for prospective customers, but the mismatched business name printed on them should probably be addressed (re-export without the wrong name, or just remove this section) before launch.

## Wrap vs Paint section (home page)
Built from the client's "#PaintIsDead" flyer and placed right under the hero so it's the first thing visitors read. Headline "Same Boat. Different Future." with "Wrap it. Protect it. Enjoy it. Look better. Spend smarter.", then a split panel: **Wrap, The Smart Investment** (8 benefits: More Affordable, Endless Design Options, Protects Your Gelcoat, Easy to Change, No More Constant Detailing, Maintains Resale Value, Faster Turnaround, Adds Value) versus **Paint, Expensive & Outdated** (6 drawbacks: Higher Upfront Cost, Constant Maintenance, Susceptible to Chips & Fading, Limited Design Options, Permanent, Loses Value Faster). Closes with "Don't spend thousands a year on a detailer..." and a quote/call CTA. The wording is taken straight from the flyer, so unlike the placeholder paragraphs it's real client copy. Markup is in `index.html` under `<!-- WRAP VS PAINT -->`, styles are the `.versus-*` and `.vs-*` classes in `assets/styles.css`. It stacks vertically on mobile with the VS badge on the seam.

## Marine Mat is "Coming Soon"
Marine Mat isn't available yet, so every place it's named carries a small "Coming Soon" pill (`.soon-badge` in `assets/styles.css`): nav dropdown, footer links, the quick-jump buttons and the Marine Mat heading on `services.html`, the Marine Mat service card and callout on the home page. The Marine Mat button on the Services page now says "Ask About Marine Mat" instead of "Get A Marine Mat Quote", and the page meta descriptions no longer promise marine mat installation. When it launches: search the HTML for `soon-badge` and delete those spans, put the quote button back, and rewrite the two Marine Mat paragraphs. Note the Marine Mat photo is the "Queen's Revenge" transom shot, which happens to show synthetic teak decking; confirm with the client that they're happy using it, or swap in one of their own once they have it.

## Services page categories (client-defined)
The 4 Services categories, the checklist under each one, and their order (Marine, Commercial, Store Front, Marine Mat) all came directly from the client, not drafted copy. If the client adds or renames a service later, edit the matching `<ul class="offer-list">` in `services.html`, its `.service-card` on `index.html`, and the nav dropdown / footer list / quick-jump pill in all 4 HTML files, they're independent copies, not generated from one source.

## Design system
- Dark, bold, marine/industrial feel: deep navy base (`--navy-950` / `--navy-900`) with electric blue accents (`--blue` / `--blue-bright`) and chrome-silver text (`--silver`), all pulled from the logo's color palette.
- Headings: Oswald (condensed, uppercase, bold). Body: Inter.
- A skewed electric-blue diagonal accent strip sits under the header and reappears in the dark info bar, echoing the yellow diagonal treatment on the reference site.
- Real photos use `.img-feature` (single hero-style shot with caption) or `.gallery-item` (grid card with caption) components. Any spot still awaiting a photo uses the reusable `.img-slot` placeholder: dashed border, navy gradient fill, camera icon, bold label. None remain right now, since every photo slot was filled from the client's supplied images.
- Scroll-reveal fade/slide-up on section entry (`IntersectionObserver`, `.reveal` class), hover lift on cards/buttons, mobile nav slides in from the right with a dark scrim.

## Real business info used
- Phone: 352-648-6546
- Services: Wraps, Graphics, Marine, Commercial, Marine Mat (from the logo's tagline)
- No address, email, or hours were supplied. Email is a placeholder (`info@docksidecustoms.com`), the contact page address is a placeholder centered on Ocala, FL (guessed from the 352 area code; **confirm the real shop address** so the embedded map on `contact.html` can point at the actual location), and hours are guessed as Monday-Friday 9 AM-5 PM to match the reference site. **Confirm all three before launch.**
- Facebook: every Facebook icon on the site (home info bar, contact page, footer on all 4 pages) links to `https://www.facebook.com/dylan.houser.73`, supplied by the user. That looks like a personal profile URL, so check whether the business has its own Facebook Page and use that instead if so.
- Instagram: no handle was supplied. The Instagram icons still link to a guessed placeholder, `instagram.com/docksidecustoms`. **Swap in the real profile URL before launch**, or it will 404.

## Still to do before launch
1. **Confirm shop address, hours, and email**, and update the placeholder map query in `contact.html` (`.map-frame` `src`) to the real address.
2. **Real Instagram URL.** Still a guessed placeholder in 6 places (search the HTML for `instagram.com/docksidecustoms`). Facebook is done, but see the note above about it being a personal profile.
3. **Copy.** The body paragraphs (hero, About, service cards, each Services section, trust blurb, Marine Mat callout) are now short, plain-spoken copy written only from facts in the client's flyer and photos (boats, trucks, trailers, food trucks, storefront windows, wrap benefits, locally owned). No years in business, certifications, brands or pricing were invented. The client should read it once and adjust anything that doesn't sound like them. **Testimonials are still placeholders on purpose** ("Placeholder testimonial text." / "Placeholder Customer"): don't write fake reviews, get real ones from real customers (Google reviews are the easy source) or remove the section. **Also confirm the four trust badges** in the "Built On Quality & Trust" section (Licensed & Insured, Premium Materials, In-House Install Team, Satisfaction Guaranteed). Those labels were written early on and none of them came from the client, so only keep the ones that are true.
4. **Decide on the "Design Concepts" section** on `gallery.html`. See the `assets/img/concepts/` note above.
5. **Favicon.** Currently reuses the full logo jpg for `<link rel="icon">`. Consider a cropped/simplified square version for a cleaner browser-tab icon.
6. More photos are welcome any time. The gallery/services images are real but thin in spots (only 1 storefront photo, only 1 photo showing marine mat/teak decking). Swap or add to `assets/img/gallery/` as the client sends more.
