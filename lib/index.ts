const url = new URL(window.location.href);
const query = url.searchParams.get("q");

const searchInput = document.getElementById("search-input") as HTMLInputElement;
const searchBtn = document.getElementById("search-btn") as HTMLButtonElement;

searchInput.addEventListener("change", search);
searchBtn.addEventListener("click", search);
function search() {
  url.searchParams.set("q", searchInput.value);
  window.location.search = url.search;
}

document.querySelectorAll("#search-tags > .select").forEach((tag) => {
  const id = tag.getAttribute("data-id");
  const curr = tag.querySelector<HTMLSpanElement>(".current");
  if (curr)
    tag.querySelectorAll<HTMLAnchorElement>(".content > a").forEach((a) => {
      a.addEventListener("click", () => {
        tag.classList.add("clicked");
        curr.innerText = a.innerText;
        const val = a.getAttribute("data-value");
        if (!id) return;
        if (val) url.searchParams.set(id, val);
        else url.searchParams.delete(id);
        url.searchParams.sort();
        window.location.search = url.search;
      });
    });
  tag.addEventListener("pointerout", () => void tag.classList.remove("clicked"));
});

if (window.location.search) {
  document.querySelectorAll(".blob").forEach((b) => b.classList.add("disabled"));
  if (query) searchInput.value = query;
  document.querySelectorAll("#search-tags > .select").forEach((tag) => {
    const id = tag.getAttribute("data-id");
    const param = id && url.searchParams.get(id);
    const val = tag.querySelector<HTMLSpanElement>(`.content [data-value="${param}"]`);
    const curr = val && tag.querySelector<HTMLSpanElement>(".current");
    if (curr) curr.innerText = val.innerText;
  });
}
if (query && canBeGameGuid(query)) {
  document.getElementById("game-section")?.classList.remove("disabled");
} else if (window.location.search) {
  document.getElementById("search-results-section")?.classList.remove("disabled");
}

function canBeGameGuid(str: string) {
  return /^([A-F]|[0-9]){16}$/.test(str);
}
