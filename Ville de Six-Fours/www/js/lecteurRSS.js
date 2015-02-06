$(document).ready(function () {
    //var fluxRSS = "news_FR_flux.xml"; //URL du flux
    var fluxRSS = "http://www.ville-six-fours.fr/feed/feedname";
    var stockFluxRSS = [];
    var retourHtml = "";
    $.ajax({
        type: "get",
        url: fluxRSS,
        dataType: "xml",
        success: processusOK,
        error: processusKO,
        complete: finish
    });
    function processusOK(xml) {
        $(xml).find('item').each(function (id, valeur) {
            var elementRSS = {
                image: $(valeur).find('image').text(),
                titre: $(valeur).find('title').text(),
                description: $(valeur).find('description').text(),
                datePublication: $(valeur).find('pubDate').text()
            };
            stockFluxRSS.push(elementRSS);
        });

        $.each(stockFluxRSS, function (id, valeur) {
            retourHtml += '<li>\
                <a id ="' + id + '"  class="lienContenu">\
                <p><h1 class="titre">' + valeur.titre + '</h1></p>;\
                <small>' + valeur.datePublication + '</small>\
                </a>\
                </li>';
        });
        $("#elementFluxRSS").append(retourHtml);// insersion dans index.html  
        //$("#elementFluxRSS").listview();
        $('.lienContenu').click(function () {
            var id = parseInt($(this).attr('id'));
            $.mobile.changePage("#contenuFlux", {
                transition: "slide"
            });
            //console.log(stockFluxRSS[id].description);
            $("#contenuRSS").html('<div class="jumbotron"><h2 class="well">' + stockFluxRSS[id].titre + '</h2>\
					<img src="' + stockFluxRSS[id].image + '" alt="image article"><p>' + stockFluxRSS[id].description + '</p></div>');
        });
        //Response.ContentType = "text/xml";
    }
    function processusKO(xml, status, xhr) {
        console.log(status);

    }
    function finish() {
        $("#elementFluxRSS").listview('refresh');
    }
});

