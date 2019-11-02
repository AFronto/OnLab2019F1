using AutoMapper;
using KnowledgeAppBackend.API.DTO;
using KnowledgeAppBackend.BLL.Services.Interfaces;
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
        IMessageService messageService;
        IMapper mapper;


        public MessagesController(IMessageService messageService, IMapper mapper)
        {
            this.messageService = messageService;
            this.mapper = mapper;
        }

        [HttpPost]
        public ActionResult<CreationViewModel> Post([FromBody]UpdateMessageViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var ownerId = new Guid(HttpContext.User.Identity.Name);

            try
            {
                var Id = messageService.CreateQuestion(model.Content, model.Priority, ownerId, model.Tags);

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

        [HttpGet]
        public ActionResult<MessageListViewModel> GetMessages()
        {
            var userId = HttpContext.User.Identity.Name;
            var messages = messageService.GetAllQuestions();
            return new MessageListViewModel
            {
                LoggedInUser = userId,
                Messages = messages.Select(mapper.Map<MessageViewModel>).ToList()
            };
        }

        [HttpGet("myFeed")]
        public ActionResult<MessageListViewModel> GetMyFeed()
        {
            var userId = HttpContext.User.Identity.Name;
            var messages = messageService.GetMyFeed(new Guid(userId));
            return new MessageListViewModel
            {
                LoggedInUser = userId,
                Messages = messages.Select(mapper.Map<MessageViewModel>).ToList()
            };
        }

        [HttpGet("myThreads")]
        public ActionResult<MessageListViewModel> GetMyThreads()
        {
            var userId = HttpContext.User.Identity.Name;
            var messages = messageService.GetMyThreads(new Guid(userId));
            return new MessageListViewModel
            {
                LoggedInUser = userId,
                Messages = messages.Select(mapper.Map<MessageViewModel>).ToList()
            };
        }

        [HttpGet("{id}/load")]
        public ActionResult<ConversationViewModel> LoadConversation(string id)
        {
            try
            {
                var userId = HttpContext.User.Identity.Name;
                var messages = messageService.GetConversation(new Guid(id));
                return new ConversationViewModel
                {   
                    LoggedInUser = userId,
                    Messages = messages.Select(mapper.Map<ConversationMessageViewModel>).ToList()
                };
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
        }

        [HttpDelete("{id}")]
        public ActionResult<CreationViewModel> DeleteThread(string id)
        {
            string Id = messageService.DeleteQuestion(new Guid(id));

            return new CreationViewModel
            {
                ID = Id
            };
        }
    }
}
