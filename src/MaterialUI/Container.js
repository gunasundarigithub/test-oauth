import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

function SimpleContainer(props) {
  return (
    <Container maxWidth={props.maxWidth} style={{ minHeight: "100vh" }}>
      <div
        style={{
          backgroundColor: "#cfe8fc",
          height: "100%",
          minHeight: "120vh"
        }}
      >
        {" "}
        {props.children}
      </div>
    </Container>
  );
}

export default SimpleContainer;
