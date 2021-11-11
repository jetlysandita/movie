import type { NextPage } from "next";
import { AutoComplete, Input } from "antd";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { SelectProps } from "antd/es/select";
import { useMovies } from "../hooks/use-movies";

export const SearchComponent: NextPage = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>();
  const [options, setOptions] = useState<SelectProps<object>["options"]>([]);
  const [, { loadAutoComplete }] = useMovies();

  useEffect(() => {
    setSearch(router.query.search as string);
  }, [router.query.search]);

  const onSearch = (search: string) => {
    router.push({ query: { search } });
  };

  const onChange = (value: string) => {
    setSearch(value);
    if (loadAutoComplete)
      loadAutoComplete({
        search: value,
        callback: (res) => {
          setOptions(res ? res.map((movie) => ({ value: movie.Title })) : []);
        },
      });
  };

  return (
    <AutoComplete
      dropdownMatchSelectWidth={252}
      style={{ width: 300 }}
      value={search}
      options={options}
      onChange={onChange}
    >
      <Input.Search
        size="large"
        placeholder="input here"
        enterButton
        allowClear
        onSearch={onSearch}
      />
    </AutoComplete>
  );
};
