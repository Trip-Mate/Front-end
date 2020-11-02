import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";
import React from "react";

import Home from "./Home";

test("Home snapshot matches", () => {
  const wrapper = shallow(<Home />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});