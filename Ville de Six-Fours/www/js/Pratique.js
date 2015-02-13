$(document).on('pageinit', function () {
    $.ajax({
        type: 'get',
        url: 'XMLPratique.xml',
        dataType: 'xml',
        success: function (xml) {
            var stockElementXML = [];
            var retourHtmlService = "";
            var retourHtmlUrgence = "";
            $(xml).find('item').each(function () {
                var categorie = $(this).attr('category');

                $(this).find('service').each(function (valeur) {
                    var elementXML = {
                        nom: $(this).find('nom').text(),
                        tel: $(this).find('tel').text(),
                        category: categorie,
                        lat: $(this).find('lat').text(),
                        long: $(this).find('long').text()
                    };
                    console.log(elementXML);
                    stockElementXML.push(elementXML);
                });
            });
            $.each(stockElementXML, function (id, valeur) {
                if (valeur.category === "Urgence") {
                    retourHtmlUrgence += '<li category="' + valeur.category + '" >\
                <a id ="' + id + '"  class="liencontenuPratique">\
                <p><h4 class="nom">' + valeur.nom + '</h4></p>\
                </a></li>';
                } else {
                    retourHtmlService += '<li category="' + valeur.category + '" >\
                <a id ="' + id + '"  class="liencontenuPratique">\
                <p><h4 class="nom">' + valeur.nom + '</h4></p>\
                </a></li>';
                }
            });
            $('#listServices').html(retourHtmlService);
            $('#listUrgences').html(retourHtmlUrgence);
            $('#listServices').listview({
                autodividers: true,
                filterPlaceholder: "Que cherchez-vous ? ",
                autodividersSelector: function (li) {
                    var out = li.attr('category');
                    return out;
                }
            }).listview('refresh');
            $('#listUrgences').listview({
                autodividers: true,
                filterPlaceholder: "Que cherchez-vous ? ",
                autodividersSelector: function (li) {
                    var out = li.attr('category');
                    return out;
                }
            }).listview('refresh');
            $('.liencontenuPratique').click(function () {
                var id = parseInt($(this).attr('id'));
                $.mobile.changePage("#PageContenuPratique", {
                    transition: "slide"
                });
                //var positionService = new google.maps.LatLng(stockElementXML[id].lat, stockElementXML[id].long);
                //console.log(positionService);
//                $('#PageContenuPratique').on("pageshow", function () {
////                    $('#map_canvas').gmap({'center': '43.1, 5.85', 'zoom': 8});
////                    $('#map_canvas').gmap('addMarker', {'position': positionService}).click(function () {
////                        $(this).gmap('openInfoWindow', {'content': stockElementXML[id].nom}, this);
//                    
//                });
                
//                $('#PageContenuPratique').on("pageshow", function () {
//                    $('#map_canvas').gmap('refresh');
//                });

                //console.log(stockFluxRSS[id].description);
                $("#contenuPratique").html('<h3 style="text-align:center;font-weight:bold;">' + stockElementXML[id].nom + '</h3><br>\
                <a href="tel:' + stockElementXML[id].tel + '">Appeler le ' + stockElementXML[id].tel + '</a>');
            });

        },
        error: function (status) {
            console.log(status);
        }
    });
});


