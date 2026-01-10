/*
  Warnings:

  - Added the required column `book_id` to the `Copy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Copy" ADD COLUMN     "book_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Copy" ADD CONSTRAINT "Copy_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("book_id") ON DELETE RESTRICT ON UPDATE CASCADE;
