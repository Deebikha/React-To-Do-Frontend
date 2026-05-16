export const handleStatusChange = async (
  newStatus,
  selectedStatusId,
  list,
  setList,
  setStatusAnchorEl,
  setSelectedStatusId
) => {

  if (selectedStatusId === null) return;

  try {

    await fetch(
      `http://localhost:3000/updatestatus/${selectedStatusId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      }
    );

    const updatedList = list.map((item) =>
      item.id === selectedStatusId
        ? { ...item, status: newStatus }
        : item
    );

    setList(updatedList);

    setStatusAnchorEl(null);

    setSelectedStatusId(null);

  } catch (err) {

    console.log(err.message);
  }
};