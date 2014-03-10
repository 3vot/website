Parse.initialize("IOcg1R4TxCDCPVsxAwLHkz8MPSOJfj2lZwdL4BU4", "jOr74Zy7C8VbatIvxoNyt2c03B9hPY7Hc32byA78");

/* Call functions */
$(document).ready(function() {
	$("#newEmail").click(function(e) {
		e.preventDefault();
		saveEmail();
	});
	$("#newPhoneContact").click(function(e) {
		e.preventDefault();
		savePhoneContact();
	});
	$("#newFooterEmail").click(function(e) {
		e.preventDefault();
		saveFooterEmail();
	});

});

/*------- Email Funtions -------*/
/* Save a Email */
function saveEmail() {
	var newEmail = $("#email").val()
	var Email = Parse.Object.extend("Emails");
	var email = new Email();

	email.set("email", newEmail);

	email.save(null, {
		success: function(){
			console.log("Email guardado correctamente");
			thanksEmail();
		}
	})
}
/* Thanks */
function thanksEmail() {
	$(".beta-panel-home").toggle();
}


/*------- Phone Funtions -------*/
/* Save Phone and Contact Name */
function savePhoneContact() {
	var newName = $("#name").val()
	var newMobile = $("#mobile").val()
	var Contact = Parse.Object.extend("Contacts")
	var contact = new Contact

	if (newName.length >= 1, newMobile.length >= 1) {
		contact.set("name", newName)
		contact.set("mobile", newMobile)
		contact.save(null, {
			success: function(){
				console.log("Contacto guardado");
				thanksPhone();
			}
		})
	} 
	else {
		alert("You must complete all fields")
	}
}

/* Thanks */
function thanksPhone() {
	$("#name").attr('disabled', true);
	$("#mobile").attr('disabled', true);
	$(".sumitPhone").toggle("slow");
}

/*------- Footer Funtions -------*/
/* Save Email */
function saveFooterEmail() {
	var newEmail = $("#emailFooter").val()
	var Email = Parse.Object.extend("Emails");
	var email = new Email();

	email.set("email", newEmail);

	email.save(null, {
		success: function(){
			console.log("Email guardado correctamente");
			thanksEmailFooter();
		}
	})
}

/* Thaks Footer Email */
function thanksEmailFooter () {
	$("#emailFooter").attr('disabled', true);
	$(".yellow-texture h3").html("Thanks! We Will Contact You Soon !")
}




