using Microsoft.EntityFrameworkCore.Migrations;

namespace AplicatieVanzariMasini_Back.Migrations
{
    public partial class convertMigrr : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Price",
                table: "Cars",
                nullable: true,
                oldClrType: typeof(float),
                oldType: "real");

            migrationBuilder.AlterColumn<string>(
                name: "Km",
                table: "Cars",
                nullable: true,
                oldClrType: typeof(float),
                oldType: "real");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<float>(
                name: "Price",
                table: "Cars",
                type: "real",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<float>(
                name: "Km",
                table: "Cars",
                type: "real",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
