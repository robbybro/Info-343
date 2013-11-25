/*
    createMoviesModel()

    Creates a model for the list of movies for sale.
    This uses the ListModel as the prototype, but adds 
    a few specific methods.

    The config parameter should contain the following properties:
    - url (string) URL from which we should fetch movie JSON
*/

function createMoviesModel(config) {
    var model = createListModel(config);

    model.refresh = function() {
        if (!this.url)
            throw new 'No url property supplied in config!';

        $.getJSON(this.url, function(movies){
            //set the items
            //prototype will trigger a change event
            model.setItems(movies);
        });

    }; //refresh()

    return model;
} //createMoviesModel()
