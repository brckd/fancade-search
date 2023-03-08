import "./style.css";

const url = new URL(window.location.href);
const query = url.searchParams.get("q");
const searchInput = document.getElementById("search-input") as HTMLInputElement;
const searchBtn = document.getElementById("search-btn") as HTMLButtonElement;
const searchTags = document.getElementById("search-tags");
const byTag = searchTags?.querySelector('[data-id="by"]');

searchInput.addEventListener("keypress", (e) => e.key === "Enter" && search());
searchBtn.addEventListener("click", search);
function search() {
  if (searchInput.value) url.searchParams.set("q", searchInput.value);
  else url.searchParams.delete("q");
  url.searchParams.delete("g");
  window.location.search = url.search;
}

// Tags
if (query) searchInput.value = query;
document.querySelectorAll<HTMLSpanElement>("#search-tags > .select").forEach((tag) => {
  const id = tag.getAttribute("data-id");
  const param = id && url.searchParams.get(id);
  const val = tag.querySelector<HTMLSpanElement>(`.options [data-value="${param}"]`);
  const curr = tag.querySelector<HTMLSpanElement>(".current");
  if (curr && val) curr.innerText = val.innerText;
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
      window.location.search = url.search;
    });
  });
});

// Author
const param = url.searchParams.get("by");
const input = byTag?.querySelector<HTMLInputElement>("input");
if (input && param) input.value = param;
input?.addEventListener("keypress", (e) => {
  if (e.key !== "Enter") return;
  if (input.value) url.searchParams.set("by", input.value);
  else url.searchParams.delete("by");
  window.location.search = url.search;
});
