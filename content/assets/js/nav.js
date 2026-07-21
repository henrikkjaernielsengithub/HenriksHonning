// Mobilmenu: burger-knappen folder hovedmenuen ud og ind.
(() => {
  const knap = document.querySelector(".menu-knap");
  const menu = document.getElementById("hovedmenu");
  if (!knap || !menu) return;

  const saet = (aaben) => {
    menu.classList.toggle("aaben", aaben);
    knap.setAttribute("aria-expanded", String(aaben));
  };

  knap.addEventListener("click", () => saet(!menu.classList.contains("aaben")));
  // luk når man vælger et punkt
  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) saet(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("aaben")) {
      saet(false);
      knap.focus();
    }
  });
})();
