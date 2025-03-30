// Legendary Resume & Contact Sections JavaScript

document.addEventListener('DOMContentLoaded', () => {
    /* ----------------- Contact Form Submission ----------------- */
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    const formError = document.getElementById('form-error');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Collect form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            // Prepare the emailJS parameters
            const emailParams = {
                from_name: data.from_name,
                from_email: data.from_email,
                phone: data.phone || "N/A",
                subject: data.subject,
                message: data.message,
            };

            // Send the email using EmailJS
            emailjs.send("service_0ietc2e", "template_jihmbkn", emailParams, "QCLwAOKe38NGkZrCE")
                .then(() => {
                    // On success, show success message and reset form
                    formSuccess.classList.remove('hidden');
                    formError.classList.add('hidden');
                    contactForm.reset();
                    setTimeout(() => {
                        formSuccess.classList.add('hidden');
                    }, 5000);
                })
                .catch((error) => {
                    console.error("EmailJS Error:", error);
                    // On error, show error message
                    formError.classList.remove('hidden');
                    formSuccess.classList.add('hidden');
                    setTimeout(() => {
                        formError.classList.add('hidden');
                    }, 5000);
                });
        });
    }
});
