import type { NextPage } from "next";
import "antd/dist/antd.css";
import { PageHeader, Layout } from "antd";
import { connect } from "react-redux";
import { SearchComponent } from "../components/search";
import { MovieComponent } from "../components/movie";
import { MoviesComponent } from "../components/movies";
import { InfiniteScroll } from "../hoc/infinite-scroll";
import { useMovies } from "../hooks/use-movies";

const { Content } = Layout;
const Home: NextPage = () => {
  const [{ movies = [], page = 1, totalMovies = 0 }, { loadMovies }] =
    useMovies();
  const onScrollBottom = () => {
    if (movies.length > 0 && totalMovies > 5 && loadMovies) {
      loadMovies({ page: page + 1 });
    }
  };

  return (
    <PageHeader title="Movies">
      <SearchComponent />
      <Content style={{ padding: "1rem 0" }}>
        <MovieComponent />
        <InfiniteScroll onScrollBottom={onScrollBottom}>
          <MoviesComponent />
        </InfiniteScroll>
      </Content>
    </PageHeader>
  );
};

export default connect(({ storeMovie }: any) => {
  return storeMovie;
})(Home);
