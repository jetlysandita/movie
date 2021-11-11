import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ACTION_TYPE } from "../store/movie";

export const useMovies = () => {
  const router = useRouter();
  const {
    query: { search },
  } = router;
  const dispatch = useDispatch();
  const {
    movies,
    page,
    isMoviesLoading,
    totalMovies,
  }: {
    movies: [IMovie];
    page: number;
    totalMovies: number;
    isMoviesLoading: any;
  } = useSelector((state: any) => state.storeMovie);

  useEffect(() => {
    loadMovies({ page: 1 });
  }, [search]);

  const loadMovies = ({ page = 1 }: { page: number }) => {
    if (!isMoviesLoading)
      dispatch({
        type: ACTION_TYPE.MOVIE.getMany,
        payload: { search, page },
      });
  };

  const loadAutoComplete = ({
    search,
    callback = () => {},
  }: {
    search: string;
    callback?: (res: [IMovie]) => void;
  }) => {
    dispatch({
      type: ACTION_TYPE.MOVIE.getManyWithoutRes,
      payload: {
        search,
        callback: (_1: any, res: any) => {
          if (res) {
            callback(res.data);
          }
        },
      },
    });
  };

  return [
    { movies, page, totalMovies },
    { loadMovies, loadAutoComplete },
  ];
};
