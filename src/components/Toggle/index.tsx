import React from "react";

interface ToggleProps {
  isOn: boolean;
  onToggle: () => void;
}

const Toggle: React.FC<ToggleProps> = ({ isOn, onToggle }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-all ${
          isOn ? "bg-gold" : "bg-tranparent border border-gold"
        }`}
        onClick={onToggle}
      >
        <div
          className={`bg-gold w-4 h-4 rounded-full shadow-md transform transition-transform ${
            isOn ? "translate-x-6 bg-white" : "translate-x-0"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default Toggle;
