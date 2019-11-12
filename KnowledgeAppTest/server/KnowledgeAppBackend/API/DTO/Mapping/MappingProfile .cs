using AutoMapper;
using KnowledgeAppBackend.BLL.Model;
using KnowledgeAppBackend.Model;
using System.Collections.Generic;

namespace KnowledgeAppBackend.API.DTO
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Skill, SkillViewModel > ();
            CreateMap< SkillViewModel, Skill > ();
            CreateMap<SkillWithUser, SkillViewModel>();
            CreateMap<SkillWithUserAndParentChildren, SkillViewModel>();

            CreateMap<Message, MessageViewModel>();
            CreateMap<MessageWithRelatingSkill, MessageViewModel>();
            CreateMap<MessageWithUser, ConversationMessageViewModel>();

            CreateMap<ProfileData, ProfileViewModel>();
        }
    }
}