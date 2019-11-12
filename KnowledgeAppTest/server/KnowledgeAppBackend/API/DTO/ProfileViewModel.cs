using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace KnowledgeAppBackend.API.DTO
{
    public class ProfileViewModel
    {
        public string Username { get; set; }
                
        public string Email { get; set; }      
    }
}
