using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnowledgeAppBackend.API.DTO
{
    public class MessageListViewModel
    {
        public string LoggedInUser { get; set; }
        public List<MessageViewModel> Messages { get; set; }
    }
}
