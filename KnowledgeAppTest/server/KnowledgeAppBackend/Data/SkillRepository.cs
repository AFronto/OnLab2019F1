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

        public void RemoveTags(Skill entity)
        {
            var tags = context.Tags
                .Where(t => t.SkillId == entity.Id)
                .ToList();
            context.Tags.RemoveRange(tags);
        }

        public void RemoveChildren(Skill entity)
        {
            var childrens = context.SkillInheritances
                .Where(si => si.ParentId == entity.Id)
                .Select(si => new SkillInheritance { Id = si.Id, ChildId = si.ChildId, ParentId = si.ParentId })
                .ToList();

            if (childrens.Count > 0)
            {
                throw new Exception("Not leaf skill");
            }

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

        public List<SkillWithDistance> FindSkillsByUserAndDistance(Guid userId)
        {
            var userSkills = FindBy(s => s.SkillUsers.Any(su => su.UserId == userId)).ToList();
            var skillsWithDistance = userSkills.Select(uS => new SkillWithDistance { Distance = 1, SkillId = uS.Id }).ToList();

            var oneGenDistSkills = FindAllChildAndParent(userSkills)
                                        .Where(o => !skillsWithDistance.Any(sWD => o.Id == sWD.SkillId))
                                        .ToList();
            skillsWithDistance.AddRange(oneGenDistSkills
                                        .Select(o => new SkillWithDistance { Distance = 2, SkillId = o.Id }));

            var towGenDistSkills = FindAllChildAndParent(oneGenDistSkills)
                                        .Where(t => !skillsWithDistance.Any(sWD => t.Id == sWD.SkillId))
                                        .ToList();
            skillsWithDistance.AddRange(towGenDistSkills
                                        .Select(t => new SkillWithDistance { Distance = 3, SkillId = t.Id }));

            return skillsWithDistance;
        }

        public List<SkillWithUserAndParentChildren> GetAllInTree(Guid userId)
        {
            var skills = context.Skills.Where(s => s.IsRoot).Select(s => new SkillWithUserAndParentChildren {
                Id=s.Id,
                IsRoot=s.IsRoot,
                Description=s.Description,
                Name=s.Name,
                UserKnows= s.SkillUsers.Any(k => k.UserId == userId)
            }).ToList();

            foreach(var root in skills)
            {
                var usedSkills = new List<SkillWithUserAndParentChildren>();
                usedSkills.Add(root);
                
                root.Children = new List<SkillWithUserAndParentChildren>(recursiveTreeGen(root, usedSkills, userId));
            }

            return skills;
        }

        private List<SkillWithUserAndParentChildren> recursiveTreeGen(SkillWithUserAndParentChildren root, List<SkillWithUserAndParentChildren> usedSkills, Guid userId)
        {
            List<SkillWithUserAndParentChildren> children = context.SkillInheritances
                                  .Where(sI => sI.ParentId == root.Id)
                                  .Where(sI => !usedSkills.Any(uS => sI.ChildId == uS.Id))
                                  .Select(sI => new SkillWithUserAndParentChildren
                                  {
                                      Id = sI.Child.Id,
                                      IsRoot = sI.Child.IsRoot,
                                      Description = sI.Child.Description,
                                      Name = sI.Child.Name,
                                      UserKnows = sI.Child.SkillUsers.Any(k => k.UserId == userId),
                                      Parent = root
                                  }).ToList();

            if (children.Count > 0)
            {
                usedSkills.AddRange(children);
            }
            foreach (var child in children)
            {
                child.Children = new List<SkillWithUserAndParentChildren>(recursiveTreeGen(child, usedSkills, userId));
            }

            return children;
        }

        private List<Skill> FindAllChildAndParent(List<Skill> skills)
        {
            List<Skill> parentsAndChildren= new List<Skill>();

            foreach(var skill in skills)
            {
                
                parentsAndChildren.AddRange(context.SkillInheritances.Where(sI => sI.Parent == skill).Select(sI => sI.Child));
                parentsAndChildren.AddRange(context.SkillInheritances.Where(sI => sI.Child == skill)
                                                                     .Where(sI => !parentsAndChildren.Contains(sI.Parent))
                                                                     .Select(sI => sI.Parent));
            }

            return parentsAndChildren;
        }

    }
}
