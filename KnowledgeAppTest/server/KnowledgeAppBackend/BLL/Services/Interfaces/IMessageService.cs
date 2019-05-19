using KnowledgeAppBackend.BLL.Model;
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
        List<MessageWithUser> GetConversation(Guid questionId);
    }
}
