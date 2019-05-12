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

        public bool UserHasSkill(Guid userId, Guid skillId)
        {
            var ret = context.Knowledges.Any(k => k.SkillId == skillId && k.UserId == userId);
            return ret;
        }

        public void RemoveChildren(Skill entity)
        {
            var childrens = context.SkillInheritances
                .Where(si => si.ParentId == entity.Id)
                .Select(si => new SkillInheritance { Id = si.Id, ChildId = si.ChildId, ParentId = si.ParentId })
                .ToList();
            context.SkillInheritances.RemoveRange(childrens);
        }

        public void RemoveParents(Skill entity)
        {
            var parents = context.SkillInheritances
                .Where(si => si.ChildId == entity.Id)
                .Select(si => new SkillInheritance { Id = si.Id, ChildId = si.ChildId, ParentId = si.ParentId })
                .ToList();
            context.SkillInheritances.RemoveRange(parents);
        }

        public void RemoveKnowledge(Skill entity)
        {
            var knowledges = context.Knowledges
                .Where(k => k.SkillId == entity.Id)
                .Select(k => new Knowledge { Id = k.Id, SkillId = k.SkillId, UserId = k.UserId })
                .ToList();
            context.Knowledges.RemoveRange(knowledges);
        }

        public void RemoveSingleKnowledge(Guid userId, Guid skillId)
        {
            var knowledges = context.Knowledges
                .Where(k => k.SkillId == skillId && k.UserId==userId)
                .Select(k => new Knowledge { Id = k.Id, SkillId = k.SkillId, UserId = k.UserId })
                .ToList();
            context.Knowledges.RemoveRange(knowledges);
        }

        public List<SkillWithUser> GetSkillsAndTheirConnectionToUser(Guid userId)
        {
            var skillsWithUser = (from s in context.Skills
                                  select new SkillWithUser {
                                      Id = s.Id,
                                      Name = s.Name,
                                      Description = s.Description,
                                      IsRoot = s.IsRoot,
                                      UserKnows = s.SkillUsers.Any(k => k.UserId == userId)
                                  }).ToList();
            return skillsWithUser;
        }

        public List<UserContact> GetUserContctsForSkill(Guid skillId)
        {
            return context
                .Knowledges
                .Where(k => k.SkillId == skillId)
                .Select(k => new UserContact { UserId = k.User.Id, Email = k.User.Email }).ToList();
        }

        public List<UserContact> GetUserContctsForSkill2(Guid skillId)
        {
            return context
                .Users
                .Where(u => u.UserSkill.Any(k => k.SkillId == skillId))
                .Select(u => new UserContact { UserId = u.Id, Email = u.Email }).ToList();
        }
    }
}
