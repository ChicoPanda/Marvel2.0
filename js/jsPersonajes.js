// Public Key
// 7c7b7514bb9a2b5d0b256b6821ca7b43

var marvelAPI = 'https://gateway.marvel.com/v1/public/characters?limit=10&apikey=7c7b7514bb9a2b5d0b256b6821ca7b43';
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

            if (results[i].description === null ||results[i].description == "" || results[i].description === null || results[i].description === undefined || results[i].description === undefined) {
                descripcion = "No tiene descripcion por desgracia";
            } else {
                descripcion = results[i].description;
            }
            if (results[i].thumbnail.length > 0) {
                imgPath = results[i].thumbnail.path + '/standard_xlarge.' + results[i].thumbnail.extension;
                nodo = `<div class="item">
                                        <h3>${results[i].name}</h3>
                                        <div class="info">
                                        <img src=${imgPath}></img>
                                        <span>Description: <br>${descripcion}</span><br></div>
                                        <input type=button class="votar" value="Valorar"/>
                                    </div>`;
            } else {
                imgPath = imgPath = results[i].thumbnail.path + "/standard_xlarge." + results[i].thumbnail.extension;
                nodo = `<div class="item">
                                        <h3>${results[i].name}</h3>
                                        <div class="info">
                                        <img src=${imgPath}></img>
                                        <span>Description: <br>${descripcion}</span><br></div>
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

function paginate(options) {
    // Notice that this function has exactly the same logic as the basic example,
    // but with some hardcoded values replaced by properties in `options`.
    var items = $(options.itemSelector);
    var numItems = items.length;
    var perPage = options.itemsPerPage;
    items.slice(perPage).hide();
    $(options.paginationSelector).pagination({
        items: numItems,
        itemsOnPage: perPage,
        cssStyle: "light-theme",
        onPageClick: function (pageNumber) {
            var showFrom = perPage * (pageNumber - 1);
            var showTo = showFrom + perPage;
            items.hide().slice(showFrom, showTo).show();
            // By returning false in this function
            // we prevent the plugin from changing the page fragment
            // (i.e. the "#page-3" added to your page URL).
            // This is desirable when there are multiple paginators on the page,
            // as that fragment (unmodified) isn't tied to a specific paginator.
            return false;
        }
    });
}