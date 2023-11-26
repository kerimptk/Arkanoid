$(function () { // Document.Ready    
    $("#GameName").text("Arkanoid");
    var groundWidth = 1100;
    var groundHeight = 750;

    var svg = Pablo('#ground').svg({
        width: groundWidth,
        height: groundHeight,
        fill: 'red'
    });

    //#region Topun tanımı ve özellikleri
    var top;
    var topX = 500;
    var topY = 100;
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
    var yayWidth = 150;
    var yayHeight = 40;

    yay = svg.rect({
        x: yayX,
        y: yayY,
        width: yayWidth,
        height: yayHeight,
        fill: '#933'
    });
    //#endregion

    //#region Tuğla tanımı ve özellikleri 
    var tugla;
    var tuglaGuc;
    var tuglaWidth = 100;
    var tuglaHeight = 25;
    var tuglaX = 0;
    var tuglaY = 0;

    var tuglaUstSinir = 0;
    var tuglaAltSinir = 0;
    var tuglaSolSinir = 0;
    var tuglaSagSinir = 0;

    function tuglaOlustur(x, y) {
        tuglaUstSinir = y;
        tuglaAltSinir = y + tuglaHeight;
        tuglaSolSinir = x;
        tuglaSagSinir = x + tuglaWidth;
        tuglaGuc = 3;
        tuglaY = y;
        tuglaX = x;
        tugla = svg.rect({ // Topu oluşturuyoruz  ve değerlerini setliyoruz
            x: tuglaX,
            y: tuglaY,
            width: tuglaWidth,
            height: tuglaHeight,
            fill: '#933'
        });
    }

    for (var tY = 30; tY < 400; tY = tY + 40) {
        for (var tX = 30; tX < 1100; tX = tX + 120) {
            tuglaOlustur(tX, tY);
        }
    }
    //#endregion

    //#region Topun yönü ve hareketleri
    var yon = [+1, -1];
    var yonX = yon[Math.floor(Math.random() * 2)];
    var yonY = yon[Math.floor(Math.random() * 2)];

    var interval = setInterval(function () {
        zemineCarpma();
        tuglayaCarpma();

        topX = topX + yonX;
        topY = topY + yonY;

        top.attr({ cx: topX, cy: topY });
    }, 2);

    function zemineCarpma() {
        if (topX == topR || topX == groundWidth - topR) { // Top yan duvarlara çarparsa
            yonX = yonX * -1;
        } else if (topY == topR) { //Top üst duvara çarparsa
            yonY = yonY * -1;
        } else if ((yayX <= topX && topX <= (yayX + yayWidth)) && (topY + topR) == yayY) { // top yaya çarparsa
            yonY = yonY * -1;
        }
        else if (topY == groundHeight - topR) { // top yere düşerse
            // clearInterval(interval);
            // $("#ground").text("Game Over");
            yonY = yonY * -1;
        }
    }

    function tuglayaCarpma() {
        if (tuglaGuc > 0) {
            if (topY + topR == tuglaUstSinir && topX - topR >= tuglaSolSinir && topX + topR <= tuglaSagSinir) { // Top tuğla üst sınırına çarparsa
                yonY = yonY * -1;
                tuglaGuc = tuglaGuc - 1;
            }
            if (topY - topR == tuglaAltSinir && topX - topR >= tuglaSolSinir && topX - topR <= tuglaSagSinir) { //Top tuğla alt sınırına çarparsa
                yonY = yonY * -1;
                tuglaGuc = tuglaGuc - 1;
            }
            if (topX + topR == tuglaSolSinir && topY - topR >= tuglaUstSinir && topY + topR <= tuglaAltSinir) { //Top tuğla sol sınırına çarparsa
                yonX = yonX * -1;
                tuglaGuc = tuglaGuc - 1;
            }
            if (topX - topR == tuglaSagSinir && topY - topR >= tuglaUstSinir && topY + topR <= tuglaAltSinir) { // Top tuğla sağ sınırına çarparsa
                yonX = yonX * -1;
                tuglaGuc = tuglaGuc - 1;
            }
            tuglaGuc == 0 ? tugla.remove() : tuglaGuc;
        }
    }
    //#endregion

    //#region Yayın hareketleri
    $(document).mousemove(function (e) { // Mouse ile hareket ettirme
        yayX = e.clientX;
        if (yayX <= (groundWidth - yayWidth)) {
            yay.attr({ x: yayX });
        }
    })

    $(document).keydown(function (e) { // Mouse ile hareket ettirme
        var code = e.which;
        if (code == 37) // sola basıldığında
        {
            yayX = yayX - 30;
            yayX = yayX < 0 ? 0 : yayX;
            yay.attr({ x: yayX });
        }
        else if (code == 39) // sağa basıldığında
        {
            yayX = yayX + 30;
            yayX = yayX > (groundWidth - yayWidth) ? (groundWidth - yayWidth) : yayX;
            yay.attr({ x: yayX });
        }
    })
    //#endregion

})
