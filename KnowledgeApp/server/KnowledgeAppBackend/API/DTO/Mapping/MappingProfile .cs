using AutoMapper;
using KnowledgeAppBackend.Model;

namespace KnowledgeAppBackend.API.DTO
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Skill, SkillViewModel > ();
            CreateMap< SkillViewModel, Skill > ();
        }
    }
}