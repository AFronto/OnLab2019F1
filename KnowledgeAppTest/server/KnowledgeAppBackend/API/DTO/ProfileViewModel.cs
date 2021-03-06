﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace KnowledgeAppBackend.API.DTO
{
    public class ProfileViewModel
    {
        [Required]
        [StringLength(60, MinimumLength = 2)]
        public string Username { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }      
    }
}
