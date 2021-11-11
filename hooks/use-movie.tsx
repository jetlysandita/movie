import { useDispatch, useSelector } from "react-redux";
import { ACTION_TYPE } from "../store/movie";

export const useMovie = () => {
  const { movie, isMovieLoading }: { movie: IMovie; isMovieLoading: any } =
    useSelector((state: any) => state.storeMovie);
  const dispatch = useDispatch();
  const clearMovie = () => {
    dispatch({
      type: ACTION_TYPE.MOVIE.getOneRes,
      payload: {},
    });
  };

  const loadMovie = ({ movieId }: any) => {
    dispatch({
      type: ACTION_TYPE.MOVIE.getOne,
      payload: { movieId },
    });
  };

  return [
    { movie, isMovieLoading },
    { clearMovie, loadMovie },
  ];
};
