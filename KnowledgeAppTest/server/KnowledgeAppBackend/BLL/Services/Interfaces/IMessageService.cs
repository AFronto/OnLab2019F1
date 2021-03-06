﻿using KnowledgeAppBackend.BLL.Model;
using KnowledgeAppBackend.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnowledgeAppBackend.BLL.Services.Interfaces
{
    public interface IMessageService
    {
        string CreateQuestion(string content,int priority,Guid ownerId, List<string> tags);
        Message CreateAnswer(string content, Guid ownerId, Guid questionId);
        List<Message> GetAllQuestions();
        List<MessageWithRelatingSkill> GetMyFeed(Guid userId);
        List<Message> GetMyThreads(Guid userId);
        List<MessageWithUser> GetConversation(Guid questionId);
        string DeleteQuestion(Guid questionId);
    }
}
