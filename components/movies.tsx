import { Col, Row } from "antd";
import { MovieCard } from "./movie";
import { useMovies } from "../hooks/use-movies";

export const MoviesComponent = () => {
  const [{ movies }] = useMovies();

  return (
    <>
      {movies && movies.length ? (
        <>
          <Row gutter={[16, 16]} style={{ overflowY: "auto" }}>
            {movies.map((movie: any) => {
              return (
                <Col key={movie.imdbID}>
                  <MovieCard movie={movie} />
                </Col>
              );
            })}
          </Row>
        </>
      ) : (
        <>Masukkan Judul Film Untuk Mencari</>
      )}
    </>
  );
};
