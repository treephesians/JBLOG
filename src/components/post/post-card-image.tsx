"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

// 이미지만 처리하는 클라이언트 컴포넌트
export function PostCardImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "200px", // 뷰포트에서 200px 여유를 두고 미리 로드 시작
  });

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      {inView ? (
        // 뷰포트에 들어왔을 때만 이미지 로드
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`
            object-cover 
            group-hover:scale-105
            transition-all 
            duration-700 
            ${
              loaded
                ? "opacity-100 scale-100 blur-0 rotate-0"
                : "opacity-0 scale-110 blur-sm rotate-2"
            }
          `}
          onLoad={() => {
            // 살짝 지연시켜 애니메이션 효과가 더 분명하게 보이도록 함
            setTimeout(() => setLoaded(true), 10);
          }}
        />
      ) : null}
      {/* 이미지 로드 전 스켈레톤 */}
      {(!inView || !loaded) && (
        <div
          className="
            absolute inset-0 
            bg-background
            dark:from-gray-800 dark:to-gray-900
            animate-pulse
            image-shimmer
          "
        >
          {/* 로딩 중 시각적 효과 */}
          <div className="absolute inset-0 bg-grid-gray-300/10 dark:bg-grid-gray-100/10 opacity-30" />
        </div>
      )}
    </div>
  );
}
