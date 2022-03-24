import  axios from 'axios'

export default class SwapiFilmRepository {

  async getFilm(id:string): Promise<Object> {
    const films : any = await axios.get(process.env.BASE_URL_SWAPI+'api/films/'+id);
    return films;
  }
}


