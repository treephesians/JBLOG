import React from "react";
import TOC, { TocItem } from "./toc";

interface TocContainerProps {
  items: TocItem[];
}

const TocContainer: React.FC<TocContainerProps> = ({ items }) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="hidden xl:block fixed right-10 top-32 w-56">
      <div className="p-4">
        <TOC items={items} />
      </div>
    </div>
  );
};

export default TocContainer;
