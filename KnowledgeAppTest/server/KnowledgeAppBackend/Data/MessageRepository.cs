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

        public void DeleteTags(Message question)
        {
            var tags = context.Tags
                .Where(t => t.MessageId == question.Id)
                .ToList();
            context.Tags.RemoveRange(tags);
        }

        public List<MessageWithRelatingSkill> FindUserRelatedMessages(List<SkillWithDistance> userSkills)
        {   
            var messages = context.Messages
                .Where(m => m.Tags.Any(t => userSkills.Any(uS => t.SkillId == uS.SkillId && uS.Distance <= m.Priority)))
                .Select(m => new MessageWithRelatingSkill { RelatingSkillName = m.Tags
                                                                                 .Where(t => userSkills
                                                                                                     .Any(uS => t.SkillId == uS.SkillId 
                                                                                                     && uS.Distance <= m.Priority))
                                                                                                     .Select(t => t.Skill.Name).Take(3).ToList(),
                                                            Content = m.Content,
                                                            Priority = m.Priority,
                                                            CreationTime = m.CreationTime,
                                                            Id = m.Id,
                                                            OwnerId = m.OwnerId
                })
                .ToList();
            return messages;
        }

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
