"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

export default function Giscus() {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();

  // 포스트 페이지에서만 댓글을 표시
  const isPostPage =
    pathname.startsWith("/posts/") && pathname.split("/").length === 3;

  // https://github.com/giscus/giscus/tree/main/styles/themes
  const theme = resolvedTheme === "dark" ? "transparent_dark" : "light";

  useEffect(() => {
    if (!isPostPage || !ref.current || ref.current.hasChildNodes()) return;

    const scriptElem = document.createElement("script");
    scriptElem.src = "https://giscus.app/client.js";
    scriptElem.async = true;
    scriptElem.crossOrigin = "anonymous";

    scriptElem.setAttribute("data-repo", "treephesians/JBLOG");
    scriptElem.setAttribute("data-repo-id", "R_kgDOOWJMtA");
    scriptElem.setAttribute("data-category", "Comments");
    scriptElem.setAttribute("data-category-id", "DIC_kwDOOWJMtM4CpBtY");
    scriptElem.setAttribute("data-mapping", "pathname");
    scriptElem.setAttribute("data-strict", "0");
    scriptElem.setAttribute("data-reactions-enabled", "1");
    scriptElem.setAttribute("data-emit-metadata", "0");
    scriptElem.setAttribute("data-input-position", "top");
    scriptElem.setAttribute("data-theme", theme);
    scriptElem.setAttribute("data-loading", "lazy");
    scriptElem.setAttribute("data-lang", "ko");
    scriptElem.setAttribute("crossorigin", "anonymous");

    ref.current.appendChild(scriptElem);
  }, [theme, isPostPage]);

  // https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md#isetconfigmessage
  useEffect(() => {
    if (!isPostPage) return;

    const iframe = document.querySelector<HTMLIFrameElement>(
      "iframe.giscus-frame"
    );
    iframe?.contentWindow?.postMessage(
      { giscus: { setConfig: { theme } } },
      "https://giscus.app"
    );
  }, [theme, isPostPage]);

  // 포스트 페이지가 아니면 빈 요소 반환
  if (!isPostPage) {
    return null;
  }

  return <section className="py-20" ref={ref} />;
}
