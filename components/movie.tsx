import { Card, Modal, Skeleton } from "antd";
import { useMovie } from "../hooks/use-movie";
const { Meta } = Card;

export const MovieComponent = () => {
  const [{ movie, isMovieLoading }, { clearMovie }] = useMovie();
  return (
    <Modal
      title={movie?.Title || <Skeleton.Input />}
      visible={!!movie?.imdbID}
      footer={null}
      onCancel={clearMovie}
    >
      {isMovieLoading ? (
        <Skeleton />
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              alt={movie?.Title}
              src={movie?.Poster}
              height="300"
              width="240"
            />
          </div>
          <Meta title={movie?.Title} description={movie?.Plot} />
        </>
      )}
    </Modal>
  );
};

export const MovieCard = ({ movie }: { movie: IMovie }) => {
  const [, { loadMovie }] = useMovie();
  return (
    <Card
      style={{ margin: "1rem 0", width: 240 }}
      hoverable
      cover={
        <img
          loading="lazy"
          alt={movie.Title}
          src={movie.Poster}
          height="300"
          width="240"
        />
      }
      onClick={() => loadMovie && loadMovie({ movieId: movie.imdbID })}
    >
      <Meta title={movie.Title} description={movie.Year} />
    </Card>
  );
};
