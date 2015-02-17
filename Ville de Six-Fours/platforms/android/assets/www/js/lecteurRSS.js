//var fluxRSS = "news_FR_flux.xml"; //URL du flux
//var fluxRSSActus = "http://www.ville-six-fours.fr/feed/feedname";
//var fluxRSSAgenda = "http://www.ville-six-fours.fr/feed/feedevents";
function AjaxArticle() {
    var stockFluxRSS = [];//tableau pour mettre les elements du flux rss
    var retourHtml = "";//chaine de caractere pour inserer du html dans la page
    $.ajax({//appel ajax en jquery
        type: "post",
        url: "http://www.ville-six-fours.fr/feed/feedname",
        dataType: "xml",
        success: function (xml) {
            $(xml).find('item').each(function (id, valeur) {//navigation dans le fichier xml pour chaque item
                var elementRSS = {//on stocke le contenu des balises qui nous intérressent de chaque item 
                    image: $(valeur).find('url').text(),
                    titre: $(valeur).find('title').text(),
                    //description: $(valeur).find('description').text(),
                    desc:$(valeur).find('desc').text(),
                    content: $(valeur).find('content').text()
                };
                stockFluxRSS.push(elementRSS);//on met chaque element dans le tableau pour le parcourir et recuperer les données que l'on veut
            });

//            $.each(stockFluxRSS, function (id, valeur) {
//                retourHtml += '<li><a id ="' + id + '"  class="' + liencontenu + '">\
//                <p><h1 class="titre">' + valeur.titre + '</h1></p>\
//                <small>' + valeur.datePublication + '</small>\
//                </a></li>';
//            });
            var i = 0;

            $.each(stockFluxRSS, function (id, valeur) {//parcours du tableau
                if (i % 2 === 0) {//test pour savoir si i est pair
                    retourHtml += '<div class="row"><div class="col-xs-12"><div class="col-xs-6"><div class="jumbotron">\
                    <a id="' + id + '" class="liencontenuactus"><h5>' + valeur.titre + '</h5>\
                    <img src="' + valeur.image + '" alt="image" class="img-responsive">\
                    <p>' + valeur.desc + '...</p></a></div></div>';
                    //on creer une ligne composée de 12 colonnes par la classe col-xs-12(xs pour petit écran)
                    //on utilise ensuite 6 colonnes pour mettre le lien,l'image et une description de l'article
                } else {
                    retourHtml += '<div class="col-xs-6 "><div class="jumbotron">\
                    <a id="' + id + '" class="liencontenuactus"><h5>' + valeur.titre + '</h5>\
                    <img src="' + valeur.image + '" alt="image" class="img-responsive">\
                    <p>' + valeur.desc + '...</p></a></div></div></div></div>';
                    //on utilise les 6 dernieres rangées disponnible pour creer un autre lien 
                    //vers un autre article pour avoir une presentation de 2 articles par ligne
                }
                i++;
            });
            $("#elementFluxRSS").html(retourHtml);// insersion dans index.html  
            $("#elementFluxRSS").listview('refresh');//rafraichissement de la liste
            $(".liencontenuactus").click(function () {//création du lien entre la liste et la page de l'article par une classe commune
                var id = parseInt($(this).attr('id'));
                $.mobile.changePage("#PageContenuFluxActus", {
                    transition: "slide"
                });
                //console.log(stockFluxRSS[id].description);
                $("#contenuRSSActus").html('<div class="jumbotron"><h2 class="well">' + stockFluxRSS[id].titre + '</h2>\
		<p><img src="' + stockFluxRSS[id].image + '" class="img-responsive" alt="image article"><br>' + stockFluxRSS[id].content + '</p></div>');
            //remplissage de la page d'article
            });
        },
        error: function (xml, status, xhr) {
            alert("Pour consulter les actus et l'agenda veuillez vous connecter à internet");
            console.log(status);
        },
        complete: function () {
            //$(idlistview).listview('refresh');

        }
    });

}
/*
 * fonction identique a celle des actus mais adapté a l'agenda
 */
