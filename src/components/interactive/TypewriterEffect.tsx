"use client";

import { useEffect, useState } from "react";

interface TypewriterEffectProps {
  texts: string[]; // 표시할 텍스트 배열 (선택적)
  speed?: number; // 타이핑 속도 (ms) (선택적)
  deleteSpeed?: number; // 삭제 속도 (ms) (선택적)
  delayAfterType?: number; // 타이핑 후 대기 시간 (ms) (선택적)
  delayAfterDelete?: number; // 삭제 후 대기 시간 (ms) (선택적)
  prefix?: string; // 텍스트 앞에 붙일 접두사 (선택적)
  suffix?: string; // 텍스트 뒤에 붙일 접미사 (선택적)
}

// 개선된 Typewriter 효과 컴포넌트
export default function TypewriterEffect({
  texts, // 기본값 설정
  speed = 100,
  deleteSpeed = 50,
  delayAfterType = 2000,
  delayAfterDelete = 1000,
  prefix = "",
  suffix = "를 좋아하는",
}: TypewriterEffectProps) {
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 표시 중인 텍스트 인덱스
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    // 현재 표시할 텍스트
    const currentText = texts[currentIndex % texts.length];

    // 타이핑/삭제 속도
    const typingSpeed = isDeleting ? deleteSpeed : speed;

    if (!isDeleting && text === currentText) {
      // 완전히 타이핑된 후 잠시 멈춤
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, delayAfterType);
    } else if (isDeleting && text === "") {
      // 완전히 삭제된 후 잠시 멈춤 & 다음 텍스트로 넘어감
      setIsDeleting(false);
      setCurrentIndex((prevIndex) => prevIndex + 1);
      timeout = setTimeout(() => {
        // 아무 작업 없음, 다시 타이핑 시작
      }, delayAfterDelete);
    } else {
      // 타이핑 또는 삭제 진행 중
      timeout = setTimeout(() => {
        const newText = isDeleting
          ? text.substring(0, text.length - 1)
          : currentText.substring(0, text.length + 1);

        setText(newText);
      }, typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [
    text,
    isDeleting,
    currentIndex,
    texts,
    speed,
    deleteSpeed,
    delayAfterType,
    delayAfterDelete,
  ]);

  return (
    <div className="inline-flex items-center whitespace-pre">
      {prefix && <span>{prefix}</span>}
      <span className="font-semibold">
        {text}
        <span className="animate-[blink_1s_ease-in-out_infinite] font-light">
          |
        </span>
      </span>
      {suffix && <span>{suffix}</span>}
    </div>
  );
}
