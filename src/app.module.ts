import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubjectModule } from './subject/subject.module';
import configGenerator from './config/configuration';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [configGenerator()],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get<string>('DATABASE_HOST', 'localhost'),
          port: configService.get<number>('DATABASE_PORT', 3306),
          username: configService.get<string>('DATABASE_USER', 'root'),
          password: configService.get<string>('DATABASE_PASSWORD', '123456'),
          database: 'chicken',
          synchronize: false,
          autoLoadEntities: true,
        };
      },
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      // definitions: {
      //   path: join(process.cwd(), 'src/graphql.ts'),
      // },
      // typePaths: ['**/*.graphql'],
      autoSchemaFile: true,
    }),
    SubjectModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
