using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnowledgeAppBackend.Model
{
    public class Tag : IEntityBase
    {
        public string Id { get; set; }

        public string MessageId { get; set; }
        public virtual Message Message { get; set; }

        public string SkillId { get; set; }
        public virtual Skill Skill { get; set; }
    }
}
