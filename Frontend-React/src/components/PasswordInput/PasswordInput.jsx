import "./PasswordInput.css";
import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";

export function PasswordInput(props) {
  const [inputType, setInputType] = useState("password");

  const togglePasswordInputType = () =>
    setInputType((prev) => (prev === "password" ? "text" : "password"));

  const togglePasswordIcon =
    inputType === "password" ? (
      <FaEyeSlash onClick={togglePasswordInputType} />
    ) : (
      <FaEye onClick={togglePasswordInputType} />
    );

  return (
    <div className="password-container">
      <input {...props} type={inputType} style={{ width: "100%" }} />
      <div className="password-toggle-icon">{togglePasswordIcon}</div>
    </div>
  );
}
