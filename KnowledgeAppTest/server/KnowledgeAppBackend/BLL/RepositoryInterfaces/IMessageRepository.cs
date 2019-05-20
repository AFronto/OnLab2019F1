using KnowledgeAppBackend.BLL.Model;
using KnowledgeAppBackend.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnowledgeAppBackend.Data
{
    public interface IMessageRepository: IEntityBaseRepository<Message>
    {
        bool IsOwner(Guid messageId, Guid userId);
        List<MessageWithUser> GetConversation(Guid questionId);
        void DeleteTags(Message question);
    }
}
