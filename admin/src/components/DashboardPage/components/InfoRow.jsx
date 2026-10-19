import { infoRowStyles as s } from "../../../assets/dummyStyles";

const InfoRow = ({ icon: Icon, label, value, wide = false }) => (
  <div className={`${s.container} ${wide ? s.wide : ""}`}>
    <div className={s.header}>
      <Icon className={s.icon} />
      <span>{label}</span>
    </div>
    <p className={s.value}>{value || "-"}</p>
  </div>
);

export default InfoRow;
