using KnowledgeAppBackend.API.Services;
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
        IAuthService authService;

        public ProfileService(IUserRepository userRepository, IAuthService authService)
        {
            this.userRepository = userRepository;
            this.authService = authService;
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

        public void UpdatePassword(Guid userId, string password)
        {
            var user = userRepository.GetSingle(userId);

            user.Password = authService.HashPassword(password);
            userRepository.Update(user);
            userRepository.Commit();
        }

        public void UpdateProfile(Guid userId, string userName, string email)
        {
            var user = userRepository.GetSingle(userId);

            var emailUniq = userRepository.isEmailUniq(email) || user.Email == email;
            if (!emailUniq)
            {
                throw new Exception("Another user with this email already exists!");
            }

            var usernameUniq = userRepository.IsUsernameUniq(userName) || user.Username == userName;
            if (!usernameUniq)
            {
                throw new Exception("Another user with this name already exists!");
            }

            user.Username = userName;
            user.Email = email;
            userRepository.Update(user);
            userRepository.Commit();
        }
    }
}
