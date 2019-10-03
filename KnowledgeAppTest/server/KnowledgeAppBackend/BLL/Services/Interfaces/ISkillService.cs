using KnowledgeAppBackend.BLL.Model;
using KnowledgeAppBackend.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace KnowledgeAppBackend.BLL.Services
{
    public interface ISkillService
    {
        List<SkillWithUser> GetAll(Guid userId);
        List<SkillWithUserAndParentChildren> GetAllInTree(Guid userId);
        Skill GetSingleByName(string name);
        string CreateSkill(string name, string description, bool isRoot);
        void AddSkillToUser(Guid userId,Guid skillId);
        void RemoveSkillFromUser(Guid userId, Guid skillId);
        void AddParentToSkill(Guid id, List<Skill> skills);
        string DeleteSkill(Guid skillId);
    }
}
