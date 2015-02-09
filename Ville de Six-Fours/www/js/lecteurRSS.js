$(document).ready(function () {
    //var fluxRSS = "news_FR_flux.xml"; //URL du flux
    var fluxRSSActus = "http://www.ville-six-fours.fr/feed/feedname";
    
    function AjaxListview(fluxRSS,idlistview,idcontenuflux,idcontenuRSS,liencontenu){
        console.log(fluxRSS);
        var stockFluxRSS = [];
        var retourHtml = "";
        $.ajax({
        type: "get",
        url: fluxRSS,
        dataType: "xml",
        success: function (xml){
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
            retourHtml += '<li><a id ="' + id + '"  class="'+liencontenu+'">\
                <p><h1 class="titre">' + valeur.titre + '</h1></p>;\
                <small>' + valeur.datePublication + '</small>\
                </a></li>';
                
                
        });
        $(idlistview).append(retourHtml);// insersion dans index.html  
        //$("#elementFluxRSS").listview();
        $('.'+liencontenu).click(function () {
            var id = parseInt($(this).attr('id'));
            $.mobile.changePage(idcontenuflux, {
                transition: "slide"
            });
            //console.log(stockFluxRSS[id].description);
            $(idcontenuRSS).html('<div class="jumbotron"><h2 class="well">' + stockFluxRSS[id].titre + '</h2>\
					<img src="' + stockFluxRSS[id].image + '" alt="image article"><p>' + stockFluxRSS[id].description + '</p></div>');
        });
        },
        error: function(xml, status, xhr){
            console.log(status);
        },
        complete: function(){
            $(idlistview).listview();
        }
    });
    function processusOK(xml,idlistview,idcontenuflux,idcontenuRSS) {
        
        //Response.ContentType = "text/xml";
    }
    function processusKO(xml, status, xhr) {
        

    }
    function finish() {
        $(idlistview).listview('refresh');
    }
    }
    
    var fluxRSSAgenda = "http://www.ville-six-fours.fr/feed/feedevents";
    
   AjaxListview("http://www.ville-six-fours.fr/feed/feedname","#elementFluxRSS","#PageContenuFluxActus","#contenuRSSActus","liencontenuactus");
   AjaxListview("http://www.ville-six-fours.fr/feed/feedevents","#listeFluxRSSAgenda","#PageContenuFluxAgenda","#contenuRSSAgenda","liencontenuagenda");
});

