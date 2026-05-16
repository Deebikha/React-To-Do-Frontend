import dayjs from "dayjs";

export const Addaction = (
    date,
    task,
    desc,
    dueDate,
    time,
    list
) => {

    const formattedDate =
        date.format("YYYY-MM-DD");

    const formattedTask =
        task.trim().toLowerCase();

    const duplicate = list.some((item) => {

        return (
            dayjs(item.date).format("YYYY-MM-DD")
            === formattedDate &&

            item.taskName
                .trim()
                .toLowerCase()
            === formattedTask
        );
    });

    if (duplicate) {

        alert("Duplicate Found");

        return false;
    }

    return true;
};