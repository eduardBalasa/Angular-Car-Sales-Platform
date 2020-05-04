using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AplicatieVanzariMasini_Back.Migrations
{
    public partial class PhotoForAnnounce : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photos_AnnouncePhotos_AnnouncePhotosId",
                table: "Photos");

            migrationBuilder.DropTable(
                name: "AnnouncePhotos");

            migrationBuilder.DropIndex(
                name: "IX_Photos_AnnouncePhotosId",
                table: "Photos");

            migrationBuilder.DropColumn(
                name: "AnnouncePhotosId",
                table: "Photos");

            migrationBuilder.CreateTable(
                name: "PhotoForAnnounces",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Url = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    DateAdded = table.Column<DateTime>(nullable: false),
                    PublicId = table.Column<string>(nullable: true),
                    IsApproved = table.Column<bool>(nullable: false),
                    AnnounceId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhotoForAnnounces", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PhotoForAnnounces_Announce_AnnounceId",
                        column: x => x.AnnounceId,
                        principalTable: "Announce",
                        principalColumn: "AnnounceId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PhotoForAnnounces_AnnounceId",
                table: "PhotoForAnnounces",
                column: "AnnounceId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PhotoForAnnounces");

            migrationBuilder.AddColumn<int>(
                name: "AnnouncePhotosId",
                table: "Photos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "AnnouncePhotos",
                columns: table => new
                {
                    AnnouncePhotosId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AnnounceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnnouncePhotos", x => x.AnnouncePhotosId);
                    table.ForeignKey(
                        name: "FK_AnnouncePhotos_Announce_AnnounceId",
                        column: x => x.AnnounceId,
                        principalTable: "Announce",
                        principalColumn: "AnnounceId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Photos_AnnouncePhotosId",
                table: "Photos",
                column: "AnnouncePhotosId");

            migrationBuilder.CreateIndex(
                name: "IX_AnnouncePhotos_AnnounceId",
                table: "AnnouncePhotos",
                column: "AnnounceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_AnnouncePhotos_AnnouncePhotosId",
                table: "Photos",
                column: "AnnouncePhotosId",
                principalTable: "AnnouncePhotos",
                principalColumn: "AnnouncePhotosId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
