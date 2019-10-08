import React, { Component } from "react";
import GridLayout from "./GridLayout/GridLayout";
import NavigationBarDev from "./NavigationBar/NavigationBarDev";
import NavigationBarClient from "./NavigationBar/NavigationBarClient";
import ActionsBar from "./ActionsBar/ActionsBar.jsx";
import TopSkeletonBar from "./TopSkeletonBar/TopSkeletonBar";
import "./css/SkeletonCreator.css";
import WelcomeScreen from "./WelcomeScreen/WelcomeScreen";
import ReactTabs from "./ReactTabs/ReactTabs";
import NewLayoutModal from "./NewLayoutModal/NewLayoutModal";
import ParametersBar from "./ParametersBar/ParametersBar";
import {
  findsUniqueWidgetName,
  findsUnique_i,
  setAttribute
} from "./utils/Utils.js";
import ColorPickerBar from "./ColorPickerBar/ColorPickerBar";
var isEqual = require("lodash.isequal");

class SkeletonCreator extends Component {
  state = {
    canSave: [false],
    layoutList: [],
    devMode: true,
    showParametersBar: false,
    showColorPickerBar: false,
    startView: true,
    tabIndex: 0,
    activeLayoutList: [
      {
        layoutName: "Welcome",
        dashboardTitle: "",
        imgFile: null,
        layoutColors: ["#232323", "#5c5c5c", "#ffffff"], //[background, navbar, text]
        componentList: []
      }
    ],
    openModal: false,
    newLayoutName: "",
    widgetOptions: [],
    acordion: [],
    responseFunctions: {
      init: obj => {
        console.log("call function init");
        if (obj === "ERROR") {
          console.log("ERROR in init() callback function");
        } else {
          this.setState({
            widgetOptions: obj.widgetOptions,
            layoutList: obj.layoutList
          });
        }
      },
      create_new_layout: obj => {
        console.log("call function create_new_layout");
        if (obj) {
          const canSave = this.state.canSave;
          canSave[this.state.tabIndex] = true;
          const acordion = this.state.acordion;
          acordion.push([]);
          this.setState({
            openModal: false,
            startView: false,
            activeLayoutList: [
              {
                layoutName: this.state.newLayoutName,
                dashboardTitle: "",
                imgFile: null,
                layoutColors: ["#232323", "#5c5c5c", "#ffffff"], //[background, navbar, text]
                componentList: []
              }
            ],
            acordion,
            canSave
          });
        } else {
          console.log("ERROR: Cannot set that layout name");
        }
      },
      save_current_layout: obj => {
        console.log("call function save_current_layout");
        if (obj) {
          const canSave = this.state.canSave;
          canSave[this.state.tabIndex] = false;
          this.setState({ canSave });
          console.log("LAYOUT SUCCESSFULLY SAVED");
        } else {
          console.log("ERROR: Cannot save layout");
        }
      },
      test: obj => {
        console.log("call function test");
      }
    }
  };

  componentDidMount() {
    console.log("componentDidMount");
    this.props.subscribeMsg("set", data => {
      //console.log("data of subscribeMsg", data);
      this.state.responseFunctions[data.function](data.data);
    });
    // Get widgetOptions and LayoutList of user
    const toRedis = { function: "init", data: this.props.token.message.name };
    this.props.sendMsg("set", toRedis);
    console.log("props", this.props);
  }

  /******************************************************************* */
  /*                          GridLayout                                */
  /******************************************************************* */

  handleLayoutChange = layout => {
    // The layout from GridLayout isn't in the same format as componentList. Need to append the name, parameters and selected of each widget.
    // Another solution would be to put the list of widget names in a separate object in the state
    const activeLayoutList = this.state.activeLayoutList;
    const tabIndex = this.state.tabIndex;
    const canSave = this.state.canSave;

    const udpatedLayout = [];
    layout.map((element, index) => {
      const name = activeLayoutList[tabIndex].componentList[index].name;
      const selected = activeLayoutList[tabIndex].componentList[index].selected;
      const parameters =
        activeLayoutList[tabIndex].componentList[index].parameters;
      udpatedLayout.push({
        name: name,
        selected: selected,
        parameters: {
          ...parameters,
          layout: {
            x: element.x,
            y: element.y,
            h: element.h,
            w: element.w,
            i: element.i
          }
        }
      });
    });

    // To compare if 2 objects are equal, use lodash
    if (isEqual(udpatedLayout, activeLayoutList[tabIndex].componentList)) {
      return;
    }
    activeLayoutList[tabIndex].componentList = udpatedLayout;
    canSave[tabIndex] = true;
    this.setState({ activeLayoutList, canSave });
  };

