"use strict";
var _a;
var url = new URL(window.location.href);
var query = url.searchParams.get("q");
var game = url.searchParams.get("g");
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
    var clickable = false;
    tag.addEventListener("mouseenter", function () {
        tag.classList.add("hover");
        setTimeout(function () { return (clickable = true); });
    });
    tag.addEventListener("mouseleave", function () { return void tag.classList.remove("hover"); });
    tag.querySelectorAll(".options > a").forEach(function (a) {
        a.addEventListener("click", function () {
            if (!clickable)
                return;
            tag.classList.remove("hover");
            if (curr)
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
});
document.querySelectorAll("#search-tags > .select").forEach(function (tag) {
    var id = tag.getAttribute("data-id");
    var param = id && url.searchParams.get(id);
    var val = tag.querySelector(".options [data-value=\"".concat(param, "\"]"));
    var curr = val && tag.querySelector(".current");
    if (curr)
        curr.innerText = val.innerText;
});
if (query)
    searchInput.value = query;
if (window.location.search) {
    document.querySelectorAll(".blob").forEach(function (b) { return b.classList.add("disabled"); });
}
if (game) {
    var gameSection = document.getElementById("game-section");
    var gameIframe = document.getElementById("game-iframe");
    gameSection === null || gameSection === void 0 ? void 0 : gameSection.classList.remove("disabled");
    gameIframe === null || gameIframe === void 0 ? void 0 : gameIframe.setAttribute("src", "https://play.fancade.com/".concat(game, "?ar_w=16&ar_h=9"));
}
else if (window.location.search) {
    (_a = document.getElementById("search-results-section")) === null || _a === void 0 ? void 0 : _a.classList.remove("disabled");
}
function canBeGameGuid(str) {
    return /^([A-F]|[0-9]){16}$/.test(str);
}
