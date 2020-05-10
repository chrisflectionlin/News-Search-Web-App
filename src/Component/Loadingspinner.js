import React from "react";
import "../index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { css } from "@emotion/core";
import {BounceLoader} from "react-spinners";
import {Container} from "react-bootstrap";

const override = css`
  display: grid;
  margin: auto;
  text-align: center
`;

class Loadingspinner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true
        };
    }
    render() {
        return (
          <Container
              fluid={true}
              style={{
                  marginTop: "30%"
              }}
          >
              <BounceLoader
                css={override}
                color={"#004ED6"}
                loading={this.state.loading}
              />
              <h6 className="text-center">Loading</h6>
          </Container>
        );

    }
}

export default Loadingspinner;