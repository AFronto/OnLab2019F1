using KnowledgeAppBackend.Data;
using KnowledgeAppBackend.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace KnowledgeAppBackend.BLL.Services
{
    public class SkillService: ISkillService
    {
        ISkillRepository skillRepository;

        public SkillService(ISkillRepository skillRepository)
        {
            this.skillRepository = skillRepository;
        }

        public void AddParentToSkill(string name, List<Skill> skills)
        {
            var skill = skillRepository.GetSingle(s => s.Name == name);

            if (skill.Parents == null)
            {
                skill.Parents = new List<SkillInheritance>();
            }

            foreach (var parent in skills)
            {
                skill.Parents.Add(new SkillInheritance
                {
                    Id = Guid.NewGuid(),
                    ParentId = parent.Id,
                    ChildId = skill.Id
                });
            }

            skillRepository.Update(skill);
            skillRepository.Commit();
        }

        public void AddSkillToUser(Guid userId, string name)
        {
            var skill = skillRepository.GetSingle(u => u.Name == name);

            if (skillRepository.UserHasSkill(userId, skill.Id))
            {
                throw new Exception("skill and user already connected");
            }

            if (skill.SkillUsers == null)
            {
                skill.SkillUsers = new List<Knowledge>();
            }


            skill.SkillUsers.Add(new Knowledge
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                Skill = skill,
                SkillId = skill.Id
            });

            skillRepository.Update(skill);
            skillRepository.Commit();

        }

        public string CreateSkill(string name, string description, bool isRoot)
        {
            var skillUniq = skillRepository.IsSkillnameUniq(name);
            if (!skillUniq)
            {
                throw new Exception("skill with this name already exists");
            }

            var skillId = Guid.NewGuid();
            var skill = new Skill
            {
                Id = skillId,
                Name = name,
                Description = description,
                IsRoot = isRoot
            };

            skillRepository.Add(skill);
            skillRepository.Commit();

            return skillId.ToString();
        }

        public string DeleteSkill(string name)
        {
            var skill = skillRepository.GetSingle(s => s.Name == name);

            skillRepository.RemoveChildren(skill);
            skillRepository.RemoveParents(skill);
            skillRepository.RemoveKnowledge(skill);
            skillRepository.Delete(skill);
            skillRepository.Commit();

            return skill.Id.ToString();
        }

        public IEnumerable<Skill> GetAll()
        {
            return skillRepository.GetAll();
        }

        public Skill GetSingleByName(string name)
        {
            return skillRepository.GetSingle(s => s.Name == name);
        }
    }
}
