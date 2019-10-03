using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnowledgeAppBackend.BLL.Model
{
    public class SkillWithUserAndParentChildren
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsRoot { get; set; }
        public bool UserKnows { get; set; }
        public SkillWithUserAndParentChildren Parent { get; set; }
        public List<SkillWithUserAndParentChildren> Children { get; set; }
    }
}
