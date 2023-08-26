using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto // Data transfer object: objet pour passer les params de l'API
    {
        // Mettre les validation de données ici pour ne pas passer au controlleur si l'appel est non valide
        [Required(ErrorMessage = "Le nom utilisateur est requis")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Le mot de passe est requis")]
        public string Password { get; set; }
    }
}