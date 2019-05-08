using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnowledgeAppBackend.Model
{
    public class Message: IEntityBase
    {
        public Guid Id { get; set; }
        public string Content { get; set; }
        public int Priority { get; set; }
        public long CreationTime { get; set; }
        public List<Tag> Tags { get; set; }
        public Message Question { get; set; }
        public List<Message> Answers { get; set; }
        public User Owner { get; set; }
        public Guid OwnerId { get; set; }

    }
}
