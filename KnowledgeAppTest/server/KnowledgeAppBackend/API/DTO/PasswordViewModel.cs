﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace KnowledgeAppBackend.API.DTO
{
    public class PasswordViewModel
    {
        [Required]
        [StringLength(60, MinimumLength = 8)]
        public string Password { get; set; }
    }
}
