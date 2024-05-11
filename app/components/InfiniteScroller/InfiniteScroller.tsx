import { ReactNode, useEffect, useRef } from "react";

interface InfiniteScrollerProps {
  children: ReactNode;
  loading: boolean;
  loadNext?: () => void;
}

function InfiniteScroller({
  children,
  loading,
  loadNext = () => {},
}: InfiniteScrollerProps) {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const scrollListener = useRef(loadNext);

  useEffect(() => {
    scrollListener.current = loadNext;
  }, [loadNext]);

  useEffect(() => {
    const onScroll = () => {
      const documentHeight = document.documentElement.scrollHeight;
      const scrollDifference = Math.floor(window.innerHeight + window.scrollY);
      const scrollEnded = documentHeight == scrollDifference;

      if (scrollEnded && !loading) {
        scrollListener.current();
      }
    };

    const scrollable = scrollContainer?.current;

    if (scrollable) {
        scrollable.addEventListener("scroll", onScroll);
    }

    return () => {
        scrollable?.removeEventListener("scroll", onScroll);
    };
  }, [loading]);

  return (
    <>
      <div
        className="w-full h-full overflow-y-auto hidden-scroll pb-2"
        ref={scrollContainer}
      >
        {children}
        {loading ? (
        <div className="flex items-center justify-center">
          <svg
            width={80}
            height={80}
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className="w-20 h-20"
          >
            <circle
              cx={40}
              cy={47}
              r={3}
              fill="#7357FF"
              stroke="#7357FF"
              strokeWidth={2}
              className="animate-fade"
              style={{ opacity: "0.6", animationDelay: "0.4s" }}
            />
            <circle
              cx={48}
              cy={35}
              r={3}
              fill="#7357FF"
              stroke="#7357FF"
              strokeWidth={2}
              className="animate-fade"
              style={{ opacity: "0.3", animationDelay: "0.2s" }}
            />
            <circle
              cx={32}
              cy={35}
              r={3}
              fill="#7357FF"
              stroke="#7357FF"
              strokeWidth={2}
              className="animate-fade"
            />
          </svg>
        </div>
      ) : null}
      </div>
     
    </>
  );
}

export default InfiniteScroller;
