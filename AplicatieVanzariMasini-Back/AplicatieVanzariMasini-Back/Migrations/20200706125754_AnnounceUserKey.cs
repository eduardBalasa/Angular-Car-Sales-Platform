using Microsoft.EntityFrameworkCore.Migrations;

namespace AplicatieVanzariMasini_Back.Migrations
{
    public partial class AnnounceUserKey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Announce",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Announce_UserId",
                table: "Announce",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Announce_AspNetUsers_UserId",
                table: "Announce",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Announce_AspNetUsers_UserId",
                table: "Announce");

            migrationBuilder.DropIndex(
                name: "IX_Announce_UserId",
                table: "Announce");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Announce");
        }
    }
}
