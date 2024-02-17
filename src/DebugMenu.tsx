import React from "react";
import _ from "lodash";
import "./DebugMenu.scss";
import { Card } from "./store/redux/features/cardSlice";

interface DebugMenuProps {
  toggleToSimulateApiError: () => void;
  toggleToSimulateLoading: () => void;
  toggleDisplayState: () => void;
  displayState: boolean;
  card: Card;
}

interface DisplayStateDebugProps {
  data: unknown;
}

const DisplayStateDebug: React.FC<DisplayStateDebugProps> = ({ data }) => {
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    return <div>{String(data)}</div>;
  }

  const pairs: [string, unknown][] = Object.entries(
    data as Record<string, unknown>
  );

  return (
    <>
      {pairs.map(([key, value]) => (
        <div key={key}>
          {_.startCase(key)}:
          <div>
            <DisplayStateDebug data={value} />
          </div>
        </div>
      ))}
    </>
  );
};

type SliderProps = {
  toggleFunction: () => void;
  title: string;
  subTitle: string;
  id: string;
};

const Slider: React.FC<SliderProps> = ({ toggleFunction, title, subTitle, id }) => (
  <>
    <p className="slider-title">{title}</p>
    <p className="slider-subtitle">{subTitle}</p>
    <label className="switch">
      <input id={id} name="sliderCheckbox" type="checkbox" onChange={toggleFunction} />
      <span className="slider round"></span>
    </label>
  </>
);

const DebugMenu: React.FC<DebugMenuProps> = ({
  toggleToSimulateApiError,
  toggleToSimulateLoading,
  toggleDisplayState,
  displayState,
  card,
}) => {
  return (
    <div className="debug-bar">
      <h3 className="debug-menu-title">DEBUG MENU</h3>
      <Slider
        id="api-error-slider"
        title="Simulate api error"
        subTitle="Throws an error when form is submitted"
        toggleFunction={toggleToSimulateApiError}
      />
      <Slider
        id="loading-slider"
        title="Simulate loading"
        subTitle=""
        toggleFunction={toggleToSimulateLoading}
      />
      <div>
        <Slider
          id="global-state-slider"
          title="Display Global State"
          subTitle=""
          toggleFunction={toggleDisplayState}
        />
        <div className="debug-state">
          {displayState && <DisplayStateDebug data={card} />}
        </div>
      </div>
    </div>
  );
};

export default DebugMenu;
