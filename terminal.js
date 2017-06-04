$(function () {
    clr();
    println("Initializing...");
    loadHolotape("vergil");
});

function clr() {
    window.terminal.outputBuffer = [];
    delete window.terminal.outputTimeout;
    delete window.terminal.inputTimeout;
    $("#output").html("");
    $("#inputText").text("");
}
function println(text) {
    if (typeof text == "undefined") {
        text = "\n";
    }

    var output = [];
    for (var i = 0; i < text.length; i++) {
        output.push(text.charAt(i));
    }
    window.terminal.outputBuffer.push(["<div></div>", output]);
    printOutput();
}
function menuln(text, onclick, pre) {
    pre = typeof pre == "undefined" ? "" : pre;
    var output = [];
    text = "[" + text + "]";
    for (var i = 0; i < text.length; i++) {
        output.push(text.charAt(i));
    }
    window.terminal.outputBuffer.push(["<div class=menu pre='" + pre + "' function='" + onclick + "'></div>", output]);
    printOutput();
}
function printState(text) {
    window.terminal.inputBuffer += text;
    printInput();
}
function printOutput() {
    if (window.terminal.outputBuffer.length == 0 || window.terminal.outputInterval > 0 && typeof window.terminal.outputTimeout != "undefined") {
        return;
    }

    var currentElement = window.terminal.outputBuffer[0];
    if (currentElement[0] != "") {
        $("#output").append(currentElement[0]);
        currentElement[0] = "";
    }
    $("#output > div:last-child").text($("#output > div:last-child").text() + currentElement[1].shift());
    if (currentElement[1].length == 0) {
        window.terminal.outputBuffer.shift(0, 1);
    }

    //Loop
    if (window.terminal.outputInterval > 0) {
        window.terminal.outputTimeout = setTimeout(function () {
            delete window.terminal.outputTimeout;
            printOutput();
        }, window.terminal.outputInterval);
    } else {
        printOutput();
    }
}
function printInput() {
    if (window.terminal.inputBuffer.length == 0 || window.terminal.outputInterval > 0 && typeof window.terminal.inputTimeout != "undefined") {
        return;
    }

    var currentChar = window.terminal.inputBuffer.substr(0, 1);
    window.terminal.inputBuffer = window.terminal.inputBuffer.substr(1);
    $("#inputText").text($("#inputText").text() + currentChar);

    if (window.terminal.outputInterval > 0) {
        window.terminal.inputTimeout = setTimeout(function () {
            delete window.terminal.inputTimeout;
            printInput();
        }, window.terminal.outputInterval);
    } else {
        printInput();
    }
}

function loadHolotape(holotape) {
    if ($("script[src='holotapes/" + holotape + ".js']").length == 0) {
        $("head").append("<script src=holotapes/" + holotape + ".js></script>");
    }
    if (typeof window.terminal.holotapes[holotape] == "undefined") {
        window.terminal.holotapes[holotape] = new window[holotape]();
    }
    window.terminal.currentHoloband = window.terminal.holotapes[holotape];
    window.terminal.banner = window.terminal.currentHoloband.banner;
    window.terminal.showPage("root");
}

$(document).on("click", "#output > .menu", function (e) {
    e.stopPropagation();
    var pre = $(this).attr("pre");
    var onclick = $(this).attr("function");
    var preInput;
    if (pre != "" && typeof window.terminal.currentHoloband[pre] != "undefined") {
        preInput = window.terminal.currentHoloband[pre]();
    }
    window.terminal.showPage(onclick, preInput);
});
$(document).on("click", "#output", function () {
    if (typeof window.terminal.outputTimeout != "undefined" || typeof window.terminal.inputTimeout != "undefined") {
        window.terminal.outputInterval = 0;
    } else if (window.terminal.nextPage != "") {
        window.terminal.showPage(window.terminal.nextPage);
    }
});
$(document).on("mouseenter", "#output > div.menu", function () {
    $("#output > .menu").removeClass("active");
    $(this).addClass("active");
});
$(document).on("keydown", function (e) {
    if (e.keyCode == 87) {
        //UP
        if ($("#output > .menu.active").length == 0) {
            $("#output > .menu:last-child").addClass("active");
        } else {
            var curIndex = $("#output > .menu").index($("#output > .menu.active"));
            var nextChild = $("#output > .menu").eq(curIndex - 1);
            $("#output > .menu.active").removeClass("active");
            nextChild.addClass("active");
        }
    } else if (e.keyCode == 83) {
        //DOWN
        var curIndex = $("#output > .menu").index($("#output > .menu.active"));
        if (curIndex == -1) {
            $("#output > .menu").eq(0).addClass("active");
        } else if (curIndex == $("#output > .menu").length - 1) {
            $("#output > .menu.active").removeClass("active");
            $("#output > .menu").eq(0).addClass("active");
        } else {
            var nextChild = $("#output > .menu").eq(curIndex + 1);
            $("#output > .menu.active").removeClass("active");
            nextChild.addClass("active");
        }
    } else if (e.keyCode == 69) {
        $("#output > .menu.active").click();
    } else if (e.keyCode == 9) {
        e.preventDefault();
        window.terminal.showPrevious();
    }
});

function htmlEntities(text) {
    return $("<div>").text(text).html();
}

var system = function () {
    this.banner = "";
    this.holotapes = {};
    this.nextPage = "";
    this.currentPage = "root";
    this.previousPage = "";
    this.outputDefaultInterval = 10;
    this.outputInterval = this.outputDefaultInterval;
    this.outputBuffer = [];
    this.inputBuffer = "";

    this.showPage = function (page, preInput) {
        this.outputInterval = this.outputDefaultInterval;
        this.previousPage = this.currentPage;
        this.currentPage = page;
        this.printBanner();
        if (typeof window.terminal.currentHoloband[page] == "undefined") {
            println("Undefined page '" + page + "'");
            this.nextPage = "root";
        } else {
            var pages = this.currentHoloband[page](preInput);
            this.previousPage = "";
            this.nextPage = "";
            if (typeof pages !== "undefined") {
                this.previousPage = typeof this.currentHoloband[pages[0]] !== "undefined" ? pages[0] : "";
                this.nextPage = typeof this.currentHoloband[pages[1]] !== "undefined" ? pages[1] : "";
            }
        }
    };

    this.printBanner = function () {
        clr();
        var text = htmlEntities(this.banner);
        $("#output").html($("#output").html() + "<div>" + text + "</div>");
    };

    this.showPrevious = function () {
        if (this.currentPage == "root" || this.previousPage == "") {
            return;
        }
        if (typeof window.terminal.currentHoloband[this.previousPage] == "undefined") {
            this.showPage("root");
        } else {
            this.showPage(this.previousPage);
        }
    }
};

window.terminal = new system();