﻿using KnowledgeAppBackend.BLL.Model;
using KnowledgeAppBackend.BLL.Services.Interfaces;
using KnowledgeAppBackend.Data;
using KnowledgeAppBackend.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnowledgeAppBackend.BLL.Services
{
    public class MessageService: IMessageService
    {
        IMessageRepository messageRepository;
        ISkillRepository skillRepository;
        IUserRepository userRepository;

        public MessageService(IMessageRepository messageRepository, ISkillRepository skillRepository, IUserRepository userRepository)
        {
            this.messageRepository = messageRepository;
            this.skillRepository = skillRepository;
            this.userRepository = userRepository;
        }

        public Message CreateAnswer(string content, Guid ownerId, Guid questionId)
        {
            var creationTime = ((DateTimeOffset)DateTime.UtcNow).ToUnixTimeSeconds();
            var messageId = Guid.NewGuid();

            var message = new Message
            {
                Id = messageId,
                Content = content,
                CreationTime = creationTime,
                Question = messageRepository.GetSingle(questionId),
                Owner = userRepository.GetSingle(ownerId)
            };

            messageRepository.Add(message);
            messageRepository.Commit();

            return message;
        }

        public string CreateQuestion(string content, int priority, Guid ownerId, List<string> tags)
        {
            var creationTime = ((DateTimeOffset)DateTime.UtcNow).ToUnixTimeSeconds();
            var messageId = Guid.NewGuid();

            var message = new Message
            {
                Id = messageId,
                Content = content,
                Priority = priority,
                OwnerId = ownerId,
                CreationTime = creationTime
            };

            message.Tags = new List<Tag>();

            foreach (var tag in tags)
            {
                var skill = skillRepository.GetSingle(u => u.Name == tag);
                if (skill != null)
                {
                    message.Tags.Add(new Tag
                    {
                        Id = Guid.NewGuid(),
                        MessageId = message.Id,
                        Message = message,
                        SkillId = skill.Id,
                        Skill = skill
                    });
                }
            }

            messageRepository.Add(message);
            messageRepository.Commit();

            return messageId.ToString();
        }

        public List<Message> GetAllQuestions()
        {
            return messageRepository.FindBy(m => m.Question.Equals(null)).ToList();
        }

        public List<MessageWithUser> GetConversation(Guid questionId)
        {
            var messagesWithUsers = messageRepository.GetConversation(questionId);
            messagesWithUsers.Sort(delegate (MessageWithUser x, MessageWithUser y)
            {
                return x.CreatedAt.CompareTo(y.CreatedAt);
            });
            return messagesWithUsers;
        }
    }
}
