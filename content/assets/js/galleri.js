// Lightbox for /billeder/ — native <dialog>, ingen afhængigheder.
// Uden JS virker galleriet som almindelige links til billedfilerne.
(() => {
  const dialog = document.getElementById("galleri-lightbox");
  if (!dialog || typeof dialog.showModal !== "function") return;

  const links = Array.from(document.querySelectorAll(".galleri-figur a"));
  const billede = dialog.querySelector("img");
  const tekst = dialog.querySelector("figcaption");
  const taeller = dialog.querySelector(".lb-taeller");
  let aktiv = 0;

  // Foretræk den største webp-udgave fra eleventy-img frem for original-JPEG'en
  // (~4-5× mindre). Linkets href peger stadig på originalen som fallback uden JS.
  const storBillede = (a) => {
    const kilde = a.querySelector('source[type="image/webp"]');
    if (kilde && kilde.srcset) {
      const kandidater = kilde.srcset.split(",").map((s) => s.trim().split(" ")[0]);
      return kandidater[kandidater.length - 1]; // srcset er sorteret stigende
    }
    return a.href;
  };

  const vis = (i) => {
    aktiv = (i + links.length) % links.length;
    const a = links[aktiv];
    billede.src = storBillede(a);
    billede.alt = a.querySelector("img").alt;
    tekst.textContent = a.closest("figure").querySelector("figcaption").textContent;
    taeller.textContent = `${aktiv + 1} af ${links.length}`;
  };

  links.forEach((a, i) => {
    a.addEventListener("click", (e) => {
      if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      vis(i);
      dialog.showModal();
    });
  });

  dialog.querySelector(".lb-luk").addEventListener("click", () => dialog.close());
  dialog.querySelector(".lb-forrige").addEventListener("click", () => vis(aktiv - 1));
  dialog.querySelector(".lb-naeste").addEventListener("click", () => vis(aktiv + 1));
  dialog.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") vis(aktiv - 1);
    if (e.key === "ArrowRight") vis(aktiv + 1);
  });
  // klik på baggrunden (selve dialog-elementet, ikke indholdet) lukker
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });
})();
