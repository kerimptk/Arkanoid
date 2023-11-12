$(function () { // Document.Ready    
    $("#GameName").text("Arkanoid Oyunu (Kır Tuğlaları)");
    var groundWidth = 1100;
    var groundHeight = 750;

    var svg = Pablo('#ground').svg({
        width: groundWidth,
        height: groundHeight
    });
    //#region Topun tanımı ve özellikleri
    var top;
    var topX = 500;
    var topY = 300;
    var topR = 10;

    top = svg.circle({ // Topu oluşturuyoruz  ve değerlerini setliyoruz
        cx: topX,
        cy: topY,
        r: topR,
        fill: '#600'
    });
    //#endregion
    //#region Yayın tanımı ve özellikleri
    var yay;
    var yayX = 500;
    var yayY = 700;

    yay = svg.rect({
        x: yayX,
        y: yayY,
        width: 150,
        height: 40,
        fill: '#933'
    });

    //#endregion
    var yon = [+1, -1];
    var yonX = yon[Math.floor(Math.random() * 2)];
    var yonY = yon[Math.floor(Math.random() * 2)];

    var interval = setInterval(function () {
        if (topX == topR || topX == groundWidth - topR) {
            yonX = yonX * -1;
        } else if (topY == topR) {
            yonY = yonY * -1;
        } else if (topY == groundHeight - topR) {
            clearInterval(interval);
            $("#GameState").text("Game Over");
        }

        top.attr({ cx: topX, cy: topY });

        topX = topX + yonX;
        topY = topY + yonY;
    }, 1);
})
