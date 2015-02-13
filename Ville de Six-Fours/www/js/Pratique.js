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
                        long: $(this).find('long').text(),
                        adresse: $(this).find('adresse').text(),
                        contenu: $(this).find('contenu').text()
                    };
                    console.log(elementXML);
                    stockElementXML.push(elementXML);
                });
            });
            $.each(stockElementXML, function (id, valeur) {
                if (valeur.category === "Urgence") {
                    retourHtmlUrgence += '<li class="' + valeur.category + '" >\
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
                filterPlaceholder: "Que cherchez-vous ? ",
                autodividersSelector: function (li) {
                    var out = li.attr('class');
                    return out;
                }
            }).listview('refresh');
            $('.liencontenuPratique').click(function () {
                var id = parseInt($(this).attr('id'));
                $.mobile.changePage("#PageContenuPratique", {
                    transition: "slide"
                });
                var positionService = new google.maps.LatLng(stockElementXML[id].lat, stockElementXML[id].long);
                var map;
                var markerService;
                $('#PageContenuPratique').on("pageshow", function () {
                    var mapOptions = {
                        zoom: 14,
                        center: positionService
                    };
                    map = new google.maps.Map($('#map_canvas')[0], mapOptions);
                    markerService = new google.maps.Marker({
                        position: positionService,
                        map: map,
                        title: '<h4>' + stockElementXML[id].nom + '</h4>\n\
                        <p>'+stockElementXML[id].adresse+'</p>'
                    });
                    MaPosition(map);

                    var infowindowService = new google.maps.InfoWindow({
                        content: '<h4>' + stockElementXML[id].nom + '</h4>\n\
                        <p>' + stockElementXML[id].adresse + '</p>',
                        position: positionService
                    });
                    google.maps.event.addListener(markerService, 'click', function () {
                        infowindowService.open(map, markerService);
                    });

                    $("#infoPratique").html('<h3 style="text-align:center;font-weight:bold;">' + stockElementXML[id].nom + '</h3><br>\
                <a href="tel:' + stockElementXML[id].tel + '">Appeler le ' + stockElementXML[id].tel + '</a>\n\
                <p>' + stockElementXML[id].contenu + '</p>');
                }
                );
            });
        },
        error: function (status) {
            console.log(status);
        }
    });
});

function MaPosition(map) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var markerPosition = new google.maps.Marker({
                position: pos,
                map: map,
                title: '<h4>Votre position</h4>'
            });
            var infowindowPosition = new google.maps.InfoWindow({
                content: 'Votre position',
                position: pos
            });
            google.maps.event.addListener(markerPosition, 'click', function () {
                infowindowPosition.open(map, markerPosition);
            });
        }, function () {
            handleNoGeolocation(true);
        });
    } else {
        handleNoGeolocation(false);
    }
    function handleNoGeolocation(errorFlag) {
        if (errorFlag) {
            alert('Erreur: Le service de geolocation a échoué.');
        } else {
            alert('Erreur: Votre navigateur ne supporte pas le service de géolocation');
        }
    }
}