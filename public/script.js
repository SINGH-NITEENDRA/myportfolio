// Handle form submission using Fetch API
const contactForm = document.getElementById('contactForm');
const confirmationPopup = document.getElementById('confirmationPopup');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission

    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        contact: formData.get('contact'),
        message: formData.get('message')
    };

    try {
        const response = await fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // Send as JSON
        });

        if (response.ok) {
            confirmationPopup.classList.remove('hidden'); // Show the confirmation popup
        } else {
            alert('There was an error submitting your details. Please try again.');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error. Please try again.');
    }
});

// Close the confirmation popup
function closePopup() {
    confirmationPopup.classList.add('hidden');
}
