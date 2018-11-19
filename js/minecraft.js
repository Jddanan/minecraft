$(document).ready(function () {

});

var Minecraft = {};

/* HARDCODED board */
Minecraft.world = [
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky",],
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky",],
    ["sky", "sky", "sky", "sky", "sky", "cloud", "sky", "sky", "sky", "sky", "sky", "sky",],
    ["sky", "sky", "cloud", "cloud", "cloud", "cloud", "sky", "sky", "sky", "sky", "sky", "sky",],
    ["sky", "sky", "cloud", "cloud", "cloud", "sky", "sky", "leaf", "leaf", "leaf", "sky", "sky",],
    ["sky", "sky", "sky", "cloud", "sky", "sky", "sky", "leaf", "leaf", "leaf", "sky", "sky",],
    ["sky", "sky", "stone", "sky", "sky", "sky", "sky", "leaf", "tree", "leaf", "sky", "sky",],
    ["sky", "sky", "stone", "stone", "sky", "sky", "sky", "sky", "tree", "sky", "sky", "sky",],
    ["sky", "stone", "stone", "stone", "sky", "sky", "sky", "sky", "tree", "sky", "sky", "sky",],
    ["grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass",],
    ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt",],
    ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt",]
];

/* Generates the world from HARDCODED board */
Minecraft.generateWorld = function (world) {

    for (var i = 0; i < world.length; i++) {
        $(`#world`).append(`<div class='row justify-content-center'>`);
        for (var j = 0; j < world[0].length; j++) {
            $(`.row:nth-child(${i})`).append(`<div class='pixel ${Minecraft.world[i][j]}'>`);
        }
    }
    $("#menu").append("<div id='shovel'>")
    $("#menu").append("<div id='axe'>")
    $("#menu").append("<div id='pickaxe'>")
}

/* Space reserved for all mouse events listeners */
Minecraft.mouseInteractions = function () {

    $(`.pixel`).on(`mouseover`, function () {
        $(this).addClass(`hovered`);
        $(`.hovered`).on(`mouseout`, function () {
            $(this).removeClass(`hovered`);
        })
    })
    $('#shovel').on('click', function () {
        $(".dirt").on("click", function () {
            $(this).addClass("sky") // change here to stock the value
            $(this).removeClass("dirt")
        })
        $(".grass").on("click", function () {
            $(this).addClass("sky") // change here to stock the value
            $(this).removeClass("grass")
        })
    });
    $('#axe').on('click', function () {
        $(".tree").on("click", function () {
            $(this).addClass("sky") // change here to stock the value
            $(this).removeClass("tree")
        })
    });
    $('#pickaxe').on('click', function () {
        $(".stone").on("click", function () {
            $(this).addClass("sky") // change here to stock the value
            $(this).removeClass("stone")
        })
    });
}

/* Initiates the game */
Minecraft.start = function () {

    Minecraft.generateWorld(Minecraft.world);
    Minecraft.mouseInteractions();
}


Minecraft.start();