using KnowledgeAppBackend.BLL.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnowledgeAppBackend.BLL.Services.Interfaces
{
    public interface IProfileService
    {
        ProfileData GetProfile(Guid userId);
    }
}
