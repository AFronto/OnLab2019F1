using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnowledgeAppBackend.API.DTO
{
    public class UpdateMessageViewModel
    {
        public List<string> Tags { get; set; }
        public int Priority { get; set; }
        public string Content { get; set; }
    }
}
