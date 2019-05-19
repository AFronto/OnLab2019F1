using KnowledgeAppBackend.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnowledgeAppBackend.BLL.Model
{
    public class MessageWithUser
    {
        public Guid Id { get; set; }
        public string Text { get; set; }
        public long CreatedAt { get; set; }
        public UserForMessage User { get; set; }
    }
}
