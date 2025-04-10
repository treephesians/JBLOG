import { FC, ReactNode } from "react";

interface TimelineSectionProps {
  title: string;
  children: ReactNode;
}

const TimelineSection: FC<TimelineSectionProps> = ({ title, children }) => {
  return (
    <section className="border-t pt-12 mt-16 border-gray-200 dark:border-border">
      <h2 className="text-2xl md:text-3xl font-light mb-10">{title}</h2>
      <div className="space-y-10">{children}</div>
    </section>
  );
};

export default TimelineSection;
