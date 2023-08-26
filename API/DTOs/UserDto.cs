using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UserDto // Data transfer object: objet pour retourner la réponse au login/register avec le nom utilisateur et le jeton d'accès
    {
        public int userId { get; set; }
        public string UserName { get; set; }
        public string Token { get; set; }
    }
}