import React from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const useScrollTriggerRefresh = () => {
  const [pageHeight, setPageHeight] = React.useState(0);

  React.useEffect(() => {
    //this effect check the change of page height after page loaded.
    //due to late load of img or svg, that can change the page height and mess up the ScrollTrigger pin placement
    //then Set pageHeight State width page height
    const resizeObserver = new ResizeObserver((entries) => {
      setPageHeight(entries[0].target.clientHeight);
    });
    resizeObserver.observe(document.body);
  }, []);

  React.useEffect(() => {
    //this effect run if only there is change with the pageHeight
    //to minimize ScrollTrigger.refresh() call
    console.log("scroll trigger refreshed", pageHeight);
    ScrollTrigger.refresh(true);
  }, [pageHeight]);
};

/**HOW TO USE
 * 1. import this file into your react project
 * 2. just call this hooks by useScrollTriggerRefresh()
 */
