import TimelineItem from "@/components/about/TimelineItem";
import TimelineSection from "@/components/about/TimelineSection";
import TypewriterEffect from "@/components/interactive/TypewriterEffect";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="py-10 w-3xl max-w-3xl mx-auto">
      <section className="mb-16 flex flex-col md:flex-row justify-between">
        <div className="md:w-1/2">
          <div className="flex flex-col text-3xl md:text-4xl font-light mb-6 gap-3">
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

          <div className="mt-8 grid gap-5">
            <div>
              <h2 className="text-base font-light text-gray-600 dark:text-muted-foreground">
                Email.
              </h2>
              <p className="text-sm">ephesi4ns623@gmail.com</p>
            </div>

            <div>
              <h2 className="text-base font-light text-gray-600 dark:text-muted-foreground">
                Residence.
              </h2>
              <p className="text-sm">Seoul, South Korea</p>
            </div>

            <div>
              <h2 className="text-base font-light text-gray-600 dark:text-muted-foreground">
                BachelorDegree.
              </h2>
              <p className="text-sm">
                Sungkyunkwan Univ. Math & Computer Engineering
              </p>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 h-[280px] md:h-[350px] relative">
          <Image
            src="/panda.png"
            alt="Panda"
            fill
            className="object-contain"
            priority
          />
          {/* <div className="absolute bottom-[30%] md:bottom-[25%] left-1/2 -translate-x-1/2 z-10">
            <a
              href="https://www.buymeacoffee.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gray-800 text-yellow-400 px-5 py-2 rounded-md font-bold hover:bg-gray-700 transition-colors text-sm"
            >
              BuyMeACoffee☕
            </a>
          </div> */}
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
