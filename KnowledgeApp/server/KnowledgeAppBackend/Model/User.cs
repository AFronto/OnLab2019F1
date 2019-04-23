using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnowledgeAppBackend.Model
{
    public class User : IEntityBase
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public List<Knowledge> UserSkill { get; set; }
        public List<Message> Messages { get; set; }
    }
}