  // Close the respective widget
  handleCloseWindow = index => {
    const activeLayoutList = this.state.activeLayoutList;
    const tabIndex = this.state.tabIndex;
    const canSave = this.state.canSave;
    activeLayoutList[tabIndex].componentList.splice(index, 1);
    canSave[tabIndex] = true;
    this.setState({ activeLayoutList, canSave });
  };

  // Widget Selector on the GridLayout
  handleWidgetSelect = (evt, componentIndex) => {
    const activeLayoutList = this.state.activeLayoutList;
    const tabIndex = this.state.tabIndex;
    const canSave = this.state.canSave;

    activeLayoutList[tabIndex].componentList[componentIndex].selected = evt;
    // Find unique name
    const uniqueName = findsUniqueWidgetName(
      activeLayoutList[tabIndex].componentList,
      evt.value
    );
    activeLayoutList[tabIndex].componentList[componentIndex].name = uniqueName;
    canSave[tabIndex] = true;
    this.setState({ activeLayoutList, canSave });
  };

  // What happens when you click to edit the parameters/properties of a widget
  handleClickEditProperties = index => {
    console.log(index);
  };

  handleOnChangeDevMode = value => {
    this.setState({ devMode: value });
  };

  /******************************************************************* */
  /*                          Actions Bar                                */
  /******************************************************************* */

  // Ads a widget to the componentList
  handleAddWidget = () => {
    const activeLayoutList = this.state.activeLayoutList;
    const tabIndex = this.state.tabIndex;
    const canSave = this.state.canSave;
    const acordion = this.state.acordion;

    // Add if not in "welcome" or "empty" screens
    if (activeLayoutList[tabIndex] !== undefined) {
      // Add new widget to active layout
      activeLayoutList[tabIndex].componentList.push({
        name: "",
        selected: "",
        parameters: {
          layout: {
            i: findsUnique_i(activeLayoutList[tabIndex].componentList),
            x: 0,
            y: 0,
            w: 3,
            h: 2
          }
        }
      });
      // Add new acordion parameter for this new widget
      acordion[tabIndex].push(true);

      canSave[tabIndex] = true;
      this.setState({ activeLayoutList, canSave, acordion });
    }
  };

  // Save active layout to redis
  handleSaveLayout = () => {
    const toRedis = {
      function: "save_current_layout",
      data: {
        layout_data: this.state.activeLayoutList[this.state.tabIndex],
        user: this.props.token.message.name
      }
    };
    this.props.sendMsg("set", toRedis);
  };

  handleParametersView = () => {
    this.setState({ showParametersBar: !this.state.showParametersBar });
  };

  handleColorPickerView = () => {
    this.setState({ showColorPickerBar: !this.state.showColorPickerBar });
  };

  handleClickSettings = () => {
    console.log(this.state.acordion);
  };

  /******************************************************************* */
  /*                          NavigationBarDev                         */
  /******************************************************************* */

  // Sets the image file for the company logo
  handleChooseFile = evt => {
    if (evt.target.files[0] !== undefined) {
      // Allowed image extensions:
      const imageExtension = evt.target.files[0].type.includes("image");
      if (imageExtension) {
        const activeLayoutList = this.state.activeLayoutList;
        const canSave = this.state.canSave;

        activeLayoutList[this.state.tabIndex].imgFile = URL.createObjectURL(
          evt.target.files[0]
        );
        canSave[this.state.tabIndex] = true;
        this.setState({
          activeLayoutList,
          canSave
        });
      }
    }
  };

