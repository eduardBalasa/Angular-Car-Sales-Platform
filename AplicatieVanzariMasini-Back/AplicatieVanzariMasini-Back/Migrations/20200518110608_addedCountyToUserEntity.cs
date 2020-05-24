using Microsoft.EntityFrameworkCore.Migrations;

namespace AplicatieVanzariMasini_Back.Migrations
{
    public partial class addedCountyToUserEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "County",
                table: "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "County",
                table: "AspNetUsers");
        }
    }
}
