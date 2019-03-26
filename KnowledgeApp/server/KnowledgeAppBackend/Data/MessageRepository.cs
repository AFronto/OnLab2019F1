using KnowledgeAppBackend.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnowledgeAppBackend.Data
{
    public class MessageRepository: EntityBaseRepository<Message>, IMessageRepository
    {
        public MessageRepository(MyAppContext context) : base(context) { }

        public bool IsOwner(string messageId, string userId)
        {
            var story = this.GetSingle(messageId);
            return story.OwnerId == userId;
        }
    }
}
