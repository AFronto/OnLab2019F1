using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnowledgeAppBackend.Model
{
    public class Skill : IEntityBase
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsRoot { get; set; }

        public List<Tag> RelatedMessages { get; set; }
        public List<Knowledge> SkillUsers { get; set; }
        public List<SkillInheritance> Parents { get; set; }
        public List<SkillInheritance> Children { get; set; }
    }
}
