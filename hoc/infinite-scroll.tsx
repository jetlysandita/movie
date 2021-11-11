import { useEffect, useRef } from "react";

export const InfiniteScroll = ({ onScrollBottom, children }: any) => {
  const lastChild = useRef(null);

  const handleObserver = (entities: any) => {
    const target = entities[0];
    if (target.isIntersecting) {
      onScrollBottom();
    }
  };

  useEffect(() => {
    var options = {
      root: null,
      rootMargin: "0px",
      threshold: 1,
    };
    // initialize IntersectionObserver
    // and attaching to Load More div
    const observer = new IntersectionObserver(handleObserver, options);
    if (lastChild.current) observer.observe(lastChild.current);

    return () => {
      if (lastChild.current) observer.unobserve(lastChild.current);
    };
  }, [children]);

  return (
    <>
      {children}
      <div ref={lastChild} />
    </>
  );
};
