using KnowledgeAppBackend.API.DTO;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using CryptoHelper;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using KnowledgeAppBackend.Data;
using KnowledgeAppBackend.Model;
using KnowledgeAppBackend.BLL.Model;

namespace KnowledgeAppBackend.API.Services
{
    public class AuthService : IAuthService
    {
        string jwtSecret;
        int jwtLifespan;
        IUserRepository userRepository;

        public AuthService(string jwtSecret, int jwtLifespan,
        IUserRepository userRepository)
        {
            this.jwtSecret = jwtSecret;
            this.jwtLifespan = jwtLifespan;
            this.userRepository = userRepository;
        }

        public Guid CreateNewUser(UserRegistration userRegistration)
        {
            var emailUniq = userRepository.IsEmailUniq(userRegistration.Email);
            if (!emailUniq) throw new Exception("User with this email already exists.");
            var usernameUniq = userRepository.IsUsernameUniq(userRegistration.Username);
            if (!usernameUniq) throw new Exception("user with this name already exists");

            var id = Guid.NewGuid();
            var user = new User
            {
                Id = id,
                Username = userRegistration.Username,
                Email = userRegistration.Email,
                Password = HashPassword(userRegistration.Password)
            };
            userRepository.Add(user);
            userRepository.Commit();

            return id;
        }

        public AuthData GetAuthData(Guid id)
        {
            var expirationTime = DateTime.UtcNow.AddSeconds(jwtLifespan);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, id.ToString())
                }),
                Expires = expirationTime,
                // new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256Signature)
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret)),
                    SecurityAlgorithms.HmacSha256Signature
                )
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));

            return new AuthData
            {
                Token = token,
                TokenExpirationTime = ((DateTimeOffset)expirationTime).ToUnixTimeSeconds(),
                Id = id.ToString()
            };
        }

        public User GetUserByEmail(string email)
        {
            return userRepository.GetSingle(u => u.Email == email);
        }

        public string HashPassword(string password)
        {
            return Crypto.HashPassword(password);
        }

        public bool VerifyPassword(string actualPassword, string hashedPassword)
        {
            return Crypto.VerifyHashedPassword(hashedPassword, actualPassword);
        }
    }
}
