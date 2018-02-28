var marvelAPI = 'https://gateway.marvel.com:443/v1/public/comics?limit=10&offset=0&apikey=2e6e2343a738921e86db6c5e55fc1784';
$.ajax({
    method: "GET",
    url: marvelAPI,
    success: function (response) {
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
                nodo = `<div class="item">
                                        <h3>${results[i].title}</h3>
                                        <div class="info">
                                        <img src=${imgPath}></img>
                                        <span>Description: <br>${descripcion}</span><br></div>
                                        <input type=button class="votar" value="Valorar"/>
                                    </div>`;
            } else {
                imgPath = imgPath = results[i].thumbnail.path + "/standard_xlarge." + results[i].thumbnail.extension;
                nodo = `<div class="item">
                                        <h3>${results[i].title}</h3>
                                        <div class="info">
                                        <img src=${imgPath}></img>
                                        <span>Description: <br>${descripcion}</span><br>
                                        </div>
                                        <input type=button class="votar" value="Valorar"/>
                                    </div>`;
            }


            $('#results').append(nodo);


        }
        $(".votar").on("click", function () {
            
            localStorage.setItem("imagen",$(this).parent().find("img")[0].src);
            localStorage.setItem("nombre",$(this).parent().find("h3")[0].innerText);
            localStorage.setItem("descripcion",$(this).parent().find("span")[0].innerText);
            location.href="voto.html";

        });
        $('#spiner').hide();
    },
    error: function () {
        alert('Fallo en el ajax');
    }
});