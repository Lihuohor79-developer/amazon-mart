import { XCircle } from "lucide-react";

import { statusTimelineStyles as s } from "../../../assets/dummyStyles";

const statusTimeline = ({ status }) => {
  if (status === "Cancelled") {
    return (
      <div className={s.cancelledContainer}>
        <XCircle className={s.cancelledIcon} />
        <span className={s.cancelledText}>Order Cancelled</span>
      </div>
    );
  }

  const steps = ["Processing", "On the way", "Delivered"];
  const currentIndex = steps.indexOf(status);

  return (
    <div className={s.timeline}>
      {steps.map((step, index) => {
        const active = currentIndex >= index;
        const last = index === steps.length;
        return (
          <div key={step} className={s.stepWrapper}>
            <div className={s.stepInner}>
              <span
                className={`${s.stepDot} ${active ? s.stepDotActive : s.stepDotInactive}`}
              />

              <span
                className={`${s.stepLabel} ${active ? s.stepLabelActive : s.stepLabelInactive}`}
              >
                {step}
              </span>
            </div>
            {!last && (
              <span
                className={`${s.stepLine} ${active ? s.stepLineActive : s.stepLineInactive}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default statusTimeline;
