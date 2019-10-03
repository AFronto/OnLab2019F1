using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnowledgeAppBackend.API.DTO
{
    [JsonObject(IsReference = true)]
    public class SkillViewModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsRoot { get; set; }
        public bool UserKnows { get; set; }

        public SkillViewModel Parent { get; set; }
        public List<SkillViewModel> Children { get; set; }
    }
}
