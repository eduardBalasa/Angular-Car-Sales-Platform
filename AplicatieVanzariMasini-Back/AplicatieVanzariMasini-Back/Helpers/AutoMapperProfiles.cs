using AplicatieVanzariMasini_Back.Data;
using AplicatieVanzariMasini_Back.Dtos;
using AplicatieVanzariMasini_Back.Models;
using AutoMapper;
using System.Linq;

namespace AplicatieVanzariMasini_Back.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>()
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src =>
                src.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => 
                src.DateOfBirth.CalculatorAge()));

            CreateMap<User, UserForDetailedDto>()
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src =>
                src.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src =>
                src.DateOfBirth.CalculatorAge()));
            
            CreateMap<Photo, PhotoForDetailedDto>();

            CreateMap<UserForUpdateDto, User>();

            CreateMap<Photo, PhotoForReturnDto>();

            CreateMap<PhotoForAnnounce, PhotoForReturnDto>();

            CreateMap<PhotoForCreationDto, Photo>();

            CreateMap<PhotoForCreationDto, PhotoForAnnounce>();

            CreateMap<UserForRegisterDto, User>();

            CreateMap<MessageForCreationDto, Message>().ReverseMap();

            CreateMap<Message, MessageToReturnDto>()
                .ForMember(m => m.SenderPhotoUrl, opt => opt
                .MapFrom(u => u.Sender.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(m => m.RecipientPhotoUrl, opt => opt
                .MapFrom(u => u.Recipient.Photos.FirstOrDefault(p => p.IsMain).Url));

            CreateMap<Body, SpecificationForReturnDto>()
                .ForMember(m => m.Id, opt => opt
                .MapFrom(u => u.BodyId));

            CreateMap<Brand, SpecificationForReturnDto>()
                .ForMember(m => m.Id, opt => opt
                .MapFrom(u => u.BrandId));

            CreateMap<Model, SpecificationForReturnDto>()
                .ForMember(m => m.Id, opt => opt
                .MapFrom(u => u.ModelId));

            CreateMap<ModelVersion, ModelVersionForReturnDto>()
                .ForMember(m => m.Id, opt => opt
                .MapFrom(u => u.ModelVersionId));

            CreateMap<Transmission, SpecificationForReturnDto>()
                .ForMember(m => m.Id, opt => opt
                .MapFrom(u => u.TransmissionId));

            CreateMap<Power, SpecificationForReturnDto>()
                .ForMember(m => m.Id, opt => opt
                .MapFrom(u => u.PowerId));

            CreateMap<PollutionRule, SpecificationForReturnDto>()
                .ForMember(m => m.Id, opt => opt
                .MapFrom(u => u.PollutionRuleId));

            CreateMap<Gearbox, SpecificationForReturnDto>()
                .ForMember(m => m.Id, opt => opt
                .MapFrom(u => u.GearboxId));

            CreateMap<Fuel, SpecificationForReturnDto>()
                .ForMember(m => m.Id, opt => opt
                .MapFrom(u => u.FuelId));

            CreateMap<CylindricalCapacity, SpecificationForReturnDto>()
                .ForMember(m => m.Id, opt => opt
                .MapFrom(u => u.CylindricalCapacityId));

            CreateMap<Country, SpecificationForReturnDto>()
                .ForMember(m => m.Id, opt => opt
                .MapFrom(u => u.CountryId));

            CreateMap<Km, SpecificationForReturnDto>()
             .ForMember(m => m.Id, opt => opt
             .MapFrom(u => u.KmId));

            CreateMap<Price, SpecificationForReturnDto>()
             .ForMember(m => m.Id, opt => opt
             .MapFrom(u => u.PriceId));

        }
    }
}
