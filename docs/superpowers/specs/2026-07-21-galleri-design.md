# Galleri: »Bigården i billeder« — design

**Dato:** 2026-07-21
**Status:** Godkendt retning (mockup A, »Årstidsfortælling«), afventer spec-review

## Formål

En ny side på sitet, der viser Henriks egne fotos fra bigården, haven og skoven i Hinge
som en redaktionel årstidsfortælling — i samme designsprog som resten af sitet
(papir/honning/skov-paletten, Fraunces-typografi, reveal-animationer).

## Beslutninger truffet under brainstorm

- **Placering:** Egen side `/billeder/` med menupunktet **Billeder** i nav og footer.
  Ingen galleri-sektion på forsiden.
- **Form:** Retning A, »Årstidsfortælling« — fire årstidssektioner med varieret grid,
  billedtekster og sektionsintroer. Valgt frem for mosaik-grid og fotoalbum-stil.
- **Kuratering:** 18 billeder ud af 38 overførte. Næsten-dubletter fravalgt.
  Krokus-billedet (IMG_5579, bypark) er slettet fra råmaterialet — hørte ikke til.
- **Video:** IMG_6154.MOV udgår.
- **Billedtekster:** Skal beskrive det, billedet faktisk viser — ingen faglige påstande,
  motivet ikke dækker (fx trækstyrke, når stadet kun har ét magasin).

## Sidens indhold

Titel: **Året gennem linsen** · kicker: »Bigården i billeder · året rundt«.
Kort intro efterfulgt af fire sektioner:

| # | Sektion | Periode | Billeder |
|---|---------|---------|----------|
| 01 | Foråret melder sig | Februar–april | 4 |
| 02 | Bigården i skoven | Maj–juli | 6 |
| 03 | Høsten | August | 5 |
| 04 | Skoven lukker året | Oktober–november | 3 |

### Endelig billedliste (original → web-slug, billedtekst)

**01 Foråret melder sig** — intro: skovbunden vågner, før bierne for alvor flyver.

| Original | Slug | Format | Billedtekst |
|----------|------|--------|-------------|
| IMG_7009.JPG | `vintergaekker` | bred | Vintergækker i tusindtal ved den gamle lade, februar. |
| IMG_7062.JPG | `paaskeliljer-anemoner` | bred | Påskeliljer, anemoner og lærkespore i skovbunden, april. |
| IMG_7113.JPG | `mirabelle-april` | høj | Mirabellen blomstrer mod aprilhimlen. |
| IMG_7117.JPG | `mirabelle-blomster` | høj | Tæt på blomsterne — mad til de første trækbier. |

**02 Bigården i skoven** — intro: staderne står spredt på ejendommen — i skovbryn, på
skrænter og i den gamle have.

| Original | Slug | Format | Billedtekst |
|----------|------|--------|-------------|
| IMG_3508.JPG | `stade-aerenpris` | hero | Stadet ved garagen med et tæppe af tveskægget ærenpris — de grønne kasser anes hele vejen op gennem græsset. |
| IMG_0264.JPG | `haven-maj` | bred | Haven i maj: rhododendron og de første slåede stier. |
| IMG_6153.JPG | `skovstade-hoej` | høj | Et enligt stade på skrænten mellem høgeurt og bregner. |
| 2023-07-28-11-37-35-707.PNG | `ejendommen-fra-luften` | bred | Ejendommen fra luften — skov til alle sider. |
| IMG_6583.JPG | `asters` | høj | Asters i bedet — et af havens sene trækplastre. |
| IMG_6152.JPG | `skovstade-juli` | bred | Skovstadet i juli — omgivet af høgeurt på den lysåbne skrænt. |

**03 Høsten** — intro: magasinerne bæres ind, tavlerne skæres, og honningen får lov at løbe.

| Original | Slug | Format | Billedtekst |
|----------|------|--------|-------------|
| IMG_5137.jpg | `magasiner-stablet` | høj | Magasinerne stables i bryggerset — klar til afdækning. |
| IMG_5138.jpg | `tavler-skaeres` | bred | Tavlehonningen skæres i blokke direkte fra rammen. |
| IMG_5142.JPG | `honning-tappes` | høj | Honningen løber fra tappehanen — langsomt og gyldent. |
| IMG_5129.jpg | `tavleglas-bakke` | høj | Tavlehonning i glas — en hel bradepande fuld. |
| IMG_5133.jpg | `tavleglas-bord` | høj | Tavlehonning klar til at blive fyldt op med flydende honning — august måneds fineste øjeblik. |

