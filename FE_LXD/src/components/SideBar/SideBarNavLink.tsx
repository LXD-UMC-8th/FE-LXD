import { NavLink } from "react-router-dom";

interface SideBarNavLinkProps {
  imgSrcOn: string;
  imgSrcOff: string;
  label?: string;
  toURL: string;
  alt?: string;
}

const SideBarNavLink = ({
  imgSrcOn,
  imgSrcOff,
  label,
  toURL,
  alt,
}: SideBarNavLinkProps) => {
  return (
    <NavLink
      to={toURL}
      className={({ isActive }) =>
        [
          "flex items-center gap-[12px]",
          "w-[204px] h-[55px] rounded-[5px] px-[10px] py-[15px] hover:scale-105 transition-transform duration-300",
          isActive
            ? "bg-[#F1F5FD] text-blue-600 font-semibold"
            : "text-gray-600 font-semibold",
        ].join(" ")
      }
    >
      {({ isActive }) => (
        <>
          <img src={isActive ? imgSrcOn : imgSrcOff} alt={alt} />
          {label}
        </>
      )}
    </NavLink>
  );
};

export default SideBarNavLink;
