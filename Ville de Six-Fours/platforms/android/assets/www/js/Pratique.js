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
                var category = $(this).attr('category');
                console.log(category);
                $(this).find('service').each(function (valeur) {
                    var elementXML = {
                        nom: $(this).find('nom').text(),
                        tel: $(this).find('tel').text(),
                        category: category
                    };
                    console.log(elementXML);
                    stockElementXML.push(elementXML);
                });
            });
            $.each(stockElementXML, function (id, valeur) {
                if (valeur.category === "Urgence") {
                    retourHtmlUrgence += '<li category="' + valeur.category + '" >\
                <a id ="' + id + '"  class="lienpanel">\
                <p><h4 class="nom">' + valeur.nom + '</h4></p>\
                </a></li>';
                } else {
                    retourHtmlService += '<li category="' + valeur.category + '" >\
                <a id ="' + id + '"  class="lienpanel">\
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
            $('#listUrgences').listview('refresh');
            $('.lienpanel').click(function () {
                var id = parseInt($(this).attr('id'));
                $('#panelpratique').panel('open');
                $('#panelpratique').html('<h3 style="text-align:center;font-weight:bold;">' + stockElementXML[id].nom + '</h3><br>\
                <a href="tel:' + stockElementXML[id].tel + '">Appeler le ' + stockElementXML[id].tel + '</a>');
               
            
            });

        },
        error: function (status) {
            console.log(status);
        }
    });
});


