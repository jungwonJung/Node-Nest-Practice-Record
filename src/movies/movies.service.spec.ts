import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll()
      expect(result).toBeInstanceOf(Array) // array  인지 아닌지 테스트
    })
  })

  describe('getOne', () => {
    it('should retrun a movie', () => {
      service.create({
      title : "testmovie",
      genres : ['test'],
      year : 2000
    })
    const movie = service.getOne(1)
    expect(movie).toBeDefined()
    expect(movie.id).toEqual(1)
    })
    it('should return 404 error', () => {
      try{
        service.getOne(999)
      }catch(error){
        expect(error).toBeInstanceOf(NotFoundException)
        expect(error.message).toEqual(`Movie with ID: 999 not found`)
      }
    })
  
  })

  describe('deleteOne', () => {

it('delete movie', () => {
  service.create({
    title : 'testmovie',
    genres : ['test'],
    year : 2000
  })
  const beforeDelete = service.getAll()
  service.deleteOne(1)
  const afterDelete = service.getAll()

  expect(afterDelete.length).toBeLessThan(beforeDelete.length)
})
it('should return 404', () => {
  try{
    service.deleteOne(999)
  }catch(error){
    expect(error).toBeInstanceOf(NotFoundException)
  }
})
  })

  describe('create', () => {
    it('should create movie', () => {
      const beforeCreate = service.getAll().length
      service.create({
        title : 'testmovie',
        genres : ['test'],
        year : 2000
      })
      console.log(beforeCreate)
      const afterCreate = service.getAll().length
      console.log(afterCreate)
      expect(afterCreate).toBeGreaterThan(beforeCreate)
    })
  })

    describe('update', () => {
      it('should update movie', () => {
        service.create({
          title : 'testmovie',
          genres : ['test'],
          year : 2000
        })
        service.update(1, {title : 'Update'})
        const movie = service.getOne(1)
        expect(movie.title).toEqual(movie.title)
      })
      it('should throw a notfoundException', () => {
        try{
          service.update(999, {})
        }catch(error){
          expect(error).toBeInstanceOf(NotFoundException)
        }
      })


    })
});
