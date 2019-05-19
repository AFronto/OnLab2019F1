using KnowledgeAppBackend.BLL.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnowledgeAppBackend.API.DTO
{
    public class ConversationMessageViewModel
    {
        public string _id { get; set; }
        public string Text { get; set; }
        public long CreatedAt { get; set; }
        public UserForMessage User { get; set; }
    }
}

