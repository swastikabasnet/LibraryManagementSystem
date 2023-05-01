import "./PasswordInput.css";
import { useState } from "react";

export function PasswordInput(props) {
  const [inputType, setInputType] = useState("password");

  const togglePasswordInputType = () =>
    setInputType((prev) => (prev === "password" ? "text" : "password"));

  const togglePasswordIcon =
    inputType === "password"
      ? "fa-sharp fa-solid fa-eye-slash"
      : "fa-sharp fa-solid fa-eye";

  return (
    <div className="password-container">
      <input {...props} type={inputType} />
      <i className={togglePasswordIcon} onClick={togglePasswordInputType}></i>
    </div>
  );
}
