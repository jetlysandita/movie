import React from "react";
import { render } from "@testing-library/react";
import { SearchComponent } from "../components/search";
import { defaultStoreMovie as mockDefaultStoreMovie } from "../store/movie";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useSelector: () => ({
    storeMovie: mockDefaultStoreMovie,
  }),
  useDispatch: () => mockDispatch,
}));

jest.mock("next/dist/client/router", () => require("next-router-mock"));

describe("ResultsProductPage", () => {
  it("renders - display mode list", () => {
    const { container } = render(<SearchComponent />);
    expect(container).toMatchSnapshot();
  });
});
