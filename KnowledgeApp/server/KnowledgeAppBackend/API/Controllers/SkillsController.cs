using AutoMapper;
using KnowledgeAppBackend.API.DTO;
using KnowledgeAppBackend.BLL.Services;
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
    [Authorize]
    [ApiController]
    public class SkillsController: ControllerBase
    {
        
        IMapper mapper;
        ISkillService skillService;


        public SkillsController(ISkillService skillService,IMapper mapper)
        {
            this.skillService = skillService;
            this.mapper = mapper;
        }

        [HttpGet]
        public ActionResult<SkillListViewModel> GetSkills()
        {
            var skills = skillService.GetAll();
            return new SkillListViewModel
            {
                Skills = skills.Select(mapper.Map<SkillViewModel>).ToList()
            };
        }

        [HttpGet("{name}")]
        public ActionResult<SkillViewModel> GetSkillByName(string name)
        {
            var skill = skillService.GetSingleByName(name);
            return mapper.Map<SkillViewModel>(skill);
        }

        [HttpPost]
        public ActionResult<CreationViewModel> CreateSkill([FromBody]UpdateSkillViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var Id = skillService.CreateSkill(model.Name, model.Description, model.IsRoot);

                return new CreationViewModel
                {
                    ID = Id
                };
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
            
        }

        [HttpPatch("{name}/add")]
        public ActionResult AddSkillToUser(string name)                  
        {
            var userId = new Guid(HttpContext.User.Identity.Name);

            try
            {
                skillService.AddSkillToUser(userId, name);

                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
            
        }

        [HttpPatch("{name}/parent")]
        public ActionResult AddParentToSkill(string name, [FromBody]SkillListViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            skillService.AddParentToSkill(name, model.Skills.Select(mapper.Map<Skill>).ToList());

            return NoContent();
        }

        [HttpDelete("{name}")]
        public ActionResult<CreationViewModel> DeleteSkill(string name)
        {
            string Id = skillService.DeleteSkill(name);

            return new CreationViewModel
            {
                ID = Id
            };
        }

    }
}
