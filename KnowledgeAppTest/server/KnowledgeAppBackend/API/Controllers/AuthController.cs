using KnowledgeAppBackend.API.Services;
using KnowledgeAppBackend.API.DTO;
using KnowledgeAppBackend.Data;
using KnowledgeAppBackend.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using KnowledgeAppBackend.BLL.Model;

namespace KnowledgeAppBackend.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        IAuthService authService;
        IMapper mapper;

        public AuthController(IAuthService authService, IMapper mapper)
        {
            this.authService = authService;
            this.mapper = mapper;
        }

        [HttpPost("login")]
        public ActionResult<AuthData> Post([FromBody]LoginViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var user = authService.GetUserByEmail(model.Email);

            if (user == null)
            {
                return BadRequest(new { error = "no user with this email" });
            }

            var passwordValid = authService.VerifyPassword(model.Password, user.Password);
            if (!passwordValid)
            {
                return BadRequest(new { error = "invalid password" });
            }

            return authService.GetAuthData(user.Id);
        }

        [HttpPost("register")]
        public ActionResult<AuthData> Post([FromBody]RegisterViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var id = authService.CreateNewUser(mapper.Map<UserRegistration>(model));

                return authService.GetAuthData(id);
            }catch(Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
        }

    }
}
