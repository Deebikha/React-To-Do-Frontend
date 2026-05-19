import { Addaction } from "./Duplicate";
import { addTask } from "./taskSlice";

export const handleAdd = async ({
  date,
  task,
  desc,
  dueDate,
  time,
  list,
  fetchTasks,
  dispatch,
  setDate,
  settask,
  setdesc,
  setDueDate,
  settime
}) => {
        const success = Addaction(date, task, desc, dueDate, time,list);
        if (!success) return;
        const newTask = {
            date: date
                ? date.format("YYYY-MM-DD")
                : "",
            taskName: task.trim(),
            desc: desc,
            dueDate: dueDate
                ? dueDate.format("YYYY-MM-DD")
                : "",
            time: time
                ? time.format("HH:mm:ss")
                : "",
            status: "Pending"
        };
        try {
            const response = await fetch(
                "http://localhost:3000/save",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify([newTask]),
                }
            );
            const data = await response.json();
            //console.log(data);
            await fetchTasks();
            dispatch(addTask(data.data[0]));
            setDate(null);
            settask("");
            setdesc("");
            setDueDate(null);
            settime(null);
        } catch (err) {
            console.log(err.message);
        }
    };