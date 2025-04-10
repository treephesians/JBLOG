import { FC, ReactNode } from "react";

interface TimelineSectionProps {
  title: string;
  children: ReactNode;
}

const TimelineSection: FC<TimelineSectionProps> = ({ title, children }) => {
  return (
    <section className="border-t py-6 sm:py-10 mt-8 sm:mt-12 border-gray-200 dark:border-border">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-light mb-6 sm:mb-10">
        {title}
      </h2>
      <div className="space-y-8 sm:space-y-10">{children}</div>
    </section>
  );
};

export default TimelineSection;
