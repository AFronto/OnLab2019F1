using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnowledgeAppBackend.API.DTO
{
    public class MessageViewModel
    {
        public string Id { get; set; }
        public string Content { get; set; }
        public int Priority { get; set; }
        public long CreationTime { get; set; }
    }
}
