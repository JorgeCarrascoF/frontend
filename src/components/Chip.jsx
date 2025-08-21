import capitalizeWords from "../utils/capitalizeWords";

const stylesMap = {
  priority: {
    high: { text: "text-[#E51D1D]", bg: "bg-[#FFF1F1]", point: "bg-[#E51D1D]" },
    medium: {
      text: "text-[#F08401]",
      bg: "bg-[#FFFAE6]",
      point: "bg-[#F08401]",
    },
    low: { text: "text-[#358438]", bg: "bg-[#F3FAF3]", point: "bg-[#358438]" },
  },
  status: {
    unresolved: { text: "text-[#274673]", bg: "bg-[#E3EBF6]" },
    "in review": { text: "text-[#274673]", bg: "bg-[#EDEDED]" },
    solved: { text: "text-[#E3EBF6]", bg: "bg-[#295BA2]" },
  },
  assignee: {
    text: "text-[#274673]",
    bg: "bg-[#FAFAFA]",
    border: "border-[#DBDBDB]",
  },
  environment: {
    text: "text-[#737373]",
    bg: "bg-[#FAFAFA]",
    border: "border-[#DBDBDB]",
  },
  userStatus:{
    active: {
      bg: "bg-[#295BA2]",
      text: "text-white",
    },
    inactive: {
      bg: "bg-[#EDEDED]",
      text: "text-[#274673]",
      border: ""
    }

  }
}

const Chip = ({ type, value, showPoint }) => {
  const safeValue = (value || "").toLowerCase();
  const style = (stylesMap[type]?.[safeValue] || stylesMap[type] || stylesMap.assignee) ?? {};
  return (
    <div
      className={`text-center ${type == "assignee" ? "w-[130px]" : "w-[107px]"} rounded-lg py-1 ${style.bg} ${
        style.text
      } ${style.border || ""} ${style.border && "border"}`}
    >
      <div
        className={`flex items-center ${
          showPoint ? "justify-start px-5" : "justify-center"
        } gap-2 `}
      >
        {showPoint && style.point && (
          <div className={`w-2 h-2 rounded-full ${style.point}`}></div>
        )}
        <span className={`${type == "assignee" ? "max-w-[13ch]" : "max-w-[12ch]"} max-w-[12ch] truncate overflow-hidden`}>
          {capitalizeWords(value)}
        </span>
      </div>
    </div>
  );
};

export default Chip;
