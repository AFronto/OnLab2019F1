using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnowledgeAppBackend.Model
{
    public class SkillInheritance: IEntityBase
    {
        public Guid Id { get; set; }

        public Guid ChildId { get; set; }
        public virtual Skill Child { get; set; }

        public Guid ParentId { get; set; } 
        public virtual Skill Parent { get; set; }
        
    }
}
