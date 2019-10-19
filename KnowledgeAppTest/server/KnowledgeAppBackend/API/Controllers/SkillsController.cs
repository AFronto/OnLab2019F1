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
            var userId = new Guid(HttpContext.User.Identity.Name);

            var skills = skillService.GetAll(userId);
            return new SkillListViewModel
            {
                Skills = skills.Select(mapper.Map<SkillViewModel>).ToList()
            };
        }

        [HttpGet("tree")]
        public ActionResult<SkillListViewModel> GetSkillsInTree()
        {
            var userId = new Guid(HttpContext.User.Identity.Name);

            var skills = skillService.GetAllInTree(userId);
            return new SkillListViewModel
            {
                Skills = skills.Select(mapper.Map<SkillViewModel>).ToList()
            };
        }

        [HttpGet("mySkills")]
        public ActionResult<SkillListViewModel> GetMySkills()
        {
            var userId = new Guid(HttpContext.User.Identity.Name);

            var skills = skillService.GetMySkills(userId);
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

        [HttpPatch("{id}/add")]
        public ActionResult AddSkillToUser(string id)                  
        {
            var userId = new Guid(HttpContext.User.Identity.Name);

            try
            {
                skillService.AddSkillToUser(userId, new Guid(id));

                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
            
        }

        [HttpPatch("{id}/remove")]
        public ActionResult RemoveSkillFromUser(string id)
        {
            var userId = new Guid(HttpContext.User.Identity.Name);

            try
            {
                skillService.RemoveSkillFromUser(userId, new Guid(id));

                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }

        [HttpPatch("{id}/parent")]
        public ActionResult AddParentToSkill(string id,[FromBody]SkillListViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                skillService.AddParentToSkill(new Guid(id), model.Skills.Select(mapper.Map<Skill>).ToList());
                return NoContent();
            }catch(Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
        }

        [HttpDelete("{id}")]
        public ActionResult<CreationViewModel> DeleteSkill(string id)
        {
            try
            {
                string Id = skillService.DeleteSkill(new Guid(id));

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

    }
}
