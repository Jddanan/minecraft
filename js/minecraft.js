$(document).ready(function () {

});

/* Variables */
var Minecraft = {};
Minecraft.tools = new Map([
    [`shovel`, `dirt`],
    [`axe`, `tree`],
    [`pickaxe`, `stone`],
    [`shear`, `leaf`],
    [`mower`, `grass`],
])

/* HARDCODED board */
Minecraft.world = [
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky",],
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky",],
    ["sky", "sky", "sky", "sky", "sky", "sky", "cloud", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky",],
    ["sky", "leaf", "leaf", "leaf", "sky", "cloud", "cloud", "cloud", "cloud", "cloud", "cloud", "cloud", "sky", "sky", "sky", "sky", "sky", "sky",],
    ["sky", "leaf", "leaf", "leaf", "sky", "sky", "sky", "cloud", "cloud", "cloud", "cloud", "sky", "sky", "sky", "sky", "sky", "sky", "sky",],
    ["sky", "leaf", "leaf", "leaf", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "leaf", "leaf", "leaf", "sky", "sky",],
    ["sky", "leaf", "tree", "leaf", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "leaf", "leaf", "leaf", "sky", "sky",],
    ["sky", "sky", "tree", "sky", "sky", "sky", "sky", "sky", "stone", "sky", "sky", "sky", "sky", "leaf", "tree", "leaf", "sky", "sky",],
    ["sky", "sky", "tree", "sky", "stone", "sky", "sky", "sky", "stone", "stone", "sky", "sky", "sky", "sky", "tree", "sky", "sky", "sky",],
    ["sky", "sky", "tree", "sky", "stone", "stone", "sky", "stone", "stone", "stone", "sky", "sky", "sky", "sky", "tree", "stone", "sky", "sky",],
    ["grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass",],
    ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt",],
    ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt",],
    ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt",],
];

/* Generates the world from HARDCODED board */
Minecraft.generateWorld = function (world) {

    for (var i = 0; i < world.length; i++) {
        $(`#world`).append(`<div class='row row-world justify-content-center'>`);
        for (var j = 0; j < world[0].length; j++) {
            $(`.row-world:nth-child(${i + 1})`).append(`<div class='pixel ${Minecraft.world[i][j]}'>`);
        }
    }
    $("#menu").append("<div id='shovel' class='tools'>");
    $("#menu").append("<div id='axe' class='tools'>");
    $("#menu").append("<div id='pickaxe' class='tools'>");
    $("#menu").append("<div id='shear' class='tools'>");
    $("#menu").append("<div id='mower' class='tools'>");                // tondeuse added
    $("#menu2").append("<div id='dirt' class='blocks'>");
    $("#menu2").append("<div id='tree' class='blocks'>");
    $("#menu2").append("<div id='stone' class='blocks'>");
    $("#menu2").append("<div id='leaf' class='blocks'>");
    $("#menu2").append("<div id='grass' class='blocks'>");
}

/* Space reserved for all mouse events listeners */
Minecraft.mouseInteractions = function () {

    $(`.pixel`).on(`mouseover`, function () {
        $(this).addClass(`hovered`);
        $(`.hovered`).on(`mouseout`, function () {
            $(this).removeClass(`hovered`);
        });
    });

    $(`.tools`).on(`click`, function (e) {
        var tool = e.target.id;
        $(`.tools`).removeClass(`selected`);
        $(`.blocks`).removeClass(`selected`);
        $(`#${tool}`).addClass(`selected`);
        $(`.${Minecraft.tools.get(tool)}`).on("click", function (e) {
            $(e.target).addClass(`sky`);
            $(e.target).removeClass(Minecraft.tools.get(tool));
        });
    });

    $(`.blocks`).on(`click`, function (e) {
        var block = e.target.id;
        $(`.tools`).removeClass(`selected`);
        $(`.blocks`).removeClass(`selected`);
        $(`#${block}`).addClass(`selected`);
        $(".pixel").off("click");
        $(`.sky`).on("click", function (e) {
            $(e.target).addClass(`${block}`);
            $(e.target).removeClass(`sky`);
        });
    });
}

Minecraft.counterBlocks = function () {

}

/* Initiates the game */
Minecraft.start = function () {
    Minecraft.startModal();
    Minecraft.generateWorld(Minecraft.world);
    Minecraft.mouseInteractions();
}

Minecraft.startModal = function () {
    $('#startModal').modal({
        backdrop: 'static',
        keyboard: false
    })
    $(".continue").on("click", function () {
        $('#startModal').css(`display`, `none`); // doesn't work with the class hide
        $('.modal-content').addClass("hide");
        $(".modal-backdrop").addClass("hide");
    })
    $("#instruction").on("click", function () {
        $('.modal-instruction').css(`display`, `block`); // doesn't work with the class hide
        $('.modal-content').addClass("hide");
    });
};

Minecraft.start();