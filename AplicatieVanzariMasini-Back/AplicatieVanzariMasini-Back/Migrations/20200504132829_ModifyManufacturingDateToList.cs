using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AplicatieVanzariMasini_Back.Migrations
{
    public partial class ModifyManufacturingDateToList : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ManufacturingDate",
                table: "Cars");

            migrationBuilder.AddColumn<int>(
                name: "ManufacturingDateId",
                table: "Cars",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ManufacturingDates",
                columns: table => new
                {
                    ManufacturingDateId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ManufacturingDates", x => x.ManufacturingDateId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cars_ManufacturingDateId",
                table: "Cars",
                column: "ManufacturingDateId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cars_ManufacturingDates_ManufacturingDateId",
                table: "Cars",
                column: "ManufacturingDateId",
                principalTable: "ManufacturingDates",
                principalColumn: "ManufacturingDateId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cars_ManufacturingDates_ManufacturingDateId",
                table: "Cars");

            migrationBuilder.DropTable(
                name: "ManufacturingDates");

            migrationBuilder.DropIndex(
                name: "IX_Cars_ManufacturingDateId",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "ManufacturingDateId",
                table: "Cars");

            migrationBuilder.AddColumn<DateTime>(
                name: "ManufacturingDate",
                table: "Cars",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