**04 Skoven lukker året** — intro: bierne er fodret og klar til vinter; skoven står i gult
og kobber.

| Original | Slug | Format | Billedtekst |
|----------|------|--------|-------------|
| IMG_6755.JPG | `boegeskov-oktober` | bred | Bøgeskoven i oktober — de gamle, krogede træer i eftermiddagslys. |
| IMG_6768.JPG | `stade-efteraar` | høj | Vinterklart stade i efterårsskoven — remmen holder låget mod stormene. |
| IMG_5420.JPG | `huset-efteraar` | hero | Huset bag de gule kroner — bigårdens stille årstid begynder. |

Alt-tekster skrives pr. billede i datafilen (beskrivende, ikke identisk med billedteksten).

## Arkitektur

### Datamodel

`content/_data/galleri.js` eksporterer et array af sektioner:

```js
export default [
  {
    nummer: "01", periode: "Februar–april", titel: "Foråret melder sig",
    intro: "Skovbunden vågner …",
    billeder: [
      { fil: "vintergaekker", format: "bred", span: 7,
        tekst: "Vintergækker i tusindtal …", alt: "Blomstrende vintergækker …" },
      // …
    ],
  },
  // …
]
```

`format` styrer aspect-ratio (bred 16/10, høj 3/4, hero 21/10); `span` styrer
grid-bredden (12-kolonners grid som på forsiden). Spans og rækkefølge overtages fra den
godkendte mockup (`.superpowers/brainstorm/1040-1784641568/content/galleri-a-fuld-v5.html`). Nye billeder tilføjes ved at lægge en
fil i `_raw/galleri/`, køre importscriptet og tilføje én post i datafilen.

### Skabelon

`content/billeder.njk` (layout: `layouts/base.njk`, permalink `/billeder/`) renderer
kicker, titel, intro og sektionerne fra datafilen. Grid-CSS føjes til `assets/css/site.css`
med sitets eksisterende variabler; `reveal`-klasser giver samme scroll-animation som
forsiden. Menupunktet **Billeder** tilføjes i `partials/nav.njk` og `partials/footer.njk`.

### Billedpipeline

`scripts/importer-galleri.mjs` (Node + `sharp`, allerede installeret som dependency af
eleventy-img):

- Læser originaler fra `_raw/galleri/` (gitignoreret; originaler committes aldrig).
- Retter EXIF-rotation, skalerer til maks. 1600 px bredde/højde, gemmer som JPEG ~kvalitet 80
  i `assets/img/galleri/<slug>.jpg`.
- Mapping original→slug ligger i scriptet.
- Køres manuelt én gang (og igen ved nye billeder); de optimerede filer (~200-350 KB/stk.,
  ~5-6 MB i alt) committes. Selve eleventy-bygget ændres ikke.

### Lightbox

Klik på et billede åbner det i fuld størrelse:

- Native `<dialog>`-element + ~40 linjers vanilla JS i ny fil `assets/js/galleri.js`
  (indlæses kun på gallerisiden). Ingen eksterne biblioteker.
- Mørklagt baggrund, billedtekst under billedet, pil-taster/knapper til forrige/næste,
  Esc og klik udenfor lukker.
- Progressive enhancement: uden JS er siden et almindeligt billedgalleri; `<a href>` til
  billedfilen som fallback.

### Tilgængelighed og ydeevne

- Alle billeder har `alt`, `loading="lazy"` (undtagen første hero), `width`/`height`
  mod layout-skift.
- Lightbox: fokusfælde i `<dialog>`, `aria-label` på knapper.
- Sidevægt: ~18 billeder à ~250 KB lazy-loadet; ingen ekstra fonte eller scripts ud over
  galleri.js (~2 KB).

## Uden for scope

- Video i galleriet (fravalgt).
- Galleri-teaser/sektion på forsiden.
- Filtrering, søgning eller tags (mosaik-retningens features).
- Automatisk billedgenerering i bygget (eleventy-img på siden) — kan tilføjes senere,
  hvis originalerne får et hjem uden for git.

## Test

- `npm run build` uden fejl; `/billeder/` findes i `_site` med 18 `<figure>`.
- Manuel gennemgang i browser (desktop + mobilbredde): grid, lazy-load, lightbox-navigation,
  Esc/fokus, ingen horisontal scroll.
- Nav/footer-link virker fra forside, artikler og om-siden (HtmlBasePlugin håndterer
  path-prefix).
