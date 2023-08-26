namespace API.Entities
{
    public class Ship
    {
        public int ID { get; set; }
        public string Numero { get; set; } // Au cas où le numéro contient des catactères alphanumériques
        public string Nom { get; set; }
        public short AnneeConstruction { get; set; }
        public float Longueur { get; set; }
        public float Largeur { get; set; }
        public int TonnageBrut { get; set; }
        public int TonnageNet { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public int UserId { get; set; }
        public User user { get; set; }

    }
}