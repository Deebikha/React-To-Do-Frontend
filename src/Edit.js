import dayjs from "dayjs";

export const handleEdit = ({
  row,
  setDate,
  setDueDate,
  settask,
  settime,
  setdesc,
  handleDelete
}) => {
        setDate(dayjs(row.date));
        setDueDate(dayjs(row.dueDate));
        settask(row.taskName);
        settime(dayjs(`2000-01-01 ${row.time}`));
        setdesc(row.desc);
        handleDelete(row.id);
    };