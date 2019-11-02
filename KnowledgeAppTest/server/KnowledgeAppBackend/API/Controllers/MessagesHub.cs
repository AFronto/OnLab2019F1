using KnowledgeAppBackend.BLL.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnowledgeAppBackend.API.Controllers
{
    ///TODO: Auth needed later
    public class MessagesHub: Hub
    {
        IMessageService messageService;

        public MessagesHub(IMessageService messageService)
        {
            this.messageService = messageService;
        }

        public async Task SendMessage(string questionId, string message, string user)
        {
            try
            {

                var createdMessage = messageService.CreateAnswer(message, new Guid(user), new Guid(questionId));
                await Clients.Group(questionId).SendAsync("ReceiveMessage",
                                                            message,
                                                            user,
                                                            createdMessage.Owner.Username,
                                                            createdMessage.CreationTime,
                                                            createdMessage.Id
                                                          );
            }
            catch (Exception e)
            {
                await Clients.Caller.SendAsync("ErrorHandle", e.Message);
            }
        }

        public async Task SubscribeToThread(string questionId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, questionId);
        }
    }
}
