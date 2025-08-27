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
        <div className="ml-auto font-semibold text-[10px] text-blue-500">
          <Chip type="suggestedUser" value={"suggested"} />
        </div>
      )}
    </div>
  </components.Option>
);

const PriorityUserSelect = ({ log, isInactive, handleAssignedChange }) => {
  const {
    data: users
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers({ page: 1, limit: maxLimitInteger, active: "active" }),
  });

  const { data: suggestedUsers } = useQuery({
    queryKey: ["suggestedUsers", log.error_signature],
    queryFn: () => getSuggestedUsers({ error_signature: log.error_signature }),
    enabled: !!log.error_signature,
  });

  const suggestedIds = suggestedUsers?.suggestions?.map((u) => u.userId) || [];

  const suggested = [];
  const normal = [];

  users?.data?.forEach((u) => {
    const option = {
      value: u.id,
      label: u.username,
      isSuggested: suggestedIds.includes(u.id),
    };
    if (option.isSuggested) suggested.push(option);
    else normal.push(option);
  });

  const userOptions = [...suggested, ...normal];

  return (
    <Select
      options={userOptions}
      defaultValue={userOptions.find((u) => u.value === log.assigned_to)}
      onChange={handleAssignedChange}
      isSearchable
      className="w-[13rem] cursor-pointer"
      isDisabled={isInactive}
      components={{ Option: UserOption }}
    />
  );
};

export default PriorityUserSelect;
