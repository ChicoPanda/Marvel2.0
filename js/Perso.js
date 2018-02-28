$(function () {
    var marvelAPI = 'https://gateway.marvel.com:443/v1/public/comics?limit=100&offset=0&apikey=2e6e2343a738921e86db6c5e55fc1784';
    $.ajax({
        method: "GET",
        url: marvelAPI
    }).done(function (response) {
        var results = response.data.results;
        var resultsLen = results.length;
        var imgPath;
        var nodo;
        var descripcion;
        for (var i = 0; i < resultsLen; i++) {

            if (results[i].VarianDescription === null || results[i].description === null || results[i].VarianDescription === undefined || results[i].description === undefined) {
                descripcion = "No tiene descripcion por desgracia";
            } else {
                descripcion = results[i].description;
            }
            if (results[i].images.length > 0) {


                imgPath = results[i].images[0].path + '/standard_xlarge.' + results[i].images[0].extension;
                nodo = `<div>
                            <p>${results[i].title}</p>
                            <img src=${imgPath}></img><br>
                            <input type=button value="votar"/><br>
                            Description:<br>${descripcion}
                        </div>`;

            } else {
                imgPath = imgPath = results[i].thumbnail.path + "/standard_xlarge." + results[i].thumbnail.extension;
                nodo = `<div>
                            <p>${results[i].title}</p>
                            <img src=${imgPath}></img><br>
                            <input type=button value="votar"/><br>
                            Description:<br>${descripcion}
                        </div>`;
            }
            $('#results').append(nodo);
        }


    });


});