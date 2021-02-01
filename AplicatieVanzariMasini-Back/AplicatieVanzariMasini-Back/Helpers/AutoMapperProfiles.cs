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

            CreateMap<Announce, AnnounceAndCarForReturnDto>()
                .ForMember(m => m.AnnounceId, opt => opt
                .MapFrom(u => u.AnnounceId))
                .ForMember(m => m.CarId, opt => opt
                .MapFrom(u => u.CarId))
                .ForMember(m => m.Brand, opt => opt
                .MapFrom(u => u.Car.Brand.Name))
                .ForMember(m => m.Body, opt => opt
                .MapFrom(u => u.Car.Body.Name))
                .ForMember(m => m.Gearbox, opt => opt
                .MapFrom(u => u.Car.Gearbox.Name))
                .ForMember(m => m.ManufacturingDate, opt => opt
                .MapFrom(u => u.Car.ManufacturingDate.Year))
                .ForMember(m => m.Model, opt => opt
                .MapFrom(u => u.Car.Model.Name))
                .ForMember(m => m.ModelVersion, opt => opt
                .MapFrom(u => u.Car.ModelVersion.Name))
                .ForMember(m => m.PollutionRule, opt => opt
                .MapFrom(u => u.Car.PollutionRule.Name))
                .ForMember(m => m.Transmission, opt => opt
                .MapFrom(u => u.Car.Transmission.Name))
                .ForMember(m => m.Fuel, opt => opt
                .MapFrom(u => u.Car.Fuel.Name))
                .ForMember(m => m.Country, opt => opt
                .MapFrom(u => u.Car.Country.Name))
                .ForMember(m => m.Km, opt => opt
                .MapFrom(u => u.Car.Km))
                .ForMember(m => m.Price, opt => opt
                .MapFrom(u => u.Car.Price))
                .ForMember(m => m.EnginePower, opt => opt
                .MapFrom(u => u.Car.EnginePower))
                .ForMember(m => m.CylindricalCapacity, opt => opt
                .MapFrom(u => u.Car.CylindricalCapacity))
                .ForMember(m => m.Damaged, opt => opt
                .MapFrom(u => u.Car.Damaged))
                .ForMember(m => m.State, opt => opt
                .MapFrom(u => u.Car.State))
                .ForMember(m => m.ParticleFilter, opt => opt
                .MapFrom(u => u.Car.ParticleFilter))
                .ForMember(m => m.RightHandDrive, opt => opt
                .MapFrom(u => u.Car.RightHandDrive))
                .ForMember(m => m.UserMainPhotoUrl, opt => opt
                .MapFrom(u => u.User.Photos.FirstOrDefault(a => a.IsMain).Url))
                .ForMember(m => m.MainPhotoUrl, opt => opt
                .MapFrom(u => u.PhotosForAnnounce.FirstOrDefault(a => a.AnnounceId == u.AnnounceId).Url));


            CreateMap<Car, AnnounceAndCarForReturnDto>()
                .ForMember(m => m.CarId, opt => opt
                .MapFrom(u => u.CarId))
                .ForMember(m => m.Brand, opt => opt
                .MapFrom(u => u.Brand.Name))
                .ForMember(m => m.Body, opt => opt
                .MapFrom(u => u.Body.Name))
                .ForMember(m => m.Gearbox, opt => opt
                .MapFrom(u => u.Gearbox.Name))
                .ForMember(m => m.ManufacturingDate, opt => opt
                .MapFrom(u => u.ManufacturingDate.Year))
                .ForMember(m => m.Model, opt => opt
                .MapFrom(u => u.Model.Name))
                .ForMember(m => m.ModelVersion, opt => opt
                .MapFrom(u => u.ModelVersion.Name))
                .ForMember(m => m.PollutionRule, opt => opt
                .MapFrom(u => u.PollutionRule.Name))
                .ForMember(m => m.Transmission, opt => opt
                .MapFrom(u => u.Transmission.Name))
                .ForMember(m => m.Fuel, opt => opt
                .MapFrom(u => u.Fuel.Name))
                .ForMember(m => m.Country, opt => opt
                .MapFrom(u => u.Country.Name));

            CreateMap<Car, CarForReturnedAnnounce>()
                .ForMember(m => m.BrandName, opt => opt
                .MapFrom(u => u.Brand.Name))
                .ForMember(m => m.BodyName, opt => opt
                .MapFrom(u => u.Body.Name))
                .ForMember(m => m.Gearbox, opt => opt
                .MapFrom(u => u.Gearbox.Name))
                .ForMember(m => m.ManufacturingDate, opt => opt
                .MapFrom(u => u.ManufacturingDate.Year))
                .ForMember(m => m.ModelName, opt => opt
                .MapFrom(u => u.Model.Name))
                .ForMember(m => m.ModelVersionName, opt => opt
                .MapFrom(u => u.ModelVersion.Name))
                .ForMember(m => m.PollutionRule, opt => opt
                .MapFrom(u => u.PollutionRule.Name))
                .ForMember(m => m.TransmissionType, opt => opt
                .MapFrom(u => u.Transmission.Name))
                .ForMember(m => m.FuelType, opt => opt
                .MapFrom(u => u.Fuel.Name))
                .ForMember(m => m.CountryName, opt => opt
                .MapFrom(u => u.Country.Name));

            CreateMap<Announce, AnnounceForReturnDto>()
                .ForMember(m => m.UserName, opt => opt
                .MapFrom(a => a.User.UserName))
                .ForMember(m => m.UserPhoneNumber, opt => opt
                .MapFrom(a => a.User.PhoneNumber))
                .ForMember(m => m.UserCreated, opt => opt
                .MapFrom(a => a.User.Created))
                .ForMember(m => m.Location, opt => opt
                .MapFrom(a => a.User.City + " , Jud. " + a.User.County));

            CreateMap<Car, CarForReturnDto>();

            CreateMap<Photo, PhotoForDetailedDto>();

            CreateMap<PhotoForAnnounce, PhotoForAnnounceToReturnDto>();

            CreateMap<UserForUpdateDto, User>();

            CreateMap<Photo, PhotoForReturnDto>();

            CreateMap<PhotoForAnnounce, PhotoForReturnDto>();

            CreateMap<PhotoForCreationDto, Photo>();

            CreateMap<PhotoForCreationDto, PhotoForAnnounce>();

            CreateMap<UserForRegisterDto, User>();

            CreateMap<Model, ModelForBrandDto>()
                .ForMember(m => m.Id, opt => opt
                .MapFrom(u => u.ModelId));

            CreateMap<ModelVersion, VersionForModelDto>()
                .ForMember(m => m.Id, opt => opt
                .MapFrom(u => u.ModelVersionId));

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

            CreateMap<ManufacturingDate, ManufacturingToReturnDto>()
                 .ForMember(m => m.Id, opt => opt
                 .MapFrom(u => u.ManufacturingDateId));

            CreateMap<PollutionRule, SpecificationForReturnDto>()
                .ForMember(m => m.Id, opt => opt
                .MapFrom(u => u.PollutionRuleId));

            CreateMap<Gearbox, SpecificationForReturnDto>()
                .ForMember(m => m.Id, opt => opt
                .MapFrom(u => u.GearboxId));

            CreateMap<Fuel, SpecificationForReturnDto>()
                .ForMember(m => m.Id, opt => opt
                .MapFrom(u => u.FuelId));

            CreateMap<Country, SpecificationForReturnDto>()
                .ForMember(m => m.Id, opt => opt
                .MapFrom(u => u.CountryId));

        }
    }
}
