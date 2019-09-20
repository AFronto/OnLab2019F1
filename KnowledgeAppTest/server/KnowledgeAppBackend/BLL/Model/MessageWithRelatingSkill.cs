using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnowledgeAppBackend.BLL.Model
{
    public class MessageWithRelatingSkill
    {
        public List<string> RelatingSkillName { get; set; }
        public Guid Id { get; set; }
        public string Content { get; set; }
        public int Priority { get; set; }
        public long CreationTime { get; set; }
        public Guid OwnerId { get; set; }
    }
}
