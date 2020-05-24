using Microsoft.EntityFrameworkCore.Migrations;

namespace AplicatieVanzariMasini_Back.Migrations
{
    public partial class IntToStringForManufactYear : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Year",
                table: "ManufacturingDates",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Year",
                table: "ManufacturingDates",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
