using AutoMapper;
using KnowledgeAppBackend.API.DTO;
using KnowledgeAppBackend.BLL.Services.Interfaces;
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
    public class ProfileController: ControllerBase
    {
        IMapper mapper;
        IProfileService profileService;

        public ProfileController(IProfileService profileService, IMapper mapper)
        {
            this.profileService = profileService;
            this.mapper = mapper;
        }

        [HttpGet]
        public ActionResult<ProfileViewModel> GetProfile()
        {
            var userId = new Guid(HttpContext.User.Identity.Name);

            var profile = profileService.GetProfile(userId);

            return mapper.Map<ProfileViewModel>(profile);
        }

        [HttpPatch]
        public ActionResult UpdateProfile([FromBody]ProfileViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var userId = new Guid(HttpContext.User.Identity.Name);

            try
            {
                profileService.UpdateProfile(userId, model.Username, model.Email);
                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

        [HttpPatch("password")]
        public ActionResult UpdatePassword([FromBody]PasswordViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var userId = new Guid(HttpContext.User.Identity.Name);

            try
            {
                profileService.UpdatePassword(userId, model.Password);
                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }
    }
}
