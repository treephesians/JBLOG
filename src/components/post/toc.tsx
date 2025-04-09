"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TocProps {
  items: TocItem[];
}

const TOC: React.FC<TocProps> = ({ items }) => {
  // 첫 번째 항목의 ID로 초기화, 항목이 있는 경우
  const [activeId, setActiveId] = useState<string>(
    items.length > 0 ? items[0].id : ""
  );

  // 헤더 높이를 보정하기 위한 오프셋 (px)
  const SCROLL_OFFSET = 80;

  // 스크롤 핸들러 함수
  const handleItemClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // 현재 스크롤 위치 저장
      const currentPos = window.scrollY;

      // 요소의 위치 계산 (헤더 높이 고려)
      const elementPos =
        element.getBoundingClientRect().top + currentPos - SCROLL_OFFSET;

      // 부드러운 스크롤 적용
      window.scrollTo({
        top: elementPos,
        behavior: "smooth",
      });

      // 활성화된 항목 변경
      setActiveId(id);
    }
  };

  useEffect(() => {
    // 항목이 변경되었을 때 첫 번째 항목으로 초기화
    if (items.length > 0 && !activeId) {
      setActiveId(items[0].id);
    }

    // 헤딩 요소의 가시성과 위치를 추적하는 객체
    const headingElementsMap = new Map<
      string,
      {
        element: HTMLElement;
        visible: boolean;
        rect?: DOMRect;
      }
    >();

    // 가장 적절한 활성 헤딩을 결정하는 함수
    const determineActiveHeading = () => {
      // 모든 헤딩 요소의 현재 위치를 업데이트
      headingElementsMap.forEach((data) => {
        data.rect = data.element.getBoundingClientRect();
      });

      // 화면에 보이는 헤딩 요소들을 가져옴
      const visibleHeadings = Array.from(headingElementsMap.entries())
        .filter(([, data]) => data.visible)
        .sort((a, b) => {
          // 화면 상단에 가장 가까운 헤딩을 찾음
          const aTop = a[1].rect?.top || 0;
          const bTop = b[1].rect?.top || 0;

          // 상단에서의 거리가 비슷하면 더 위에 있는 섹션을 우선시
          if (Math.abs(aTop - bTop) < 30) {
            return (
              items.findIndex((item) => item.id === a[0]) -
              items.findIndex((item) => item.id === b[0])
            );
          }

          return aTop - bTop;
        });

      // 가시적인 헤딩이 있으면 첫 번째 헤딩을 활성화
      if (visibleHeadings.length > 0) {
        setActiveId(visibleHeadings[0][0]);
      }
    };

    // 마지막 섹션에 대한 특별 처리
    const handleScroll = () => {
      // 페이지 끝에 도달했는지 확인
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

      if (isAtBottom && items.length > 0) {
        // 페이지 끝에 도달하면 마지막 항목 활성화
        setActiveId(items[items.length - 1].id);
        return;
      }

      // 최적화: 스크롤 이벤트에서 throttling 적용
      if (!window.requestAnimationFrame) {
        determineActiveHeading();
      } else {
        window.requestAnimationFrame(determineActiveHeading);
      }
    };

    // 헤딩 요소의 가시성을 추적하는 IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        // 각 헤딩 요소의 가시성 상태 업데이트
        entries.forEach((entry) => {
          const id = entry.target.id;
          const data = headingElementsMap.get(id);
          if (data) {
            data.visible = entry.isIntersecting;
            data.rect = entry.boundingClientRect;
          }
        });

        // 활성 헤딩 결정
        determineActiveHeading();
      },
      {
        // 헤딩 요소가 화면에 조금만 보여도 감지하도록 설정
        rootMargin: "-10% 0px -70% 0px",
        threshold: [0, 0.1, 0.5, 1], // 여러 지점에서 감지
      }
    );

    // 모든 헤딩 엘리먼트를 맵에 추가하고 관찰 시작
    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        headingElementsMap.set(item.id, {
          element,
          visible: false,
        });
        observer.observe(element);
      }
    });

    // URL 해시가 있는 경우 해당 위치로 스크롤
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        // 약간의 지연 후 스크롤 (렌더링이 완료된 후)
        setTimeout(() => {
          const elementPos =
            element.getBoundingClientRect().top +
            window.scrollY -
            SCROLL_OFFSET;
          window.scrollTo({ top: elementPos, behavior: "smooth" });
          setActiveId(id);
        }, 100);
      }
    }

    // 스크롤 이벤트 리스너 추가
    window.addEventListener("scroll", handleScroll);

    return () => {
      items.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          observer.unobserve(element);
        }
      });

      // 스크롤 이벤트 리스너 제거
      window.removeEventListener("scroll", handleScroll);
    };
  }, [items, activeId, SCROLL_OFFSET]);

  if (items.length === 0) {
    return null;
  }

  return (
    <nav className="toc hidden lg:block">
      <h2 className="text-sm font-semibold mb-3 text-gray-500 dark:text-gray-400">
        On this page
      </h2>
      <ul className="space-y-1">
        {items.map((item) => (
          <li
            key={item.id}
            className={`${item.level > 2 ? "pl-3" : ""} py-1 text-xs ${
              activeId === item.id
                ? " text-pink-500 dark:text-white font-semibold"
                : " text-gray-500 dark:text-gray-500"
            }`}
          >
            <Link
              href={`#${item.id}`}
              className={`block pl-2 hover:text-pink-500 transition-colors`}
              onClick={(e) => handleItemClick(e, item.id)}
            >
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TOC;
