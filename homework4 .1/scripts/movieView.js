/*
    createMovieView()

    Factory for a view that can render a given movie model.
    Uses TemplateView as its prototype and overrides render()
    to create the add to cart buttons for the various formats.

    Note: this should probably be done with a nested view/model
    but this works for now.
*/

function createMovieView(config) {
    var view = createTemplateView(config);

    view.afterRender = function(clonedTemplate){
        //add alt attr to pic
        clonedTemplate.find('.pic').attr('alt', 'Poster for movie ' + this.model.title);

        //add buttons for the various formats, indicating their price
        var format;
        var formatTemplate = clonedTemplate.find('.format-template');
        var clonedFormatTemplate;
        for (format in this.model.prices) {
            clonedFormatTemplate = formatTemplate.clone();
            clonedFormatTemplate.find('.format-price').html(this.model.prices[format]);
            clonedFormatTemplate.find('.format-logo').attr({
                src: 'img/' + format + '.png',
                alt: 'logo for ' + format + ' format'
            });

            //add attributes for moveID and format so we know
            //what movie and format to add to the user's cart
            clonedFormatTemplate.find('button').attr({
                'data-movie-id': this.model.id,
                'data-movie-format': format
            });

            clonedTemplate.append(clonedFormatTemplate);
        }

        //remove the format template
        //this is done instead of hiding it from view
        //either approach would work, but this allows me
        //to hide all the templates using one div at the
        //bottom of the page
        formatTemplate.remove();
    };

    return view;
}
