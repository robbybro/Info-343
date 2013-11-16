/*
	Robby Brosman, SID # 1142386, Info 343 Homework #3
*/

$(function() { // Document Ready
	console.log("Document Loaded.");

	// change logo when user interacts with it
	$('.navbar-brand').mouseover(function() {
		$('.navbar-brand img').attr('src', 'img/logo-inverse.png');
	}).mouseout(function() {
		$('.navbar-brand img').attr('src', 'img/logo.png');
	});

	asideinator(); // give the aside good functionality
	renderMenu(); // populates the menu with its items.
});


/*
	populates the Dawg Pizza Menu dynamically using a js object.
*/
function renderMenu() {
	var menu = com.dawgpizza.menu;
	// grab templates for duplication
	var pizzaTemplate = $('.pizza-template');
	var drinkDessert = $('.drink-dessert-template')

	$.each(com.dawgpizza.menu.pizzas, function() {
		var pizzaTemplateClone = pizzaTemplate.clone();
		// populate the clone's fields
    	pizzaTemplateClone.find('.name').html(this.name);
    	pizzaTemplateClone.find('.description').html(this.description + " " 
    		+ this.prices[0]+"/"+this.prices[1]+"/"+this.prices[2]);
	    
	    if(this.vegetarian) { // put in the vegetarian menu.
	    	$('#veggie-spot').append(pizzaTemplateClone);
	    } else { // put in the carnivore menu.
	    	$('#meat-spot').append(pizzaTemplateClone);
	    }
	});

	$.each(com.dawgpizza.menu.drinks, function() {
		console.log(this.name + ", $" + this.price);
		$('#drinks').append('<li>' + this.name + ", $" + this.price + '</li>');
	});

	$.each(com.dawgpizza.menu.desserts, function() {
		console.log(this.name + ", $" + this.price);
		$('#desserts').append('<li>' + this.name + ", $" + this.price + '</li>');
	});
}


/*
	populates and animates aside
*/
function asideinator() {
	// hide all children of aside elements
	$('#hoursChild').hide();
	$('#addressChild').hide();
	$('#contactChild').hide();
	$('#socialChild').hide();

	// set all parts of aside to toggle upon clicking
	var toggleTime = 400;
	$('#hours').click(function() {
		$('#hoursChild').toggle(toggleTime);
	});

	$('#address').click(function() {
		$('#addressChild').toggle(toggleTime);
	});

	$('#contact').click(function() {
		$('#contactChild').toggle(toggleTime);
	});

	$('#social').click(function() {
		$('#socialChild').toggle(toggleTime);
	});
}