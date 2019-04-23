using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnowledgeAppBackend.Model
{
    public interface IEntityBase
    {
        Guid Id { get; set; }
    }
}
