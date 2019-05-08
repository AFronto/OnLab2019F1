using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnowledgeAppBackend.Model
{
    public class Knowledge : IEntityBase
    {
        public Guid Id { get; set; }
        public int Rating { get; set; }

        public Guid UserId { get; set; }
        public virtual User User { get; set; }

        public Guid SkillId { get; set; }
        public virtual Skill Skill { get; set; }

    }
}
