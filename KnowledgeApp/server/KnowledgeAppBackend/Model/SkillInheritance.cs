using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnowledgeAppBackend.Model
{
    public class SkillInheritance: IEntityBase
    {
        public string Id { get; set; }

        public string ChildId { get; set; }
        public virtual Skill Child { get; set; }

        public string ParentId { get; set; } 
        public virtual Skill Parent { get; set; }
        
    }
}
