"use strict";
var _a, _b;
var url = new URL(window.location.href);
var query = url.searchParams.get("q");
var searchInput = document.getElementById("search-input");
var searchBtn = document.getElementById("search-btn");
searchInput.addEventListener("change", search);
searchBtn.addEventListener("click", search);
function search() {
    url.searchParams.set("q", searchInput.value);
    window.location.search = url.search;
}
document.querySelectorAll("#search-tags > .select").forEach(function (tag) {
    var id = tag.getAttribute("data-id");
    var curr = tag.querySelector(".current");
    if (curr)
        tag.querySelectorAll(".content > a").forEach(function (a) {
            a.addEventListener("click", function () {
                tag.classList.add("clicked");
                curr.innerText = a.innerText;
                var val = a.getAttribute("data-value");
                if (!id)
                    return;
                if (val)
                    url.searchParams.set(id, val);
                else
                    url.searchParams["delete"](id);
                url.searchParams.sort();
                window.location.search = url.search;
            });
        });
    tag.addEventListener("pointerout", function () { return void tag.classList.remove("clicked"); });
});
if (window.location.search) {
    document.querySelectorAll(".blob").forEach(function (b) { return b.classList.add("disabled"); });
    if (query)
        searchInput.value = query;
    document.querySelectorAll("#search-tags > .select").forEach(function (tag) {
        var id = tag.getAttribute("data-id");
        var param = id && url.searchParams.get(id);
        var val = tag.querySelector(".content [data-value=\"".concat(param, "\"]"));
        var curr = val && tag.querySelector(".current");
        if (curr)
            curr.innerText = val.innerText;
    });
}
if (query && canBeGameGuid(query)) {
    (_a = document.getElementById("game-section")) === null || _a === void 0 ? void 0 : _a.classList.remove("disabled");
}
else if (window.location.search) {
    (_b = document.getElementById("search-results-section")) === null || _b === void 0 ? void 0 : _b.classList.remove("disabled");
}
function canBeGameGuid(str) {
    return /^([A-F]|[0-9]){16}$/.test(str);
}
