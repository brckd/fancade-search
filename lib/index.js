"use strict";
var _a;
var url = new URL(window.location.href);
var query = url.searchParams.get("q");
var game = url.searchParams.get("g");
var searchSection = document.getElementById("search-section");
var searchInput = document.getElementById("search-input");
var searchBtn = document.getElementById("search-btn");
var searchTags = document.getElementById("search-tags");
var byTag = searchTags === null || searchTags === void 0 ? void 0 : searchTags.querySelector('[data-id="by"]');
var gameSection = document.getElementById("game-section");
var gameIframe = document.getElementById("game-iframe");
var gameRow = document.getElementById("game-row");
var searchResultsSection = document.getElementById("search-results-section");
var highlightsSection = document.getElementById("highlights-section");
searchInput.addEventListener("keypress", function (e) { return e.key === "Enter" && search(); });
searchBtn.addEventListener("click", search);
function search() {
    if (searchInput.value)
        url.searchParams.set("q", searchInput.value);
    else
        url.searchParams["delete"]("q");
    url.searchParams["delete"]("g");
    window.location.search = url.search;
}
if (query)
    searchInput.value = query;
document.querySelectorAll("#search-tags > .select").forEach(function (tag) {
    var id = tag.getAttribute("data-id");
    var param = id && url.searchParams.get(id);
    var val = tag.querySelector(".options [data-value=\"".concat(param, "\"]"));
    var curr = tag.querySelector(".current");
    if (curr && val)
        curr.innerText = val.innerText;
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
            window.location.search = url.search;
        });
    });
});
{
    var param = url.searchParams.get("by");
    var input_1 = byTag === null || byTag === void 0 ? void 0 : byTag.querySelector("input");
    if (input_1 && param)
        input_1.value = param;
    input_1 === null || input_1 === void 0 ? void 0 : input_1.addEventListener("keypress", function (e) {
        if (e.key !== "Enter")
            return;
        if (input_1.value)
            url.searchParams.set("by", input_1.value);
        else
            url.searchParams["delete"]("by");
        window.location.search = url.search;
    });
}
if (!window.location.search) {
    highlightsSection === null || highlightsSection === void 0 ? void 0 : highlightsSection.classList.remove("disabled");
}
else {
    searchSection === null || searchSection === void 0 ? void 0 : searchSection.classList.add("small");
}
if (game) {
    gameSection === null || gameSection === void 0 ? void 0 : gameSection.classList.remove("disabled");
    var gameUrl = "https://play.fancade.com/".concat(game);
    gameIframe === null || gameIframe === void 0 ? void 0 : gameIframe.setAttribute("src", "".concat(gameUrl, "?ar_w=16&ar_h=9"));
    (_a = gameRow === null || gameRow === void 0 ? void 0 : gameRow.querySelector('[data-id="play"]')) === null || _a === void 0 ? void 0 : _a.setAttribute("href", gameUrl);
}
else if (window.location.search) {
    searchResultsSection === null || searchResultsSection === void 0 ? void 0 : searchResultsSection.classList.remove("disabled");
}
function canBeGameGuid(str) {
    return /^([A-F]|[0-9]){16}$/.test(str);
}
