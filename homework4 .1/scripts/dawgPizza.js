/*
	Robby Brosman, SID # 1142386, Info 343 Homework #3
*/

// global cart variable, updated in addToCart() and passed to back end in placeOrder()
var cart = {
        name: null,
        address1: null,
        zip: null,
        phone: null,
        items: [] //empty array
    }; //cart data

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
	$('.form-control').hide();
	$('.order').click(renderOrderMenu);

	// keep add-to-cart data attributes updated
	//----------------------for pizza--------------
	// initial setting
	$('.pizza-template select').parent().find('button').attr({
		'data-size': $(this).find(':selected:first').text(),
		'data-price': $(this).find('option:first').val()
	});
	// every time after
	$('.pizza-template select').change(function() {
		$(this).parent().find('button').attr({
			'data-size': $(this).find(":selected").text(),
			'data-price': $(this).val()
		});
	});
	//----------------------for drink/dessert--------------
	// initial setting
	$('.drink-dessert-template input').parent().find('button').attr({
		'data-qty': $(this).val()
	});
	// every time after
	$('.drink-dessert-template input').change(function() {
		$(this).parent().find('button').attr({
			'data-qty': $(this).val()
		});
	});

}); //Document Ready


/*
	populates the Dawg Pizza Menu dynamically using a js object.
*/
function renderMenu() {
	var menu = com.dawgpizza.menu;
	// grab templates for duplication
	var pizzaTemplate = $('.pizza-template');
	var drinkDessertTemplate = $('.drink-dessert-template');
	$.each(com.dawgpizza.menu.pizzas, function() {
		var pizzaTemplateClone = pizzaTemplate.clone();
		// populate the clone's fields
    	pizzaTemplateClone.find('.name').html(this.name);
    	pizzaTemplateClone.find('.description').html(this.description + " " 
    		+ this.prices[0]+"/"+this.prices[1]+"/"+this.prices[2]);

    	// data-type="" data-name="" data-qty="" data-price=""
    	pizzaTemplateClone.find('button.form-control').attr({
    		"data-type": this.type,
    		"data-name": this.name
    	});
    	// add prices to select options
    	var pizza = this;
	    $.each(pizzaTemplateClone.find('select').children(), function(idx) {
	    	$(this).val(pizza.prices[idx]);
	    });
	    if(this.vegetarian) { // put in the vegetarian menu.
	    	$('#veggie-spot').append(pizzaTemplateClone);
	    } else { // put in the carnivore menu.
	    	$('#meat-spot').append(pizzaTemplateClone);
	    }
	});

	$.each(com.dawgpizza.menu.drinks, function() {
		var drinkDessertTemplateClone = drinkDessertTemplate.clone();
		// populate the clone's fields
		drinkDessertTemplateClone.find('.name').html(this.name);

		// data-type="" data-name="" data-qty="" data-price=""
    	drinkDessertTemplateClone.find('button.form-control').attr({
    		"data-type": this.type,
    		"data-name": this.name,
    		"data-price": this.price
    	});

		$('#drinks').append(drinkDessertTemplateClone);
	});

	$.each(com.dawgpizza.menu.desserts, function() {
		var drinkDessertTemplateClone = drinkDessertTemplate.clone();
		// populate the clone's fields
		drinkDessertTemplateClone.find('.name').html(this.name);
		// data-type="" data-name="" data-qty="" data-price=""
    	drinkDessertTemplateClone.find('button.form-control').attr({
    		"data-type": this.type,
    		"data-name": this.name,
    		"data-price": this.price
    	});

		$('#desserts').append(drinkDessertTemplateClone);
	});
}


/*
	populates the Dawg Pizza menu and gives order functionality
*/
function renderOrderMenu() {
	$('.form-control').show();
	$('button.form-control').click(addToCart);
	$('.order').addClass('check-out');
	$('.check-out').removeClass('.order').html('Check Out').click(checkOut);
	$('html,body').animate({
          scrollTop: $('#menu').offset().top - 100
        }, 1000);
	// show cart
	$('.cart').show();
}

