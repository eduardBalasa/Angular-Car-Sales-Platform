using Microsoft.EntityFrameworkCore.Migrations;

namespace AplicatieVanzariMasini_Back.Migrations
{
    public partial class newCarAnnounceRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cars_Announce_AnnounceId",
                table: "Cars");

            migrationBuilder.DropIndex(
                name: "IX_Cars_AnnounceId",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "AnnounceId",
                table: "Cars");

            migrationBuilder.AddColumn<int>(
                name: "CarId",
                table: "Announce",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Announce_CarId",
                table: "Announce",
                column: "CarId");

            migrationBuilder.AddForeignKey(
                name: "FK_Announce_Cars_CarId",
                table: "Announce",
                column: "CarId",
                principalTable: "Cars",
                principalColumn: "CarId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Announce_Cars_CarId",
                table: "Announce");

            migrationBuilder.DropIndex(
                name: "IX_Announce_CarId",
                table: "Announce");

            migrationBuilder.DropColumn(
                name: "CarId",
                table: "Announce");

            migrationBuilder.AddColumn<int>(
                name: "AnnounceId",
                table: "Cars",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Cars_AnnounceId",
                table: "Cars",
                column: "AnnounceId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Cars_Announce_AnnounceId",
                table: "Cars",
                column: "AnnounceId",
                principalTable: "Announce",
                principalColumn: "AnnounceId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
