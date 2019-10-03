using KnowledgeAppBackend.BLL.Model;
using KnowledgeAppBackend.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnowledgeAppBackend.Data
{
    public interface ISkillRepository : IEntityBaseRepository<Skill>
    {
        bool IsSkillnameUniq(string skillname);
        bool UserHasSkill(Guid userId, Guid skillId);
        List<SkillWithDistance> FindSkillsByUserAndDistance(Guid userId);
        void RemoveTags(Skill entity);
        void RemoveChildren(Skill entity);
        void RemoveParents(Skill entity);
        void RemoveKnowledge(Skill entity);
        void RemoveSingleKnowledge(Guid userId, Guid skillId);
        List<SkillWithUser> GetSkillsAndTheirConnectionToUser(Guid userId);
        List<SkillWithUserAndParentChildren> GetAllInTree(Guid userId);
    }
}
