document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    // modififie le message du form pour l'afficher
    function showMessage(message, isError = false) {
        formMessage.textContent = message;
        formMessage.style.display = "block";
        formMessage.style.backgroundColor = isError ? "#ffe6e6" : "#e6ffe6";
        formMessage.style.color = isError ? "#dc3545" : "#28a745";
        formMessage.style.padding = "1rem";
        formMessage.style.borderRadius = "4px";
        formMessage.style.marginBottom = "1rem";
    }

    // verifie avec regex si le format du mail est valide
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // recup les infos du form
        const formData = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            subject: form.subject.value.trim(),
            message: form.message.value.trim()
        };

        // verif si tous les champs sont remplis
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showMessage("Veuillez remplir tous les champs du formulaire.", true);
            return;
        }

        // verif si l'email est valide
        if (!isValidEmail(formData.email)) {
            showMessage("Veuillez entrer une adresse email valide.", true);
            return;
        }

        // la faudrait envoyer le mail mais pas possible en JS pur
        // c'est juste pour l'exemple :)
            
        showMessage("Votre message a été envoyé avec succès !");
        form.reset();
    });

    // event listener pour check si l'email est valide quand on sort du champ
    const emailInput = form.email;
    emailInput.addEventListener("blur", () => {
        if (emailInput.value && !isValidEmail(emailInput.value)) {
            emailInput.style.borderColor = "#dc3545";
        } else {
            emailInput.style.borderColor = "";
        }
    });
});
