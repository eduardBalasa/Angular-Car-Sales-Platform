using Microsoft.EntityFrameworkCore.Migrations;

namespace AplicatieVanzariMasini_Back.Migrations
{
    public partial class RemoveLogicOfTableBehind : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cars_CylindricalCapacities_CylindricalCapacityId",
                table: "Cars");

            migrationBuilder.DropForeignKey(
                name: "FK_Cars_Kms_KmId",
                table: "Cars");

            migrationBuilder.DropForeignKey(
                name: "FK_Cars_Powers_PowerId",
                table: "Cars");

            migrationBuilder.DropForeignKey(
                name: "FK_Cars_Prices_PriceId",
                table: "Cars");

            migrationBuilder.DropTable(
                name: "CylindricalCapacities");

            migrationBuilder.DropTable(
                name: "Kms");

            migrationBuilder.DropTable(
                name: "Powers");

            migrationBuilder.DropTable(
                name: "Prices");

            migrationBuilder.DropIndex(
                name: "IX_Cars_CylindricalCapacityId",
                table: "Cars");

            migrationBuilder.DropIndex(
                name: "IX_Cars_KmId",
                table: "Cars");

            migrationBuilder.DropIndex(
                name: "IX_Cars_PowerId",
                table: "Cars");

            migrationBuilder.DropIndex(
                name: "IX_Cars_PriceId",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "ManufacturingDates");

            migrationBuilder.DropColumn(
                name: "CylindricalCapacityId",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "KmId",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "PowerId",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "PriceId",
                table: "Cars");

            migrationBuilder.AddColumn<int>(
                name: "Year",
                table: "ManufacturingDates",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CylindricalCapacity",
                table: "Cars",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EnginePower",
                table: "Cars",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<float>(
                name: "Km",
                table: "Cars",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "Price",
                table: "Cars",
                nullable: false,
                defaultValue: 0f);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Year",
                table: "ManufacturingDates");

            migrationBuilder.DropColumn(
                name: "CylindricalCapacity",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "EnginePower",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "Km",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Cars");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "ManufacturingDates",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CylindricalCapacityId",
                table: "Cars",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "KmId",
                table: "Cars",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PowerId",
                table: "Cars",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PriceId",
                table: "Cars",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "CylindricalCapacities",
                columns: table => new
                {
                    CylindricalCapacityId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CylindricalCapacities", x => x.CylindricalCapacityId);
                });

            migrationBuilder.CreateTable(
                name: "Kms",
                columns: table => new
                {
                    KmId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kms", x => x.KmId);
                });

            migrationBuilder.CreateTable(
                name: "Powers",
                columns: table => new
                {
                    PowerId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Powers", x => x.PowerId);
                });

            migrationBuilder.CreateTable(
                name: "Prices",
                columns: table => new
                {
                    PriceId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Prices", x => x.PriceId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cars_CylindricalCapacityId",
                table: "Cars",
                column: "CylindricalCapacityId");

            migrationBuilder.CreateIndex(
                name: "IX_Cars_KmId",
                table: "Cars",
                column: "KmId");

            migrationBuilder.CreateIndex(
                name: "IX_Cars_PowerId",
                table: "Cars",
                column: "PowerId");

            migrationBuilder.CreateIndex(
                name: "IX_Cars_PriceId",
                table: "Cars",
                column: "PriceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cars_CylindricalCapacities_CylindricalCapacityId",
                table: "Cars",
                column: "CylindricalCapacityId",
                principalTable: "CylindricalCapacities",
                principalColumn: "CylindricalCapacityId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Cars_Kms_KmId",
                table: "Cars",
                column: "KmId",
                principalTable: "Kms",
                principalColumn: "KmId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Cars_Powers_PowerId",
                table: "Cars",
                column: "PowerId",
                principalTable: "Powers",
                principalColumn: "PowerId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Cars_Prices_PriceId",
                table: "Cars",
                column: "PriceId",
                principalTable: "Prices",
                principalColumn: "PriceId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