  // Changes the title of the Dashboard of the current active layout
  handleChangeDashboardTitle = evt => {
    const activeLayoutList = this.state.activeLayoutList;
    const canSave = this.state.canSave;

    activeLayoutList[this.state.tabIndex].dashboardTitle = evt.target.value;
    canSave[this.state.tabIndex] = true;

    this.setState({ activeLayoutList, canSave });
  };

  /******************************************************************* */
  /*                              Welcome Screen                       */
  /******************************************************************* */

  // Welcome screen -> + New Layout (Currently also File -> + New Layout)
  handleClickNewLayout = () => {
    this.setState({ openModal: true });
  };

  // Clicked to edit on welcome screen. Add the selected layout to activeLayoutList
  handleClickEditLayout = layout_index => {
    console.log(this.state);
    const selected_layout = this.state.layoutList[layout_index];
    console.log("selected_layout", selected_layout);
    const acordion = [Array(selected_layout.componentList.length).fill(true)];
    this.setState({
      startView: false,
      acordion,
      activeLayoutList: [
        {
          layoutName: selected_layout.layoutName,
          dashboardTitle: selected_layout.dashboardTitle,
          imgFile: selected_layout.imgFile,
          layoutColors: selected_layout.layoutColors,
          componentList: selected_layout.componentList
        }
      ]
    });
  };

  /******************************************************************* */
  /*                              Tabs                                   */
  /******************************************************************* */

  // Sets which tab is currently selected
  handleSelectTab = tabIndex => {
    this.setState({ tabIndex });
  };

  // Remove active tab, if not saved prompt a warning
  handleRemoveTab = selectedTab => {
    const activeLayoutList = this.state.activeLayoutList;
    let activeTab = this.state.tabIndex;
    //TODO: warning if not saved, return

    // Remove the selected tab
    activeLayoutList.splice(selectedTab, 1);

    //TODO: Remove the acordion

    // If there is more than one tab and the active tab is in the last position,
    //update tabIndex to the left
    if (activeLayoutList.length > 0 && activeTab === activeLayoutList.length) {
      activeTab--;
    }
    this.setState({ activeLayoutList, tabIndex: activeTab });
  };

  /******************************************************************* */
  /*                              Modal                                */
  /******************************************************************* */

  // Create new layout and opens a single tab
  handleSaveModalLayoutName = () => {
    const toRedis = {
      function: "create_new_layout",
      data: {
        layoutName: this.state.newLayoutName,
        user: this.props.token.message.name
      }
    };
    this.props.sendMsg("set", toRedis);
  };

  /******************************************************************* */
  /*              DropdownMenu FUnctions (File, Edit, View)            */
  /******************************************************************* */

  // File -> + New Layout
  handleNavFileNewLayout = () => {
    const activeLayoutList = this.state.activeLayoutList;
    const canSave = this.state.canSave;
    // If the user is on welcome screen but goes to File -> + New Layout
    if (
      activeLayoutList.length === 1 &&
      activeLayoutList[0].layoutName === "Welcome"
    ) {
      // TODO: choose layout name
      // Initialize activeLayoutList with the new layout
      this.setState({
        activeLayoutList: [
          {
            layoutName: "new_layout",
            dashboardTitle: "",
            layoutColors: ["#232323", "#5c5c5c", "#ffffff"], //[background, navbar, text]
            imgFile: null,
            componentList: []
          }
        ],
        canSave: [true],
        startView: false
      });
    }
    // Append layout to empty layout [] (when user deletes welcome tab)
    // Also appends when there are other layouts [l1,l2]
    // Update the tabIndex, so it shows the newly added
    else {
      activeLayoutList.push({
        layoutName: "new_layout",
        dashboardTitle: "",
        layoutColors: ["#232323", "#5c5c5c", "#ffffff"], //[background, navbar, text]
        imgFile: null,
        componentList: []
      });
      canSave.push(true);
      this.setState({
        activeLayoutList,
        canSave,
        tabIndex: activeLayoutList.length - 1
      });
    }
  };

