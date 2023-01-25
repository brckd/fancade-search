const url = new URL(window.location.href);
const query = url.searchParams.get("q");
const game = url.searchParams.get("g");

const searchSection = document.getElementById("search-section");
const searchInput = document.getElementById("search-input") as HTMLInputElement;
const searchBtn = document.getElementById("search-btn") as HTMLButtonElement;
const gameSection = document.getElementById("game-section");
const gameIframe = document.getElementById("game-iframe");
const gameRow = document.getElementById("game-row");
const searchResultsSection = document.getElementById("search-results-section");
const highlightsSection = document.getElementById("highlights-section");

searchInput.addEventListener("keypress", (e) => e.key === "Enter" && search());
searchBtn.addEventListener("click", search);
function search() {
  url.searchParams.set("q", searchInput.value);
  url.searchParams.delete("g");
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

if (!window.location.search) {
  highlightsSection?.classList.remove("disabled");
} else {
  searchSection?.classList.add("small");
}
if (game) {
  gameSection?.classList.remove("disabled");
  const gameUrl = `https://play.fancade.com/${game}`;
  gameIframe?.setAttribute("src", `${gameUrl}?ar_w=16&ar_h=9`);
  gameRow?.querySelector('[data-id="play"]')?.setAttribute("href", gameUrl);
} else if (window.location.search) {
  searchResultsSection?.classList.remove("disabled");
}

function canBeGameGuid(str: string) {
  return /^([A-F]|[0-9]){16}$/.test(str);
}
