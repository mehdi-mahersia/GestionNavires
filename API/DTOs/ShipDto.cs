using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class ShipDto // Data transfer object: objet pour passer les params de l'API
    {
        // Mettre les validation de données ici pour ne pas passer au controlleur si l'appel est non valide

        [Required(ErrorMessage = "Le numéro du navire est requis")]
        public string Numero { get; set; } // Au cas où le numéro contient des catactères alphanumériques

        [Required(ErrorMessage = "Le nom du navire est requis")]
        public string Nom { get; set; }

        public short AnneeConstruction { get; set; }

        [Required(ErrorMessage = "La longueur du navire est requise")]
        public float Longueur { get; set; }

        [Required(ErrorMessage = "La largeur du navire est requise")]
        public float Largeur { get; set; }

        public int TonnageBrut { get; set; }

        public int TonnageNet { get; set; }

        public DateTime CreatedAt { get; set; }

        public int UserId { get; set; }
    }
}