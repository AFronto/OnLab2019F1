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
        void UpdateProfile(Guid userId, String userName, String email);
        void UpdatePassword(Guid userId, String password);
    }
}
