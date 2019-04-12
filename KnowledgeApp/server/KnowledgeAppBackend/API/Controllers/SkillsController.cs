using AutoMapper;
using KnowledgeAppBackend.API.DTO;
using KnowledgeAppBackend.Data;
using KnowledgeAppBackend.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnowledgeAppBackend.API.Controllers
{
    [Route("api/[controller]")]
    //[Authorize]
    [ApiController]
    public class SkillsController: ControllerBase
    {
        ISkillRepository skillRepository;
        IMapper mapper;


        public SkillsController(ISkillRepository skillRepository, IMapper mapper)
        {
            this.skillRepository = skillRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        public ActionResult<SkillListViewModel> GetSkills()
        {
            var skills = skillRepository.GetAll();
            return new SkillListViewModel
            {
                Skills = skills.Select(mapper.Map<SkillViewModel>).ToList()
            };
        }

        [HttpGet("{name}")]
        public ActionResult<SkillViewModel> GetSkillByName(string name)
        {
            var skill = skillRepository.GetSingle(s => s.Name == name);
            return mapper.Map<SkillViewModel>(skill);
        }

        [HttpPost]
        public ActionResult<CreationViewModel> Post([FromBody]UpdateSkillViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var skillUniq = skillRepository.IsSkillnameUniq(model.Name);
            if (!skillUniq) return BadRequest(new { error = "skill with this name already exists" });

            var skillId = Guid.NewGuid().ToString();
            var skill = new Skill
            {
                Id = skillId,
                Name = model.Name,
                Description = model.Description
            };

            skillRepository.Add(skill);
            skillRepository.Commit();

            return new CreationViewModel
            {
                ID = skillId
            };
        }

        [HttpPatch("{name}/add")]
        public ActionResult Patch(string name)                  
        {
            var userId = HttpContext.User.Identity.Name;
            var skill = skillRepository.GetSingle(u => u.Name == name);

            if (skillRepository.UserHasSkill(userId,skill.Id))
            {
                return BadRequest(new { error = "skill and user already connected" });
            }

            if (skill.SkillUsers == null)
            {
                skill.SkillUsers = new List<Knowledge>();
            }


            skill.SkillUsers.Add(new Knowledge
            {
                Id = Guid.NewGuid().ToString(),
                UserId = userId,
                Skill = skill,
                SkillId = skill.Id
            });

            skillRepository.Update(skill);
            skillRepository.Commit();

            return NoContent();
        }
    }
}
