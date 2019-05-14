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
        List<Message> GetAllQuestions();
    }
}
