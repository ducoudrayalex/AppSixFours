
//var fluxRSS = "news_FR_flux.xml"; //URL du flux
//var fluxRSSActus = "http://www.ville-six-fours.fr/feed/feedname";
//var fluxRSSAgenda = "http://www.ville-six-fours.fr/feed/feedevents";
function AjaxArticle(fluxRSS, idlistview, idcontenuflux, idcontenuRSS, liencontenu) {
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

//            $.each(stockFluxRSS, function (id, valeur) {
//                retourHtml += '<li><a id ="' + id + '"  class="' + liencontenu + '">\
//                <p><h1 class="titre">' + valeur.titre + '</h1></p>\
//                <small>' + valeur.datePublication + '</small>\
//                </a></li>';
//            });
var i=stockFluxRSS.length;

            $.each(stockFluxRSS, function (id, valeur) {
                if(i%2===0){
                    retourHtml += '<div class="row"><div class="col-xs-12"><div class="col-xs-6"><div class="jumbotron">\
              <a id="' + id + '" class="' + liencontenu + '"><h5>' + valeur.titre + '</h5>\
              <img src="' + valeur.image + '" alt="image" class="img-responsive"></a></div></div>';
 
                }else{
                   retourHtml += '<div class="col-xs-6 "><div class="jumbotron">\
              <a id="' + id + '" class="' + liencontenu + '"><h5>' + valeur.titre + '</h5>\
              <img src="' + valeur.image + '" alt="image" class="img-responsive"></a></div></div></div></div>';
  
                }
                i++;
            });
            $(idlistview).html(retourHtml);// insersion dans index.html  
            $(idlistview).listview('refresh');
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
            //$(idlistview).listview('refresh');

        }
    });

}
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

//            $.each(stockFluxRSS, function (id, valeur) {
//                retourHtml += '<div class="col-xs-12 jumbotron">\
//              <a id="' + id + '" class="' + liencontenu + '"><p class="titre">' + valeur.titre + '</p>\
//              <img src="' + valeur.image + '" alt="image" class="img-responsive"></div>';
//            });
            $(idlistview).html(retourHtml);// insersion dans index.html  
            $(idlistview).listview('refresh');
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
            //$(idlistview).listview('refresh');

        }
    });

}
$(document).ready(function () {
    $('#Actus').on('pageshow', function () {
        AjaxArticle("http://www.ville-six-fours.fr/feed/feedname", "#elementFluxRSS", "#PageContenuFluxActus", "#contenuRSSActus", "liencontenuactus");
    });
    $('#Agenda').on('pageshow', function () {
        AjaxListview("http://www.ville-six-fours.fr/feed/feedevents", "#listeFluxRSSAgenda", "#PageContenuFluxAgenda", "#contenuRSSAgenda", "liencontenuagenda");
    });


});

