import React from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

import TEST_ID from "./Nav.testid";

const NavContainer = styled("ul")({
  display: "flex",
  listStyle: "none",
  padding: 0,
});

const NavItem = styled("li")({
  marginRight: "1rem",
});

const StyledLink = styled(Link)({
  textDecoration: "none",
  margin: "8px 0",
});

const StyledButton = styled(Button)({
  backgroundColor: "#424242",
  color: "#fff",
  fontWeight: "bold",
  padding: "4px 8px",
  borderRadius: "4px",
  "&:hover": {
    backgroundColor: "#333",
  },
});

const Nav = () => {
  return (
    <NavContainer>
      <NavItem>
        <StyledLink to="/" data-testid={TEST_ID.linkToHome}>
          <StyledButton variant="contained">Home</StyledButton>
        </StyledLink>
      </NavItem>
      <NavItem>
        <StyledLink to="/user" data-testid={TEST_ID.linkToUsers}>
          <StyledButton variant="contained">Users</StyledButton>
        </StyledLink>
      </NavItem>
      <NavItem>
        <StyledLink to="/signin">
          <StyledButton variant="contained">Sign In</StyledButton>
        </StyledLink>
      </NavItem>
      <NavItem>
        <StyledLink to="/signup">
          <StyledButton variant="contained">Sign Up</StyledButton>
        </StyledLink>
      </NavItem>
    </NavContainer>
  );
};

export default Nav;
