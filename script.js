
/*
programme pour stocker les information et les afficher sur la page
 */
$(document).ready(function () {
    fetch("https://660c04f03a0766e85dbd2c8e.mockapi.io/Livre/")
        .then(function (response) {
            return response.json();
        })
        .then(function (Livres) {
            let placeholder = document.querySelector("#retour_donnée");

            let out = "";
            for (let livre of Livres) {
                out +=
                    `<tr data-id="${livre.id}">  
                        <td>${livre.id}</td>
                        <td>${livre.Titre}</td>
                        <td> <a href=""><img src="${livre.Image}" alt="" width="40"></a></td> 
                        <td>${livre.Auteur}</td>
                        <td>${livre.DateDePublication}</td>
                        <td>${livre.Editeur}</td>
                        <td>${livre.NombrePage}</td>
                    </tr>`;
            }
            placeholder.innerHTML = out;
        });
/*
Envois du formulaire et vérification si il est valide ou non
Vérification de l'URL de l'image
et éviter de l'envoyer si il y'a un défaut
 event.preventDefault();
 le id et auto incrémenter cette fois ci
 */
    $("form").submit(function (event) {
        event.preventDefault();
        var id = $("#ID").val();
        var titre = $("#Titre").val();
        var url = $("#Image").val();
        var regex = /^(http|https):\/\/.*\.(png|jpg|jpeg)$/;
        if (!regex.test(url)) {
            $("#erreur-url").removeClass("d-none");
            event.preventDefault();
        } else {
            $("#erreur-url").addClass("d-none");
        }
        var auteur = $("#Auteur").val();
        var dateDePublication = $("#DateDePublication").val();
        var editeur = $("#Editeur").val();
        var nombrePage = $("#NombrePage").val();
/*
la class livre et ces attributs
 */

        const livre = {
            ID: id,
            Titre: titre,
            Image: url,
            Auteur: auteur,
            DateDePublication: dateDePublication,
            Editeur: editeur,
            NombrePage: nombrePage
        };


/*
methode Ajouter livre avec mokapi
 */
        fetch('https://660c04f03a0766e85dbd2c8e.mockapi.io/Livre/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(livre)
        }).then(response => {
            if (response.ok) {
                location.reload();
            } else {
                throw new Error('Erreur');
            }
        }).catch(error => {
            console.error(error);
        });
    });
});
