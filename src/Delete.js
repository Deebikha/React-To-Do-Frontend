import { deleteTask } from "./taskSlice";

export const handleDelete = async ({
  id,
  list,
  dispatch,
  setList
}) => {
        await fetch(`http://localhost:3000/delete/${id}`, {
            method: 'DELETE',
        });
        const filteredList = list.filter(item => item.id !== id);
        dispatch(deleteTask(id));
        setList(filteredList);
    };