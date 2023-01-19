import React from "react";

interface FormControlProps {
  label: string;
  type: string;
  value: string;
  onChange: any;
  className?: string;
}

const FormControl = ({
  label,
  type,
  className,
  onChange,
  value,
}: FormControlProps) => {
  return (
    <div className={`form-group ${className}`} >
      <label className="form-title">{label}</label>

      <input
        type={type}
        className="form-control"
        style={{ cursor: "pointer", position: "relative", borderRadius: "5px", color: "#0b99d9", padding: "10px", right: "0", border: "1px solid #86C2DE", display: "flex", flexDirection: "row", justifyContent: "space-between"}}
        placeholder={label}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
    </div>
  );
};

export default FormControl;
