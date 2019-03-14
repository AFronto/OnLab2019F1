using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnowledgeAppBackend.Model
{
    public class Knowledge : IEntityBase
    {
        public string Id { get; set; }
        public int Rating { get; set; }

        public string UserId { get; set; }
        public virtual User User { get; set; }

        public string SkillId { get; set; }
        public virtual Skill Skill { get; set; }

    }
}
