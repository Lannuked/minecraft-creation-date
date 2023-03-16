// ==UserScript==
// @name         Minecraft Join Date
// @version      1
// @description  Display a user's join date on the top of the page!
// @author       Lannuked
// @run-at 	     document-start
// @match        *.minecraft.net/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=minecraft.net
// ==/UserScript==

(function() {
    'use strict';
    function getCookie(name) {
        function escape(s) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
        var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
        return match ? match[1] : null;
    }

    async function getJSON() {
        return fetch("https://api.minecraftservices.com/minecraft/profile/namechange", { 'headers': new Headers({'Authorization': 'Bearer ' + getCookie("bearer_token")})})
            .then((response)=>response.json())
            .then((responseJson)=>{return responseJson});;
    }

    async function caller() {
        const json = await getJSON();
        var elemDiv = document.createElement('div');
        elemDiv.style.cssText = "text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;background: #211710 url('https://web.archive.org/web/20130108000138im_/http://minecraft.net/images/bg_top.png');color: white;";
        elemDiv.innerHTML = "<center>This person's awesome minecraft account was created on: " + json.createdAt.split("T")[0] + "</center>";
        document.body.insertBefore(elemDiv, document.body.firstChild);
    }
    caller();
})();