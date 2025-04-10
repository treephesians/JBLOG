import { FC } from "react";

interface TimelineItemProps {
  date: string;
  title: string;
  subtitle: string;
  link?: boolean;
  isLast?: boolean;
}

const TimelineItem: FC<TimelineItemProps> = ({
  date,
  title,
  subtitle,
  isLast = false,
}) => {
  return (
    <div className="flex group">
      <div className="relative flex-grow pl-8">
        {/* 원과 선 */}
        <div className="absolute left-0 top-1 w-3 h-3 rounded-full border-2 border-gray-400 dark:border-border bg-background transition-colors"></div>
        {!isLast && (
          <div
            className="absolute left-[5.5px] top-[16px] bottom-0 w-0.5 bg-gray-300 dark:bg-border"
            style={{ height: "calc(100% + 2rem)" }}
          ></div>
        )}

        <div className="flex flex-col sm:flex-row">
          <div className="mb-1 sm:mb-0 sm:w-24 md:w-32 lg:w-40 shrink-0 text-sm text-muted-foreground font-light">
            {date}
          </div>

          <div>
            <h3 className="text-base font-bold mb-0.5">{title}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;