  restoreDefaultColors = () => {
    console.log("RESTORE");
    const activeLayoutList = this.state.activeLayoutList;
    const tabIndex = this.state.tabIndex;
    const canSave = this.state.canSave;

    // Add if not in "welcome" or "empty" screens
    if (activeLayoutList[tabIndex] !== undefined) {
      activeLayoutList[tabIndex].layoutColors = [
        "#232323",
        "#5c5c5c",
        "#ffffff"
      ];
      canSave[tabIndex] = true;

      this.setState({ activeLayoutList, canSave });
    }
  };

  /******************************************************************* */
  /*                            Widget Parameters                      */
  /******************************************************************* */

  handleParametersNumberChange = (evt, objPath, tabIndex, widget_index) => {
    const activeLayoutList = this.state.activeLayoutList;
    const canSave = this.state.canSave;
    // Sets the input value in the corresponding objPath
    canSave[this.state.tabIndex] = true;
    setAttribute(
      activeLayoutList[tabIndex].componentList[widget_index].parameters,
      objPath,
      parseInt(evt.target.value, 10)
    );
    this.setState({ activeLayoutList, canSave });
  };
  handleParametersBoolChange = (evt, objPath, tabIndex, widget_index) => {
    const activeLayoutList = this.state.activeLayoutList;
    const canSave = this.state.canSave;
    canSave[this.state.tabIndex] = true;
    // Sets the input value in the corresponding objPath
    setAttribute(
      activeLayoutList[tabIndex].componentList[widget_index].parameters,
      objPath,
      evt.target.checked
    );
    this.setState({ activeLayoutList, canSave });
  };
  handleParametersStringChange = (evt, objPath, tabIndex, widget_index) => {
    const activeLayoutList = this.state.activeLayoutList;
    // Able to save when you change the parameter
    const canSave = this.state.canSave;
    canSave[this.state.tabIndex] = true;
    // Sets the input value in the corresponding objPath
    setAttribute(
      activeLayoutList[tabIndex].componentList[widget_index].parameters,
      objPath,
      evt.target.value
    );
    this.setState({ activeLayoutList, canSave });
  };

  // Toggles the view of the clicked Parameter
  handleToggleAcordion = toogle_index => {
    const acordion = this.state.acordion;
    const tabIndex = this.state.tabIndex;
    console.log(toogle_index);
    acordion[tabIndex][toogle_index] = !acordion[tabIndex][toogle_index];

    this.setState({ acordion });
  };

  /******************************************************************* */
  /*                            Color Picker                     */
  /******************************************************************* */

  handleColorChange = (color, path) => {
    const activeLayoutList = this.state.activeLayoutList;
    const tabIndex = this.state.tabIndex;
    const canSave = this.state.canSave;

    canSave[tabIndex] = true;

    const mapper = {
      Background: () => {
        activeLayoutList[tabIndex].layoutColors[0] = color.hexString;
        this.setState({ activeLayoutList, canSave });
      },

      Dashboard: () => {
        activeLayoutList[tabIndex].layoutColors[1] = color.hexString;
        this.setState({ activeLayoutList, canSave });
      },

      Text: () => {
        activeLayoutList[tabIndex].layoutColors[2] = color.hexString;
        this.setState({ activeLayoutList, canSave });
      }
    };
    mapper[path]();
  };

  /******************************************************************* */
  /*                                render()                            */
  /******************************************************************* */

