using KnowledgeAppBackend.BLL.Model;
using KnowledgeAppBackend.BLL.Services.Interfaces;
using KnowledgeAppBackend.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnowledgeAppBackend.BLL.Services
{
    public class ProfileService : IProfileService
    {
        IUserRepository userRepository;

        public ProfileService(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        public ProfileData GetProfile(Guid userId)
        {
            var user = userRepository.GetSingle(userId);
            return new ProfileData
            {
                Username = user.Username,
                Email = user.Email
            };
        }
    }
}
