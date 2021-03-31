import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies') // 라우터
export class MoviesController {

    constructor(private readonly moviesService : MoviesService) {}

    @Get() // 컨트롤러
    getAll () :Movie[]{
        return this.moviesService.getAll();
    }


    @Get('/:id')
    getOne(@Param('id') movieId: string):Movie {
        return this.moviesService.getOne(movieId);
    }

    @Post()
    create(@Body() movieData) {
        return this.moviesService.create(movieData)
    }

    @Delete('/:id') 
    remove(@Param('id') movieId:string) {
        return this.moviesService.deleteOne(movieId)
    }
    
    //Put 은 모든 리소스를 업데이트
    @Patch('/:id')
    patch(@Param('id') movieId:string, @Body() updateData) {
        return this.moviesService.update(movieId, updateData)
    }

    
}