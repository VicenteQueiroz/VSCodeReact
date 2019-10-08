import React, { Component } from "react";
import PropTypes from "prop-types";

import Card from "./submodules/Card/Card.jsx";
import Icon from "@material-ui/core/Icon";
import CardHeader from "./submodules/Card/CardHeader.jsx";
import CardIcon from "./submodules/Card/CardIcon.jsx";
import CardBody from "./submodules/Card/CardBody.jsx";
import CardFooter from "./submodules/Card/CardFooter.jsx";

import Widget from "../../../../../Widget/Widget";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

// Add all icons to the library so you can use it in your page
library.add(fas, far);

class GridItemCard extends Component {
  state = {};

  render() {
    console.log("PROPS showOFF: ", this.props.tokens);
    return (
      <Card style={{ marginBottom: "0px" }}>
        {(this.props.icon || this.props.title) && (
          <CardHeader color="info" stats icon>
            {this.props.icon && (
              <CardIcon color="info">
                <FontAwesomeIcon icon={this.props.icon} size="2x" />
              </CardIcon>
            )}
            {this.props.title && (
              <div>
                <br />
                <h3 style={{ color: "#4F4F4F" }}>{this.props.title}</h3>
              </div>
            )}
          </CardHeader>
        )}

        <CardBody style={{ display: "flex" }}>
          <div style={{ flexGrow: "1" }}>
            <Widget
              {...this.props}
              update
              name={this.props.widgetSelected.value}
              type="widgets"
              uid={this.props.widgetSelected.value}
              layout={"test_layout"}
              token={this.props.tokens.token}
              proxy={this.props.tokens.showoff ? "localhost:5003" : ""}
            />
          </div>
        </CardBody>

        {this.props.widget.params && (
          <CardFooter stats>
            <div>
              <FontAwesomeIcon
                icon="cog"
                size="1x"
                onClick={this.onClickProperties}
                style={{ cursor: "pointer" }}
              />
              <a href="#" onClick={() => this.props.onClickEditProperties()}>
                Edit Properties
              </a>
            </div>
          </CardFooter>
        )}
      </Card>
    );
  }
}

GridItemCard.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  widget: PropTypes.shape({
    name: PropTypes.string,
    params: PropTypes.object
  }),
  widgetSelected: PropTypes.object,
  onClickEditProperties: PropTypes.func
};

GridItemCard.defaultProps = {
  icon: undefined,
  title: undefined,
  widget: { name: "Widget Example", params: { example: "50" } }
};

export default GridItemCard;
