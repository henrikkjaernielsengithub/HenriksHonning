// Uden IntersectionObserver må intet forblive skjult (html.js er allerede sat)
if (!("IntersectionObserver" in window)) {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
}
