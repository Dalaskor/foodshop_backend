import { Category, Product, ProductCategories } from "@app/models";
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { CategoriesController } from "./categories.controller";
import { CategoriesService } from "./categories.service";

@Module({
    providers: [CategoriesService],
    controllers: [CategoriesController],
    imports: [SequelizeModule.forFeature([Category, Product, ProductCategories])],
    exports: [CategoriesService],
})
export class CategoriesModule {}
