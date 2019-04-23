using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnowledgeAppBackend.Model
{
    public class Tag : IEntityBase
    {
        public Guid Id { get; set; }

        public Guid MessageId { get; set; }
        public virtual Message Message { get; set; }

        public Guid SkillId { get; set; }
        public virtual Skill Skill { get; set; }
    }
}
