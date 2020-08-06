using Microsoft.EntityFrameworkCore.Migrations;

namespace AplicatieVanzariMasini_Back.Migrations
{
    public partial class SaveAnounceModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SaveAnnounces",
                columns: table => new
                {
                    AnnounceId = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SaveAnnounces", x => new { x.AnnounceId, x.UserId });
                    table.ForeignKey(
                        name: "FK_SaveAnnounces_Announce_AnnounceId",
                        column: x => x.AnnounceId,
                        principalTable: "Announce",
                        principalColumn: "AnnounceId",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_SaveAnnounces_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SaveAnnounces_UserId",
                table: "SaveAnnounces",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SaveAnnounces");
        }
    }
}
