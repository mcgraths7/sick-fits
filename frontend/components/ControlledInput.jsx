import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ControlledInput = (props) => {
  const { name: n, type: t } = props;
  let { value } = props;
  return (
    <label htmlFor={n}>
      Title
      <input
        type={t}
        id={n}
        name={n}
        placeholder={`Enter a ${n}`}
        required
        value={value}
        onChange={(e) => {
          const { type, v } = e.target.value;
          value = type === 'number' ? parseFloat(v) : v;
          console.log(value);
        }}
      />
    </label>
  );
};

ControlledInput.defaultProps = {
  value: '',
};
ControlledInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export default ControlledInput;
