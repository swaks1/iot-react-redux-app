import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

// this has been customized from the THEME
const CustomCheckBox = ({name, checked, onChange, label}) => {
  return (
    <>
      <FormGroup check>
        <Label check>
          <Input
            type="checkbox"
            name={name}
            checked={checked}
            onChange={onChange}
          />
          <span className="form-check-sign">
            <span className="check" />
          </span>
          <div className="custom-checkbox-label">{label}</div>
        </Label>
      </FormGroup>
    </>
  );
};

export default CustomCheckBox;
