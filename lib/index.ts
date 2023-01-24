const url = new URL(window.location.href);
const query = url.searchParams.get("q");
const game = url.searchParams.get("g");

const searchInput = document.getElementById("search-input") as HTMLInputElement;
const searchBtn = document.getElementById("search-btn") as HTMLButtonElement;

searchInput.addEventListener("change", search);
searchBtn.addEventListener("click", search);
function search() {
  url.searchParams.set("q", searchInput.value);
  window.location.search = url.search;
}

document.querySelectorAll<HTMLSpanElement>("#search-tags > .select").forEach((tag) => {
  const id = tag.getAttribute("data-id");
  const curr = tag.querySelector<HTMLSpanElement>(".current");
  let clickable = false;
  tag.addEventListener("mouseenter", () => {
    tag.classList.add("hover");
    setTimeout(() => (clickable = true));
  });
  tag.addEventListener("mouseleave", () => void tag.classList.remove("hover"));

  tag.querySelectorAll<HTMLAnchorElement>(".options > a").forEach((a) => {
    a.addEventListener("click", () => {
      if (!clickable) return;
      tag.classList.remove("hover");
      if (curr) curr.innerText = a.innerText;
      const val = a.getAttribute("data-value");
      if (!id) return;
      if (val) url.searchParams.set(id, val);
      else url.searchParams.delete(id);
      url.searchParams.sort();
      window.location.search = url.search;
    });
  });
});

document.querySelectorAll("#search-tags > .select").forEach((tag) => {
  const id = tag.getAttribute("data-id");
  const param = id && url.searchParams.get(id);
  const val = tag.querySelector<HTMLSpanElement>(`.options [data-value="${param}"]`);
  const curr = val && tag.querySelector<HTMLSpanElement>(".current");
  if (curr) curr.innerText = val.innerText;
});
if (query) searchInput.value = query;

if (window.location.search) {
  document.querySelectorAll(".blob").forEach((b) => b.classList.add("disabled"));
}
if (game) {
  const gameSection = document.getElementById("game-section");
  const gameIframe = document.getElementById("game-iframe");
  gameSection?.classList.remove("disabled");
  gameIframe?.setAttribute("src", `https://play.fancade.com/${game}`);
} else if (window.location.search) {
  document.getElementById("search-results-section")?.classList.remove("disabled");
}

function canBeGameGuid(str: string) {
  return /^([A-F]|[0-9]){16}$/.test(str);
}
