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
        bool UserHasSkill(string userId, string skillId);
    }
}
