$(function () {
	function isNullOrWhitespace(input) {

		if (typeof input === 'undefined' || input == null) return true;

		return input.replace(/\s/g, '').length < 1;
	}
	jQuery.validator.addMethod("validateNullOrWhiteSpace", function (value, element) {
		return !isNullOrWhitespace(value);
	}, "No se permiten valores en blanco");
	// Initialize form validation on the registration form.
	// It has the name attribute "registration"
	$("form[name='email']").validate({
		// Specify validation rules
		rules: {
			// The key name on the left side is the name attribute
			// of an input field. Validation rules are defined
			// on the right side
			name: {
				required: true,
				validateNullOrWhiteSpace: true
			},
			email: {
				required: true,
				// Specify that email should be validated
				// by the built-in "email" rule
				email: true,
				validateNullOrWhiteSpace: true
			},
			message: {
				required: true
			}
		},
		// Specify validation error messages
		messages: {
			name: "Por favor introduce tu nombre",
			message: {
				required: "Por favor introduce tu mensaje"
			},
			email: "Por favor introduce un email válido"
		},
		// Make sure the form is submitted to the destination defined
		// in the "action" attribute of the form when valid
		submitHandler: function (form) {
			var data = $("#emailForm").serializeArray().reduce(function (obj, item) {
				obj[item.name] = item.value;
				return obj;
			}, {});
			let url = "http://localhost:8080/api/publixity/mail";
			let success = (res => {
				console.log(res);
			})
			let dataType = "json";
			$.ajax({
				type: "POST",
				url: url,
				contentType: "application/json",
				data: JSON.stringify(data),
				success: success,
				dataType: dataType
			});
			console.log(data);
		}
	});
});

