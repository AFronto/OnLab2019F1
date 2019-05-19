using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnowledgeAppBackend.API.DTO
{
    public class ConversationViewModel
    {
        public string LoggedInUser { get; set; }
        public List<ConversationMessageViewModel> Messages { get; set; }
    }
}
