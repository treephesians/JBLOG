import React from "react";
import ThreeDIdBadge from "@/components/interactive/ThreeDIdBadge";

export default function Home() {
  return (
    <div
      className="w-full h-[600px] md:h-[800px] relative"
      style={{
        width: "100vw",
        maxWidth: "100vw",
        marginLeft: "calc(-50vw + 50%)",
        marginRight: "calc(-50vw + 50%)",
      }}
    >
      <ThreeDIdBadge />
    </div>
  );
}
