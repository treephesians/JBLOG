import React from "react";

type SidebarProps = {
  title: string;
  content: string;
};

const Sidebar = ({ title, content }: SidebarProps) => {
  return (
    <>
      <p>{title}</p>
      <div>{content}</div>
    </>
  );
};

export default Sidebar;
