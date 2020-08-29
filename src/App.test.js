import React from "react";
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";
import App from "./App";
import Search from "./Components/Search";
import Button from "./Components/Button";
import Table from "./Components/Table";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { render, screen } from "@testing-library/react";

//init the adapter
Enzyme.configure({ adapter: new Adapter() });

describe("App", () => {
  it("renders success", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test("rendering app component", () => {
    render(<App />);
    //displays skeleton of parent and child components
    //screen.debug();
  });

  test("looking up search in dom", () => {
    render(<App />);
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });
});

describe("Search", () => {
  //it renders search component to dom
  it("renders success", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Search />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  //it will create a snapshot of search component and match it with a prev snapshot
  test("has valid snapshot", () => {
    const component = renderer.create(<Search />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Button", () => {
  it("renders success", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Button>Button component</Button>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test("has valid snapshot", () => {
    const component = renderer.create(<Button />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Table", () => {
  const props = {
    list: [
      { title: "1", author: "1", num_comments: 1, points: 2, objectID: "y" },
      { title: "2", author: "2", num_comments: 1, points: 2, objectID: "z" },
    ],
    sortKey: "TITLE",
  };

  it("renders success", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Table {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  //enzyme test
  it("shows items in list", () => {
    const element = shallow(<Table {...props} />);
    expect(element.find(".table-row").length).toBe(2);
  });
});
