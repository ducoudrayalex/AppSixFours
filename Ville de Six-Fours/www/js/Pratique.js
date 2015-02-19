function listePratique() {
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
                    stockElementXML.push(elementXML);
                });
            });
            $.each(stockElementXML, function (id, valeur) {
                if (valeur.category === "Urgence") {//test si la valeur de l'attribut category du fichier xml est egal à Urgence
                    retourHtmlUrgence += '<li class="' + valeur.category + '" >\
                <a id ="' + id + '"  class="liencontenuPratique">\
                <p><h4 class="nom">' + valeur.nom + '</h4></p>\
                </a></li>';
                } else {
                    retourHtmlService += '<li category="' + valeur.category + '" >\
                <a id ="' + id + '"  class="liencontenuPratique">\
                <p class="nom">' + valeur.nom + '</p>\
                </a></li>';
                }
            });
            //on rempli les deux listes par deux chaines differentes(une par onglet
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

                if (!stockElementXML[id].adresse | !stockElementXML[id].lat && !stockElementXML[id].long) {
                    $('#mapCanvas').hide();
                } else {
                    $('#mapCanvas').show();
                    $('#mapCanvas').html('<iframe width="100%" height="350" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?&key=AIzaSyDSlL_s0uDPis7IK5HgUsJDSZvGlF-w6ZU&q='+stockElementXML[id].lat+','+stockElementXML[id].long+'"></iframe>');
                }
               
//infopratique du service a completer
                if (stockElementXML[id].tel) {
                    $("#infoPratique").html('<h3 style="text-align:center;font-weight:bold;">' + stockElementXML[id].nom + '</h3><br>\
                <p>Téléphone : ' + stockElementXML[id].tel + '</p>\n\
                <p>' + stockElementXML[id].contenu + '</p>');
                } else {
                    $("#infoPratique").html('<h3 style="text-align:center;font-weight:bold;">' + stockElementXML[id].nom + '</h3><br>\
                <p>' + stockElementXML[id].contenu + '</p>');
                }
            });
        },
        error: function (status) {
            alert(status);
        }
    });
}

$(document).ready(function () {
    $('#Pratique').on('pageshow', function () {
        listePratique();
    });


});
