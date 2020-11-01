import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";
import React from "react";

import Overview from "./Overview";

test("Overview snapshot matches", () => {
  const wrapper = shallow(<Overview />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});