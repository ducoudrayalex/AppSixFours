
//var fluxRSS = "news_FR_flux.xml"; //URL du flux
//var fluxRSSActus = "http://www.ville-six-fours.fr/feed/feedname";
//var fluxRSSAgenda = "http://www.ville-six-fours.fr/feed/feedevents";
function AjaxListview(fluxRSS, idlistview, idcontenuflux, idcontenuRSS, liencontenu) {
    console.log(fluxRSS);
    var stockFluxRSS = [];
    var retourHtml = "";
    $.ajax({
        type: "get",
        url: fluxRSS,
        dataType: "xml",
        success: function (xml) {
            $(xml).find('item').each(function (id, valeur) {
                var elementRSS = {
                    image: $(valeur).find('url').text(),
                    titre: $(valeur).find('title').text(),
                    description: $(valeur).find('description').text(),
                    datePublication: $(valeur).find('pubDate').text()
                };
                stockFluxRSS.push(elementRSS);
            });

            $.each(stockFluxRSS, function (id, valeur) {
                retourHtml += '<li><a id ="' + id + '"  class="' + liencontenu + '">\
                <p><h1 class="titre">' + valeur.titre + '</h1></p>\
                <small>' + valeur.datePublication + '</small>\
                </a></li>';
            });
            $(idlistview).append(retourHtml);// insersion dans index.html  
            //$(idlistview).listview('refresh');
            $('.' + liencontenu).click(function () {
                var id = parseInt($(this).attr('id'));
                $.mobile.changePage(idcontenuflux, {
                    transition: "slide"
                });
                //console.log(stockFluxRSS[id].description);
                $(idcontenuRSS).html('<div class="jumbotron"><h2 class="well">' + stockFluxRSS[id].titre + '</h2>\
					<p><img src="' + stockFluxRSS[id].image + '" class="img-responsive" alt="image article"><br>' + stockFluxRSS[id].description + '</p></div>');
            });
        },
        error: function (xml, status, xhr) {
            alert("Pour consulter les actus et l'agenda veuillez vous connecter à internet");
        },
        complete: function () {
            $(idlistview).listview('refresh');
            
        }
    });
    
}
$(document).ready(function () {
    $('#Actus').on('pageshow', function () {
        AjaxListview("http://www.ville-six-fours.fr/feed/feedname", "#elementFluxRSS", "#PageContenuFluxActus", "#contenuRSSActus", "liencontenuactus");
    });
    $('#Agenda').on('pageshow', function () {
        AjaxListview("http://www.ville-six-fours.fr/feed/feedevents", "#listeFluxRSSAgenda", "#PageContenuFluxAgenda", "#contenuRSSAgenda", "liencontenuagenda");
    });


});

