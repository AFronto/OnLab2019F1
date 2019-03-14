using KnowledgeAppBackend.BLL.Model;
using KnowledgeAppBackend.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnowledgeAppBackend.Data
{

    public class SkillRepository : EntityBaseRepository<Skill>, ISkillRepository
    {
        public SkillRepository(MyAppContext context) : base(context) { }

        public bool IsSkillnameUniq(string skillname)
        {
            var skill = this.GetSingle(u => u.Name == skillname);
            return skill == null;
        }

        public bool UserHasSkill(string userId, string skillId)
        {
            var ret = context.Knowledges.Where(k => k.SkillId == skillId && k.UserId == userId);
            return ret != null;
        }

        public List<UserContact> GetUserContctsForSkill(string skillId)
        {
            return context
                .Knowledges
                .Where(k => k.SkillId == skillId)
                .Select(k => new UserContact { UserId = k.User.Id, Email = k.User.Email }).ToList();
        }

        public List<UserContact> GetUserContctsForSkill2(string skillId)
        {
            return context
                .Users
                .Where(u => u.UserSkill.Any(k => k.SkillId == skillId))
                .Select(u => new UserContact { UserId = u.Id, Email = u.Email }).ToList();
        }
    }
}