  render() {
    console.log("THIS IS PRINTING: ", this.props);
    const { activeLayoutList, tabIndex, acordion } = this.state;
    console.log("ACTIVELAYOUTLIST.LEngth: ", activeLayoutList.length);
    let toRender;
    // If no tabs open then show nothing
    if (activeLayoutList.length === 0) {
      toRender = <div />;
      // If it's the beggining then render Welcome component
    } else if (
      activeLayoutList.length === 1 && //TODO: MAke it more general
      activeLayoutList[tabIndex].layoutName === "Welcome"
    ) {
      toRender = (
        <WelcomeScreen
          onClickEditLayout={this.handleClickEditLayout}
          onClickNewLayout={this.handleClickNewLayout} // Just opens the modal
          layoutList={this.state.layoutList}
        />
      );
      // Otherwise go for GridLayouts
    } else {
      toRender = (
        <div
          style={{
            height: "calc(100% - 34px)",
            display: "flex",
            flexDirection: "column"
          }}
        >
          {this.state.devMode && (
            <NavigationBarDev
              onChooseFile={this.handleChooseFile}
              imgFile={activeLayoutList[tabIndex].imgFile}
              onChangeDashboardTitle={this.handleChangeDashboardTitle}
              dashboardTitle={activeLayoutList[tabIndex].dashboardTitle}
              dashboardColor={activeLayoutList[tabIndex].layoutColors[1]}
              textColor={activeLayoutList[tabIndex].layoutColors[2]}
            />
          )}
          {!this.state.devMode && (
            <NavigationBarClient
              imgFile={activeLayoutList[tabIndex].imgFile}
              dashboardTitle={activeLayoutList[tabIndex].dashboardTitle}
              dashboardColor={activeLayoutList[tabIndex].layoutColors[1]}
              textColor={activeLayoutList[tabIndex].layoutColors[2]}
            />
          )}
          <GridLayout
            inDevMode={this.state.devMode}
            componentList={activeLayoutList[tabIndex].componentList}
            layoutColors={activeLayoutList[tabIndex].layoutColors}
            tokens={{ token: this.props.token, showoff: this.props.showoff }}
            onCloseWindow={this.handleCloseWindow}
            onClickEditProperties={this.handleClickEditProperties}
            widgetOptions={this.state.widgetOptions}
            onWidgetSelect={this.handleWidgetSelect}
            onLayoutChange={this.handleLayoutChange}
          />
        </div>
      );
    }

    return (
      <div style={{ height: "100%" }}>
        <TopSkeletonBar
          inDevMode={this.state.devMode}
          layoutList={this.state.layoutList}
          onClickEditLayout={this.handleClickEditLayout}
          onChangeDevMode={this.handleOnChangeDevMode}
          onNavFileNewLayout={this.handleNavFileNewLayout}
          restoreDefaultColors={this.restoreDefaultColors}
        />
        <div className="content_root">
          <ActionsBar
            inDevMode={this.state.devMode}
            startView={this.state.startView}
            showParametersBar={this.state.showParametersBar}
            showColorPickerBar={this.state.showColorPickerBar}
            onAddWidget={this.handleAddWidget}
            canSave={this.state.canSave[this.state.tabIndex]}
            onSaveLayout={this.handleSaveLayout}
            onParametersView={this.handleParametersView}
            onColorPickerView={this.handleColorPickerView}
            onClickSettings={this.handleClickSettings}
          />
          {this.state.showParametersBar ? (
            <ParametersBar
              layoutList={activeLayoutList[tabIndex]}
              tabIndex={tabIndex}
              acordion={acordion[tabIndex]}
              onParametersNumberChange={this.handleParametersNumberChange}
              onParametersBoolChange={this.handleParametersBoolChange}
              onParametersStringChange={this.handleParametersStringChange}
              onToggleAcordion={this.handleToggleAcordion}
            />
          ) : (
            <div />
          )}
          {this.state.showColorPickerBar ? (
            <ColorPickerBar
              layoutList={activeLayoutList[tabIndex]}
              handleColorChange={this.handleColorChange}
            />
          ) : (
            <div />
          )}

          <div className="layout">
            <ReactTabs
              tabIndex={this.state.tabIndex}
              activeLayoutList={this.state.activeLayoutList}
              onSelectTab={this.handleSelectTab}
              onRemoveTab={this.handleRemoveTab}
            />
            <NewLayoutModal
              openModal={this.state.openModal}
              onCloseModal={() => this.setState({ openModal: false })}
              onSaveModalLayoutName={this.handleSaveModalLayoutName}
              onChangeModalLayoutName={evt =>
                this.setState({ newLayoutName: evt.target.value })
              }
            />
            {toRender}
          </div>
        </div>
      </div>
    );
  }
}

export default SkeletonCreator;
