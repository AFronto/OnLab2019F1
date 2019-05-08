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
        IEnumerable<Skill> GetAll();
        Skill GetSingleByName(string name);
        string CreateSkill(string name, string description, bool isRoot);
        void AddSkillToUser(Guid userId,string name);
        void AddParentToSkill(string name, List<Skill> skills);
        string DeleteSkill(string name);
    }
}
