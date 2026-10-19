import { ChevronDown } from "lucide-react";

import { statusIcons, statusStyles } from "../statusConfig";
import { statusBadgeStyles as s } from "../../../assets/dummyStyles";

const StatusBadge = ({ status, withChevron = false }) => {
  const Icon = statusIcons[status];

  return (
    <span className={`${s.badge} ${statusStyles[status] || s.badgeFallback}`}>
      {Icon && <Icon className={s.icon} />}
      {status}
      {withChevron && <ChevronDown className={s.chevron} />}
    </span>
  );
};

export default StatusBadge;
