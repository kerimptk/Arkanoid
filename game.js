$(function () { // Document.Ready    
    $("#GameName").text("Arkanoid");
    var groundWidth = 1100;
    var groundHeight = 750;

    var svg = Pablo('#ground').svg({
        width: groundWidth,
        height: groundHeight,
        fill:red
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

    //#region  Topun yönü ve hareketleri
    var yon = [+1, -1];
    var yonX = yon[Math.floor(Math.random() * 2)];
    var yonY = yon[Math.floor(Math.random() * 2)];

    var interval = setInterval(function () { 
        if (topX == topR || topX == groundWidth - topR) { // Top yan duvarlara çarparsa
            yonX = yonX * -1;
        } else if (topY == topR) { //Top üst duvara çarparsa
            yonY = yonY * -1;
        } else if ((yayX <= topX && topX <= (yayX + yayWidth)) && (topY + topR) == yayY) { // top yaya çarparsa
            yonY = yonY * -1;  
        }
        else if (topY == groundHeight - topR) { // top yere düşerse
            clearInterval(interval);
            $("#ground").text("Game Over");
        }        

        topX = topX + yonX;
        topY = topY + yonY;
        
        top.attr({ cx: topX, cy: topY });
    }, 1);
    //#endregion

    //#region Yayın hareketleri
    $(document).mousemove(function (e) { // Mouse ile hareket ettirme
        yayX = e.clientX;
        if (yayX <= (groundWidth - yayWidth)) {
            yay.attr({ x: yayX });
        }
    })

    $(document).keydown(function (e) { // Mouse ile hareket ettirme
        var code = event.which;
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
