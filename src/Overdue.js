import dayjs from "dayjs";
  export  const isOverdue = (task) => {
        if (!task.dueDate || !task.time) {
            return false;
        }
        const currentDate = dayjs().format("YYYY-MM-DD");
        const currentTime = dayjs().format("HH:mm:ss");
        const taskDate = dayjs(task.dueDate)
            .format("YYYY-MM-DD");
        const taskTime = dayjs(`2000-01-01 ${task.time}`)
            .format("HH:mm:ss");
        if (taskDate < currentDate) {
            return true;
        }
        if (
            taskDate === currentDate &&
            taskTime < currentTime
        ) {
            return true;
        }
        return false;
    };