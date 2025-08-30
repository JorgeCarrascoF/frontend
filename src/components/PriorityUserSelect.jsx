import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../queries/getUsers";
import { maxLimitInteger } from "../utils/maxLimitInteger";
import { getSuggestedUsers } from "../queries/getSuggestedUsers";
import Select from "react-select";
// eslint-disable-next-line no-unused-vars
import { components } from "react-select";
import Chip from "./Chip";

const UserOption = (props) => (
  <components.Option {...props}>
    <div className="text-left w-full flex align-center justify-between">
      <span className="w-[100%] truncate">{props.data.label}</span>
      {props.data.isSuggested && (
        <div className=" font-semibold text-[10px] text-blue-500">
          <Chip type="suggestedUser" value={"suggested"} />
          {props.data.resolved_count} solved
        </div>
      )}
    </div>
  </components.Option>
);

const PriorityUserSelect = ({ log, isInactive, handleAssignedChange, selectedUser }) => {
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      getUsers({ page: 1, limit: maxLimitInteger, isActive: "true" }),
  });

  const { data: suggestedUsers } = useQuery({
    queryKey: ["suggestedUsers", log.error_signature],
    queryFn: () => getSuggestedUsers({ error_signature: log.error_signature }),
    enabled: !!log.error_signature,
  });

  const sortedSuggestedUsers = [...(suggestedUsers?.suggestions || [])]
    .sort((a, b) => b.resolved_count - a.resolved_count);

  //const suggestedIds = suggestedUsers?.suggestions?.map((u) => u.userId) || [];
  const suggestedIds = new Set(sortedSuggestedUsers.map(s => s.userId));

  //const suggested = [];
  //const normal = [];

  const suggested = sortedSuggestedUsers.map(s => ({
    value: s.userId,
    label: users?.data?.find((u) => u.id === s.userId)?.username || s.userId,
    isSuggested: true,
    resolved_count: s.resolved_count,
  }));

  const normal = (users?.data || [])
    .filter((u) => !suggestedIds.has(u.id))
    .map((u) => ({
      value: u.id,
      label: u.username,
      isSuggested: false,
      resolved_count: 0,
    }));

  /*users?.data?.forEach((u) => {
    const option = {
      value: u.id,
      label: u.username,
      isSuggested: suggestedIds.includes(u.id),
    };
    if (option.isSuggested) suggested.push(option);
    else normal.push(option);
  });*/

  //const userOptions = [...suggested, ...normal];
  const finalOptions = [...suggested, ...normal];


  return (
    <Select
      //options={userOptions}
      options={finalOptions}
      //value={selectedUser || userOptions.find((u) => u.value === log.assigned_to) || null}
      value={selectedUser || finalOptions.find((u) => u.value === log.assigned_to) || null}
      onChange={handleAssignedChange}
      isSearchable
      className="w-[264px] cursor-pointer"
      isDisabled={isInactive}
      components={{ Option: UserOption }}
      styles={{
        control: (provided, state) => ({
          ...provided,
          borderRadius: "8px",
          borderColor: state.isFocused ? "#295ba2" : "#d1d5db",
          backgroundColor: "#ffffff",
          color: "black",
          cursor: "pointer",
        }),
        menu: (provided) => ({
          ...provided,
          borderRadius: "8px",
          backgroundColor: "#ffffff",
          boxShadow:
            "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
          cursor: "pointer",
        }),
        option: (provided, state) => ({
          backgroundColor: state.isFocused ? "#e3ebf6" : "#ffffff",
          padding: 8,
          paddingLeft: 16,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 10,
        }),
        dropdownIndicator: (provided) => ({
          ...provided,
          paddingRight: 5,
        }),
        indicatorSeparator: () => ({
          display: "none",
        }),
        singleValue: (provided) => ({
          ...provided,
          color: "#737373",
          textAlign: "left",
        }),
        placeholder: (provided) => ({
          ...provided,
          color: "#737373",
          textAlign: "left",
        }),
      }}
    />
  );
};

export default PriorityUserSelect;
