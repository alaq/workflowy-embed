// ==UserScript==
// @name         WorkflowyPlus
// @namespace    http://wizmann.tk
// @version      0.1
// @author       Wizmann
// @match        https://workflowy.com/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';



function do_parseImg() {
    $(this).nextAll(".content-img").remove();
    var lines = $(this).text().split("\n");
    var img_re = /^\!\[(.*)\]\((.+)\)$/;

    for (var i = 0; i < lines.length; i++) {
        var line = lines[i].trim();
        var img = line.match(img_re);
        if (img === null) {
            continue;
        }
        var property = img[1];
        var img_url = img[2];

        console.log(property, img_url);

        if (property === "t") {
            $(this).after('<div class="content-img"><img class="img-toggle" style="display: none" src="' + img_url + '"/></div>');
        } else if (property === "iframe") {
            $(this).after('<div class="content-img"><iframe width="100%" height="512" src="' + img_url + '" frameborder="0" allowfullscreen=""></iframe></div>');
        } else {
            $(this).after('<div class="content-img"><img src="' + img_url + '"/></div>');
        }
    }
}

function parseImg() {
    $("div.notes div.content").live("click keyup", do_parseImg);
    $("div.notes div.content").each(do_parseImg);
    $("#expandButton").live("click", function() {
        $("div.notes div.content").each(do_parseImg);
    });
};

$(window).bind("load hashchange", parseImg);

$(".img-toggle").live("click", function() {
    console.log("toggle");
    $(this).toggle();
});
