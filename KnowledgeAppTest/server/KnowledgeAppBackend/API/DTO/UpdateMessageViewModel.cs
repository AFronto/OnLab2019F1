using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace KnowledgeAppBackend.API.DTO
{
    public class UpdateMessageViewModel
    {
        public List<string> Tags { get; set; }
        public int Priority { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 1)]
        public string Content { get; set; }
    }
}
