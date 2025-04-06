import React from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineEye, HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";

interface ActionButtonProps {
  detailPath?: string;
  updatePath?: string;
  onUpdate?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  detailPath = undefined,
  updatePath,
  onUpdate,
  onDelete,
  onClick,
}) => {
  const navigate = useNavigate();

  const handleDetailClick = () => {
    if (detailPath) navigate(detailPath);
    if (onClick) onClick();
  };

  const handleDelete = () => {
    if (onDelete) onDelete();
  };

  return (
    <div className="flex gap-2 justify-center">
      {detailPath && (
        <button
          onClick={handleDetailClick}
          className=""
        >
          <HiOutlineEye className="text-gold hover:text-gold-dark text-xl transition-all" />
        </button>
      )}

      {updatePath && (
        <button
          onClick={() => navigate(updatePath)}
          className=""
        >
          <HiOutlinePencil className="text-gold hover:text-gold-dark text-xl transition-all" />
        </button>
      )}

      {onUpdate && (
        <button
          onClick={onUpdate}
          className=""
        >
          <HiOutlinePencil className="text-gold hover:text-gold-dark text-2xl transition-all" />
        </button>
      )}

      {onDelete && (
        <button
          onClick={handleDelete}
          className=""
        >
          <HiOutlineTrash className="text-gold hover:text-gold-dark text-xl transition-all" />
        </button>
      )}
    </div>
  );
};


export default ActionButton;
