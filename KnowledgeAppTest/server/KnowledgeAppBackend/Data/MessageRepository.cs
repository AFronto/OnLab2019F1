using KnowledgeAppBackend.BLL.Model;
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

        public List<MessageWithUser> GetConversation(Guid questionId)
        {
            var messagesWithUsers = (from m in context.Messages
                                     where m.Id == questionId
                                     select new MessageWithUser
                                     {
                                         Id = m.Id,
                                         Text = m.Content,
                                         CreatedAt = m.CreationTime,
                                         User = new UserForMessage
                                         {
                                             _id = m.Owner.Id,
                                             Name = m.Owner.Username
                                         }
                                     }).ToList(); 
           messagesWithUsers.AddRange((from m in context.Messages
                                       where m.Question.Id == questionId
                                       select new MessageWithUser
                                       {
                                           Id = m.Id,
                                           Text = m.Content,
                                           CreatedAt = m.CreationTime,
                                           User = new UserForMessage
                                           {
                                               _id = m.Owner.Id,
                                               Name = m.Owner.Username
                                           }
                                       }).ToList());
            return messagesWithUsers;
        }

        public bool IsOwner(Guid messageId, Guid userId)
        {
            var message = this.GetSingle(messageId);
            return message.OwnerId == userId;
        }


    }
}
