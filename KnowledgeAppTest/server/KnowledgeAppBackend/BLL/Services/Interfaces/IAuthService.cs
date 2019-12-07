using KnowledgeAppBackend.API.DTO;
using KnowledgeAppBackend.BLL.Model;
using KnowledgeAppBackend.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnowledgeAppBackend.API.Services
{
    public interface IAuthService
    {
        User GetUserByEmail(string email);
        Guid CreateNewUser(UserRegistration userRegistration);
        string HashPassword(string password);
        bool VerifyPassword(string actualPassword, string hashedPassword);
        AuthData GetAuthData(Guid id);
    }
}