/*
  Warnings:

  - The `img` column on the `products` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[name]` on the table `brands` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `brands` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `brands` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "brands" ADD COLUMN     "img" BYTEA,
ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "img" BYTEA,
ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "img",
ADD COLUMN     "img" BYTEA;

-- CreateIndex
CREATE UNIQUE INDEX "brands_name_key" ON "brands"("name");

-- CreateIndex
CREATE UNIQUE INDEX "brands_slug_key" ON "brands"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");
