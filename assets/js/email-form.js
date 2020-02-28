$(function () {
	//lang change
	$("#lang").change((val) => {
		let lang = val.target.value;
		console.log("val: ", val.target.value);
		if (lang == "en") {
			//cambio a inglés
			$('#menu-us').text("About")
			$("#menu-servicios").text("Services")
			$("#menu-contacto").text("Contact us")
			$("#title1").text("Digital")
			$("#title1").html(`Digital <br />
			<i class="subtitle-back" id="title2">Development Agency</i>`)
			$("#about-text").html(`Our human talent is specialized in development
			Technological, focused on boosting your brand in the digital market. <br />
			Contributing our technical, theoretical and practical knowledge to
			The development of your project.`)
			$("#services-title").text("SERVICES")
			$("#services-subtitle").text("Based on the latest trends and tools, we design the perfect plan to take your brand to another level.")
			$("#serv-1-title").text("Social network presence")
			$("#serv-1-desc").html(`We create, monitor and manage your brand on social networks
			<br />
			Campaign optimization and sectorization`)
			$("#serv-2-title").text("Audiovisual production")
			$("#serv-2-desc").html("We develop your corporate and commercial videos from Zero, concept, message and style.")
			$("#serv-3-title").text("Application development")
			$("#serv-3-desc").text("We carry out schematization, prototype, design and style of your mobile application, based on current UX knowledge.")
			$("#serv-4-title").text("Websites")
			$("#serv-4-desc").text("We develop your business website, plan and manage your SEO and SEM strategy.")
			$("#serv-5-title").text("Event coverage")
			$("#serv-5-desc").text("We cover your event, generate interviews, photographic material, videos and more.")
			$("#serv-6-title").text("Graphic design")
			$("#serv-6-desc").text("We provide branding services, brand identity, promotional images and all possible visual support for your brand.")
			$("#contact-title").text("Contact us")
			$("#form-name").text("Name")
			$("#form-email").text("Email")
			$("#form-message").text("Message")
			$("#form-send").val("Send")
			$("#copyr").html("&copy; Publixity. All rights reserved.")
		} else {
			//cambio a español
			$('#menu-us').text("Nosotros")
			$("#menu-servicios").text("Servicios")
			$("#menu-contacto").text("Contáctanos")
			$("#title1").html(`Agencia de <br />
			<i class="subtitle-back" id="title2">Desarrollo Digital</i>`)
			$("#about-text").html(`Nuestro talento humano está especializado en el desarrollo
			tecnológico, enfocado en impulsar tu marca en el mercado digital.<br />
			Aportando nuestros conocimientos técnicos, teóricos y prácticos para
			el desarrollo de tu proyecto.`)
			$("#services-title").text("Servicios")
			$("#services-subtitle").text("Con base en las últimas tendencias y herramientas, diseñamos el plan perfecto para llevar tu marca a otro nivel.")
			$("#serv-1-title").text("Presencia en redes sociales")
			$("#serv-1-desc").html(` Creamos, gestionamos y/o monitoreamos tu marca en redes
			sociales.
			<br />
			Optimización y sectorización de campañas.`)
			$("#serv-2-title").text("Producción audiovisual")
			$("#serv-2-desc").html("Desarrollamos tus vídeos corporativos y comerciales desde cero, el concepto, mensaje y estilo.")
			$("#serv-3-title").text("Desarrollo de apps")
			$("#serv-3-desc").text("Realizamos esquematización, prototipo, diseño y estilo de tu aplicación móvil, basados en los conocimientos UX actuales.")
			$("#serv-4-title").text("Páginas web")
			$("#serv-4-desc").text("Desarrollamos la página web de tu negocio, planificamos y administramos tu estrategia SEO y SEM.")
			$("#serv-5-title").text("Cobertura de eventos")
			$("#serv-5-desc").text("Cubrimos tu evento, generamos entrevistas, material fotográfico, vídeos y más.")
			$("#serv-6-title").text("Diseño gráfico")
			$("#serv-6-text").text("Prestamos servicios de branding, identidad de marca, imágenes promocionales y todo el soporte visual posible para tu marca.")
			$("#contact-title").text("Contáctanos")
			$("#form-name").text("Nombre")
			$("#form-email").text("Correo")
			$("#form-message").text("Mensaje")
			$("#form-send").val("Enviar")
			$("#copyr").html("&copy; Publixity. Todos los derechos reservados.")
		}
	})


	//Form validation
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
			name: $("#lang").value == "es" ? "Por favor introduce tu nombre" : "Please write your name",
			message: {
				required: $("#lang").value == "es" ? "Por favor introduce tu mensaje" : "Please write a message"
			},
			email: $("#lang").value == "es" ? "Por favor introduce un email válido" : "Please enter a valid email address"
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
				$('#emailForm').trigger("reset");
				$.toast({
					heading: $("#lang").value == "es" ? 'Mensaje enviado' : "Message sent",
					text: $("#lang").value == "es" ? 'Tu mensaje se ha enviado con éxito' : "Your message have been successfully sent",
					position: 'bottom-left',
					icon: 'success',
					loader: false
				})
				console.log(res);
			});

			let error = (res => {
				$.toast({
					heading: 'Error',
					text: $("#lang").value == "es" ? 'Ha ocurrido un error al enviar tu mensaje, por favor intenta más tarde' : "There has been an error sending your message, please try again later",
					position: 'bottom-left',
					icon: 'error',
					loader: false
				})
				$('#emailForm').trigger("reset");
				console.log("error", res);
			})
			let dataType = "json";
			$.ajax({
				type: "POST",
				url: url,
				contentType: "application/json",
				data: JSON.stringify(data),
				success: success,
				error: error,
				dataType: dataType
			});
			console.log(data);
		}
	});
});