function AjaxListview(fluxRSS, idlistview, idcontenuflux, idcontenuRSS, liencontenu) {
    console.log(fluxRSS);
    var stockFluxRSS = [];
    var retourHtml = "";
    $.ajax({
        type: "post",
        url: fluxRSS,
        dataType: "xml",
        success: function (xml) {
            $(xml).find('item').each(function (id, valeur) {
                var elementRSS = {
                    image: $(valeur).find('url').text(),
                    titre: $(valeur).find('title').text(),
                    description: $(valeur).find('description').text(),
                    datePublication: $(valeur).find('pubDate').text(),
                    dtevent: $(valeur).find('dtevent').text()
                };
                stockFluxRSS.push(elementRSS);
            });

            $.each(stockFluxRSS, function (id, valeur) {
                retourHtml += '<li date="' + valeur.dtevent + '" >\
                <a id ="' + id + '"  class="' + liencontenu + '">\
                <img src="' + valeur.image + '" class="img-responsive" alt="image"><p><h1 class="titre">' + valeur.titre + '</h1></p>\
                <small>' + valeur.description.substr(0, 20) + '...</small>\
                </a></li>';
            });

//            $.each(stockFluxRSS, function (id, valeur) {
//                retourHtml += '<div class="col-xs-12 jumbotron">\
//              <a id="' + id + '" class="' + liencontenu + '"><p class="titre">' + valeur.titre + '</p>\
//              <img src="' + valeur.image + '" alt="image" class="img-responsive"></div>';
//            });
            $(idlistview).html(retourHtml);// insersion dans index.html 
            $(idlistview).listview({
                autodividers: true,
                filterPlaceholder: "Date, thème, mots clés...",
                autodividersSelector: function (li) {
                    var out = li.attr('date');
                    return out;
                }
            }).listview('refresh');
            //$(idlistview).listview('refresh');
            $('.' + liencontenu).click(function () {
                var id = parseInt($(this).attr('id'));
                $.mobile.changePage(idcontenuflux, {
                    transition: "slide"
                });
                //console.log(stockFluxRSS[id].description);
                $(idcontenuRSS).html('<div class="jumbotron"><h3 class="well">' + stockFluxRSS[id].titre + '</h3>\
					<p><img src="' + stockFluxRSS[id].image + '" class="img-responsive" alt="image article"><br>' + stockFluxRSS[id].description + '</p></div>');
            });

        },
        error: function (xml, status, xhr) {
            alert(status + " : Pour consulter les actus et l'agenda veuillez vous connecter à internet");
        },
        complete: function () {
            //$(idlistview).listview('refresh');

        }
    });
}


function AjaxListviewAvoir(fluxRSS, idlistview, idcontenuflux, idcontenuRSS, liencontenu) {
    console.log(fluxRSS);
    var stockFluxRSS = [];
    var retourHtml = "";
    $.ajax({
        type: "post",
        url: fluxRSS,
        dataType: "xml",
        success: function (xml) {
            $(xml).find('item').each(function (id, valeur) {
                var elementRSS = {
                    image: $(valeur).find('url').text(),
                    titre: $(valeur).find('title').text(),
                    desc: $(valeur).find('desc').text(),
                    content: $(valeur).find('content').text()
                };
                stockFluxRSS.push(elementRSS);
            });

            $.each(stockFluxRSS, function (id, valeur) {
                retourHtml += '<li>\
                <a id ="' + id + '"  class="' + liencontenu + '">\
                <img src="' + valeur.image + '" class="img-responsive" alt="image"><p><h1 class="titre">' + valeur.titre + '</h1></p>\
                <small>' + valeur.desc + '...</small>\
                </a></li>';
            });

//            $.each(stockFluxRSS, function (id, valeur) {
//                retourHtml += '<div class="col-xs-12 jumbotron">\
//              <a id="' + id + '" class="' + liencontenu + '"><p class="titre">' + valeur.titre + '</p>\
//              <img src="' + valeur.image + '" alt="image" class="img-responsive"></div>';
//            });
            $(idlistview).html(retourHtml);// insersion dans index.html 
            $(idlistview).listview('refresh');
            //$(idlistview).listview('refresh');
            $('.' + liencontenu).click(function () {
                var id = parseInt($(this).attr('id'));
                $.mobile.changePage(idcontenuflux, {
                    transition: "slide"
                });
                //console.log(stockFluxRSS[id].description);
                $(idcontenuRSS).html('<div class="jumbotron"><h3 class="well">' + stockFluxRSS[id].titre + '</h3>\
					<p><img src="' + stockFluxRSS[id].image + '" class="img-responsive" alt="image article"><br>' + stockFluxRSS[id].content + '</p></div>');
            });

        },
        error: function (xml, status, xhr) {
            alert(status + " : Pour consulter les actus et l'agenda veuillez vous connecter à internet");
        },
        complete: function () {
            //$(idlistview).listview('refresh');

        }
    });
}
$(document).ready(function () {//evennement d'appel des fonctions ci-dessus
    $('#Actus').on('pagebeforeshow', AjaxArticle);
    $('#Agenda').on('pagebeforeshow', function () {
        AjaxListview("http://centre-loisirs.ville-six-fours.fr/feed/feedeventsloisirs", "#listeFluxRSSAgenda", "#PageContenuFluxAgenda", "#contenuRSSAgenda", "liencontenuagenda");
    });
    $('#Avoir').on('pagebeforeshow',function(){
        AjaxListviewAvoir("http://www.ville-six-fours.fr/feed/feedpatrimoine",'#listeFluxRSSAvoir','#PageContenuFluxAvoir','#contenuRSSAvoir',"liencontenuavoir");
    });
});

var flux = "http://centre-loisirs.ville-six-fours.fr/feed/feedeventsloisirs";