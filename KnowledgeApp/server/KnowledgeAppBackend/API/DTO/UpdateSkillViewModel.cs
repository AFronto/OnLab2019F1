using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace KnowledgeAppBackend.API.DTO
{
    public class UpdateSkillViewModel
    {
        [Required]
        [StringLength(100,MinimumLength = 1)]
        public string Name { get; set; }

        public string Description { get; set; }

        public bool IsRoot { get; set; } 
    }
}
