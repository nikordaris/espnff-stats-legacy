import React from "react";
import { Collapse } from "reactstrap";

import SideBarContainer from "./SideBarContainer";

const MobileNavContainer = ({ collapsed, ...props }) => {
  return (
    <Collapse isOpen={!collapsed} navbar>
      <SideBarContainer {...props} />
    </Collapse>
  );
};

export default MobileNavContainer;
