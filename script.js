document.addEventListener("DOMContentLoaded", function() {
    // Button interaction example
    const exploreButton = document.querySelector("button");
    exploreButton.addEventListener("click", () => {
        window.scrollTo({
            top: document.querySelector("#projects").offsetTop,
            behavior: 'smooth'
        });
    });

    // Message sending functionality
    const messageDisplay = document.getElementById('message-display');
    const userMessage = document.getElementById('user-message');
    const sendMessage = document.getElementById('send-message');


    const contactForm = document.querySelector("form");

    contactForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevents form from refreshing the page

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (name && email && message) {
            alert(`Thank you ${name}! Your message has been sent successfully.
                            We will contact you soon`);
            contactForm.reset(); // Clears the form
        } else {
            alert("Please fill in all the fields before submitting.");
        }
    });
});
