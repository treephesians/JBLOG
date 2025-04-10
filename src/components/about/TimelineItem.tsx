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
        <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-gray-400 dark:border-border bg-background  transition-colors"></div>
        {!isLast && (
          <div
            className="absolute left-1.5 top-4 bottom-0 w-0.5 bg-gray-300 dark:bg-border"
            style={{ height: "calc(100% + 2rem)" }}
          ></div>
        )}

        <div className="flex">
          <div className="w-24 sm:w-32 md:w-64 shrink-0 text-sm text-muted-foreground font-light pt-0.5">
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
