interface IAction {
  type: string,
  payload: any
}
interface IMovie {
  Title: string,
  Year: string,
  imdbID: string,
  Type: string,
  Poster: string
  Plot?: string
}