// Waitlist form functionality using EmailJS (https://www.emailjs.com/)
// 1. Sign up at emailjs.com and create a service, template, and get your user ID.
// 2. Replace the placeholders below with your actual EmailJS service ID, template ID, and user ID.


// EmailJS configuration
// SERVICE_ID = 'service_cerea1ai';
// TEMPLATE_ID = 'template_wlemail';
// PUBLIC_KEY = '0wPb_FbtKsw-mauE0';

function initWaitlistForm() {
	const form = document.getElementById('waitlistForm');
	const success = document.getElementById('successMessage');
	if (!form) return;

	form.addEventListener('submit', function(e) {
		e.preventDefault();
		const name = form.name.value.trim();
		const email = form.email.value.trim();

		form.querySelector('button[type="submit"]').disabled = true;
		form.querySelector('button[type="submit"]').textContent = 'Joining...';

			emailjs.send("service_cerea1ai", "template_89k2qqd", {
				name: name,
				email: email
			})
            emailjs.send("service_cerea1ai", "template_wlemail", {
				name: name,
				email: email
			})
		.then(function(response) {
			form.reset();
			success.textContent = 'Thank you! You’re on the list. 🥣';
			success.style.display = 'block';
			setTimeout(() => { success.style.display = 'none'; }, 4000);
		}, function(error) {
			success.textContent = 'Sorry, there was a problem. Please try again.';
			success.style.display = 'block';
			// For debugging: log error to console
			console.error('EmailJS error:', error);
		})
		.finally(() => {
			form.querySelector('button[type="submit"]').disabled = false;
			form.querySelector('button[type="submit"]').textContent = 'Join the waitlist';
		});
	});
}

function loadEmailJSSDKAndInit() {
	if (window.emailjs && window.emailjs.init) {
		emailjs.init("0wPb_FbtKsw-mauE0");
		initWaitlistForm();
	} else {
		const script = document.createElement('script');
		script.src = 'https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js';
		script.onload = function() {
			emailjs.init("0wPb_FbtKsw-mauE0");
			initWaitlistForm();
		};
		document.head.appendChild(script);
	}
}

document.addEventListener('DOMContentLoaded', loadEmailJSSDKAndInit);
