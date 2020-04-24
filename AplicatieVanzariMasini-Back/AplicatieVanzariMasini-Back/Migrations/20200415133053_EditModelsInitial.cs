using Microsoft.EntityFrameworkCore.Migrations;

namespace AplicatieVanzariMasini_Back.Migrations
{
    public partial class EditModelsInitial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cars_Brand_BrandId",
                table: "Cars");

            migrationBuilder.DropForeignKey(
                name: "FK_Models_ModelVersion_ModelVersionId",
                table: "Models");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ModelVersion",
                table: "ModelVersion");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Brand",
                table: "Brand");

            migrationBuilder.RenameTable(
                name: "ModelVersion",
                newName: "ModelVersions");

            migrationBuilder.RenameTable(
                name: "Brand",
                newName: "Brands");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ModelVersions",
                table: "ModelVersions",
                column: "ModelVersionId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Brands",
                table: "Brands",
                column: "BrandId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cars_Brands_BrandId",
                table: "Cars",
                column: "BrandId",
                principalTable: "Brands",
                principalColumn: "BrandId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Models_ModelVersions_ModelVersionId",
                table: "Models",
                column: "ModelVersionId",
                principalTable: "ModelVersions",
                principalColumn: "ModelVersionId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cars_Brands_BrandId",
                table: "Cars");

            migrationBuilder.DropForeignKey(
                name: "FK_Models_ModelVersions_ModelVersionId",
                table: "Models");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ModelVersions",
                table: "ModelVersions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Brands",
                table: "Brands");

            migrationBuilder.RenameTable(
                name: "ModelVersions",
                newName: "ModelVersion");

            migrationBuilder.RenameTable(
                name: "Brands",
                newName: "Brand");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ModelVersion",
                table: "ModelVersion",
                column: "ModelVersionId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Brand",
                table: "Brand",
                column: "BrandId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cars_Brand_BrandId",
                table: "Cars",
                column: "BrandId",
                principalTable: "Brand",
                principalColumn: "BrandId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Models_ModelVersion_ModelVersionId",
                table: "Models",
                column: "ModelVersionId",
                principalTable: "ModelVersion",
                principalColumn: "ModelVersionId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
