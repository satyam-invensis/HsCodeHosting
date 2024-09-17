document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('predictionForm');
    const loading = document.getElementById('loading');
    const tryAnotherBtn = document.querySelector('.try-another-btn');

    if (tryAnotherBtn) {
        tryAnotherBtn.addEventListener('click', () => {
            // Redirect to the specified URL
            window.location.href = 'http://127.0.0.1:5500/Frontend/index.html';
        });
    } else {
        console.error('Button with class "try-another-btn" not found.');
    }

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent the default form submission

            const formData = new FormData(form);

            loading.style.display = 'block'; // Show loading indicator

            fetch('http://localhost:3000/predict', {
                method: 'POST',
                body: new URLSearchParams(formData)
            })
            .then(response => {
                loading.style.display = 'none'; // Hide loading indicator

                if (response.ok) {
                    return response.text(); // Get HTML response
                } else {
                    throw new Error('Failed to get prediction results');
                }
            })
            .then(html => {
                // Create a new document and insert the HTML
                const newWindow = window.open('', '_blank');
                newWindow.document.open();
                newWindow.document.write(html);
                newWindow.document.close();
            })
            .catch(error => {
                loading.style.display = 'none'; // Hide loading indicator
                console.error('Error:', error);
                alert('There was an error processing your request.');
            });
        });
    } else {
        console.error('Form with id "predictionForm" not found.');
    }
});
