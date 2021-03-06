import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { Classification } from '../classification/classification.entity';
import { User } from '../user/user.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Article, Classification, User])
  ],
  providers: [
    ArticleService
  ],
  controllers: [
    ArticleController
  ],
})
export class ArticleModule { }
