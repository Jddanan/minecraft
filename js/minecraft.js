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
]);
Minecraft.INIT_BLOCK_COUNT = new Map();

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
    $("#menu").append("<div id='mower' class='tools'>");
    $("#menu2").append("<div id='dirt' class='blocks'>");
    $("#dirt").append("<span id='counter-dirt' class='counter'>");
    $("#menu2").append("<div id='tree' class='blocks'>");
    $("#tree").append("<span id='counter-tree' class='counter'>");
    $("#menu2").append("<div id='stone' class='blocks'>");
    $("#stone").append("<span id='counter-stone' class='counter'>");
    $("#menu2").append("<div id='leaf' class='blocks'>");
    $("#leaf").append("<span id='counter-leaf' class='counter'>");
    $("#menu2").append("<div id='grass' class='blocks'>");
    $("#grass").append("<span id='counter-grass' class='counter'>");
    $(".counter").text(0);                              // Because initially user doesn't have blocks

}

/* All events listeners */
Minecraft.mouseInteractions = function () {

    $(`.pixel`).on(`mouseover`, function () {           // mouseover
        $(this).addClass(`hovered`);
        $(`.hovered`).on(`mouseout`, function () {
            $(this).removeClass(`hovered`);
        });
    });

    $(`.tools`).on(`click`, function (e) {              // Select tool and destroyable block type 
        var tool = e.target.id;
        var block = Minecraft.tools.get(tool);
        $(`.tools`).removeClass(`selected`);
        $(`.blocks`).removeClass(`selected`);
        $(`#${tool}`).addClass(`selected`);
        $(".pixel").off("click");
        $(`.${block}`).on("click", function (e) {
            $(e.target).addClass(`sky`);
            $(e.target).removeClass(block);
            Minecraft.counterBlocks(block);
        });
    });

    $(`.blocks`).on(`click`, function (e) {             // Allow user to build blocks on sky pixels if he has enough inventory
        var block = e.target.id;
        $(`.tools`).removeClass(`selected`);
        $(`.blocks`).removeClass(`selected`);
        $(`#${block}`).addClass(`selected`);
        $(".pixel").off("click");
        $(`.sky`).on("click", function (e) {
            if ($(`#counter-${block}`).text() > 0) {
                $(e.target).addClass(`${block}`);
                $(e.target).removeClass(`sky`);
                Minecraft.counterBlocks(block);
            } else {
                Minecraft.warnUserAboutEmptiness(block);
            }
        });
    });
}

Minecraft.warnUserAboutEmptiness = function (block) {

    $(`#counter-${block}`).addClass(`warning`);
    setTimeout(() => {
        $(`#counter-${block}`).removeClass(`warning`);
    }, 300);
}

/* Count each initial types blocks in the 2D array */
Minecraft.initCounterBlocks = function () {

    for (var i = 0; i < Minecraft.world.length; i++) {
        for (var j = 0; j < Minecraft.world[i].length; j++) {
            var getValue = Minecraft.INIT_BLOCK_COUNT.get(Minecraft.world[i][j]);
            if (typeof getValue !== "number") {
                Minecraft.INIT_BLOCK_COUNT.set(Minecraft.world[i][j], 1);
            } else {
                Minecraft.INIT_BLOCK_COUNT.set(Minecraft.world[i][j], getValue + 1);
            }
        }
    }
}

/* Count blocks with same class as targeted pixel */
Minecraft.counterBlocks = function (block) {

    var START_BLOCK = Minecraft.INIT_BLOCK_COUNT.get(block);
    var counterBlock = $(`#counter-${block}`);
    var counter = 0;
    for (i = 0; i < $(`.${block}`).length; i++) {
        counter++
    }
    counterBlock.text(START_BLOCK - counter)
}

/* Start modal + instructions */
Minecraft.startModal = function () {

    $('#startModal').modal({
        backdrop: 'static',
        keyboard: false
    })
    $(".continue").on("click", function () {
        $('#startModal').css(`display`, `none`); // doesn't work with the class hide
        $('.modal-content').addClass("hide");
        $(".modal-backdrop").addClass("hide");
        $('.modal-instruction').css(`display`, `none`);
    })
    $("#instruction").on("click", function () {
        $('#instructionModal').css(`display`, `block`); // doesn't work with the class hide
        $("#continue").addClass("hide");
        $("#instruction").addClass("hide");

    });
};

/* Initiates the game */
Minecraft.start = function () {
    Minecraft.startModal();
    Minecraft.generateWorld(Minecraft.world);
    Minecraft.mouseInteractions();
    Minecraft.initCounterBlocks();
}



Minecraft.start();