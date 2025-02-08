import { useState } from "react";
import PropTypes from "prop-types";

const Togglable = ({ buttonLabel, children }) => {
  const [visible, setVisible] = useState(false);

  if (visible) {
    return (
      <>
        {children}
        <button onClick={() => setVisible(false)}>Cancel</button>
      </>
    );
  } else {
    return <button onClick={() => setVisible(true)}>{buttonLabel}</button>;
  }
};

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
