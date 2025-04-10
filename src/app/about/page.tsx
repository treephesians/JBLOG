import TimelineItem from "@/components/about/TimelineItem";
import TimelineSection from "@/components/about/TimelineSection";
import TypewriterEffect from "@/components/interactive/TypewriterEffect";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="py-6 sm:py-10 p-4 sm:p-6 w-full max-w-3xl mx-auto">
      <section className="relative">
        {/* 텍스트 콘텐츠 */}
        <div className="w-full md:w-1/2 pr-0 md:pr-4">
          <div className="flex flex-col text-2xl sm:text-3xl md:text-4xl font-light gap-2 sm:gap-3">
            <p>안녕하세요😄</p>
            <TypewriterEffect
              texts={["Typescript", "React", "Next.js"]}
              speed={80}
              deleteSpeed={40}
              suffix="를 좋아하는"
            />
            <TypewriterEffect
              texts={["박준범", "준뱀", "Jbaamm"]}
              speed={80}
              deleteSpeed={40}
              prefix="개발자 "
              suffix="입니다."
            />
          </div>

          <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-5">
            <div className="flex items-center gap-3 flex-wrap">
              <Link
                href="https://github.com/treephesians"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center p-3 py-1 rounded-md bg-black text-white text-sm hover:bg-gray-700 transition-colors"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </Link>
              <Link
                href="https://www.figma.com/design/EH1r3cyKDgMXN2Lh8cshq0/resume_junbeom?node-id=0-1&t=aX6u2V3owuhbpnRl-1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center p-3 py-1 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/80 transition-colors"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                Resume
              </Link>
            </div>

            <div className="grid gap-4">
              <div>
                <h2 className="text-sm font-light text-gray-600 dark:text-muted-foreground">
                  Email.
                </h2>
                <p className="text-xs font-light">ephesi4ns623@gmail.com</p>
              </div>

              <div>
                <h2 className="text-sm font-light text-gray-600 dark:text-muted-foreground">
                  Residence.
                </h2>
                <p className="text-xs font-light">Seoul, South Korea</p>
              </div>

              <div>
                <h2 className="text-sm font-light text-gray-600 dark:text-muted-foreground">
                  BachelorDegree.
                </h2>
                <p className="text-xs font-light">
                  Sungkyunkwan Univ. Math & Computer Engineering
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 이미지 - PC 화면에서는 고정 위치 */}
        <div className="hidden md:block absolute top-0 right-0 w-1/2 h-[350px]">
          <Image
            src="/panda.png"
            alt="Panda"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* 이미지 - 모바일 화면용 */}
        <div className="block md:hidden w-full h-[220px] sm:h-[280px] relative mt-6">
          <Image
            src="/panda.png"
            alt="Panda"
            fill
            className="object-contain"
            priority
          />
        </div>
      </section>

      <TimelineSection title="Activity">
        <TimelineItem
          date="2024.04 - 2024.11"
          title="소프트웨어 마에스트로 15기"
          subtitle="과학기술정보통신부 주관 IT인재 양성 프로그램, PrayU 서비스 런칭"
        />

        <TimelineItem
          date="2022.08 - 2023.02"
          title="42서울 8기"
          subtitle="피어 투 피어의 코드 리뷰로 동료들과 컴퓨터공학의 전반적인 지식 학습"
        />

        <TimelineItem
          date="2022.01 - 2022.06"
          title="SKKU Graphics Lab"
          subtitle="OpenGL을 활용한 저지연 데이터 처리 사이의 연결, GPU 쉐이더 최적화 연구"
          link
          isLast={true}
        />
      </TimelineSection>

      <TimelineSection title="Career">
        <TimelineItem
          date="2023.07 - 2024.02"
          title="3K Bicas (인턴)"
          subtitle="YOLOv7 비전 모델 최적화, 추론 결과 시각화용 대시보드 프론트엔드 개발"
          isLast={true}
        />
      </TimelineSection>
    </main>
  );
}
