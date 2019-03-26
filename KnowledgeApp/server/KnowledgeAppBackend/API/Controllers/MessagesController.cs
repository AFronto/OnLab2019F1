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
    [Authorize]
    [ApiController]
    public class MessagesController: ControllerBase
    {
        IMessageRepository messageRepository;
        ISkillRepository skillRepository;
        IMapper mapper;


        public MessagesController(IMessageRepository messageRepository, ISkillRepository skillRepository, IMapper mapper)
        {
            this.messageRepository = messageRepository;
            this.skillRepository = skillRepository;
            this.mapper = mapper;
        }

        [HttpPost]
        public ActionResult<CreationViewModel> Post([FromBody]UpdateMessageViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var ownerId = HttpContext.User.Identity.Name;
            var creationTime = ((DateTimeOffset)DateTime.UtcNow).ToUnixTimeSeconds();
            var messageId = Guid.NewGuid().ToString();

            var message = new Message
            {
                Id = messageId,
                Content = model.Content,
                Priority = model.Priority,
                OwnerId = ownerId,
                CreationTime = creationTime
            };

            message.Tags = new List<Tag>();

            foreach(var tag in model.Tags)
            {
                var skill = skillRepository.GetSingle(u => u.Name == tag);
                if(skill != null)
                {
                    message.Tags.Add(new Tag
                    {
                        Id = Guid.NewGuid().ToString(),
                        MessageId = message.Id,
                        Message = message,
                        SkillId = skill.Id,
                        Skill = skill
                    });
                }
            }

            messageRepository.Add(message);
            messageRepository.Commit();

            return new CreationViewModel
            {
                ID = messageId
            };
        }
    }
}