function addToCart() {
	if($(this).attr('data-type') == 'pizza') {
		// get pizz-ey things
	    var newCartItem = {
	        type: this.getAttribute('data-type'),
	        name: this.getAttribute('data-name'),
	        size: this.getAttribute('data-size'),
	        price: this.getAttribute('data-price')
	    };
	} else {
		// get dessert-ey and drink-ey things
		var newCartItem = {
	        type: this.getAttribute('data-type'), // drink or dessert?
	        name: this.getAttribute('data-name'),
	        quantity: this.getAttribute('data-qty'),
	        price: this.getAttribute('data-price')
	    };
	}

    //push the new item on to the items array
	console.log(newCartItem);
    cart.items.push(newCartItem);
	$(this).parent().attr('data-index', jQuery.inArray( $(this), cart.items ));
    //render the cart's contents to the element in cart container
    renderCart();
}

function renderCart() {
	var totalPrice = 0;
	$('.cart-container').empty();
	$.each(cart.items, function(){
		console.log("this: ");
		console.log(this);
		if(this.type =="pizza") {
			var pizzaCartObjectClone = $('.pizza-cart-object').clone();
			pizzaCartObjectClone.find('.pizza-name').html(this.name);
			pizzaCartObjectClone.find('.pizza-size').html(this.size);
			pizzaCartObjectClone.find('.pizza-price').html("$" + this.price);
			$('.cart-container').append(pizzaCartObjectClone[0]);
			console.log('cloning pizza');
			totalPrice = +totalPrice + +this.price;
		} else if(this.type == "drink" || this.type == "dessert") {
			var subtotal = this.price * this.quantity;
			totalPrice = +totalPrice + +subtotal;
			var drinkDessertCartObjectClone  = $('.drink-dessert-cart-object').clone();
			drinkDessertCartObjectClone.find('.drink-dessert-name').html(this.name);
			drinkDessertCartObjectClone.find('.drink-dessert-qty').html("qty: " + this.quantity);
			drinkDessertCartObjectClone.find('.drink-dessert-subtotal').html("$" + subtotal);
			$('.cart-container').append(drinkDessertCartObjectClone[0]);
			console.log('cloning drink or dessert');
		}
	});
	console.log('total price: $' + totalPrice);
	$('.total').html(totalPrice);
	// remove cart items from cart
	$('.remove-item').click(function() {
		console.log('removing item...');
	    var idxToRemove = $(this).parent().attr('data-index');
    	cart.items.splice(idxToRemove, 1);
    	renderCart(); // update the cart view after removal
	});
}

function checkOut() {
	console.log('checking out...');
	$('#menu .form-control').hide(); // hide add to cart items
	$('.place-order').show().click(placeOrder);
	$('.cart').animate({
		opacity: '1',
		height: $(window).height
	}, 200);
	// make the order area full screen
	// show name, address, phone, etc.
	$('.customer-info').show();
	// new place order button that"actually" places order
}

/*Place the order*/
function placeOrder() {
	// grab all of the personal info input and throw it in the cart
	// Name, address1, address2, zip, phone, 
	cart.name = $('#first-name').val() + " " + $('#last-name').val();
	cart.address1 = $('#addr-1').val();
	cart.address2 = $('#addr-2').val();
	cart.zip = $('#zip').val();
	cart.phone = $('#phone').val();
	console.log(JSON.stringify(cart));

	$.ajax({
    url: 'http://dawgpizza.com/orders/',
    type: 'POST',
    data: JSON.stringify(cart),
    contentType: 'application/json',
    success: function(responseData) {
        //code to run after successful post
        console.log(responseData);
        $('.cart h2').html(responseData.message);
        $('.cart h2').fadeIn();
    },
    error: function(jqXHR, status, errorThrown) {
        //error with post--alert user
        alert(errorThrown || status);
    }
}); //ajax()
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

/*
{
    "name": "Jane Student",
    "address1": "123 University Ave",
    "address2": "Apt 555",
    "zip": "98999",
    "phone": "206-999-9999",
    "nextUrl": "...url to go to next...",
    "nextCaption": "...optional text for next link...",
    "items": [
        {
            "type": "pizza",
            "name": "Classic Pepperoni",
            "size": "large"
        },
        {
            "type": "drink",
            "name": "Coke",
            "quantity": 4
        },
        {
            "type": "drink",
            "name": "Irn Bru"
        },
        {
            "type": "dessert",
            "name": "Lemon Sorbet",
            "quantity": 2
        }
    ]
}
	*/