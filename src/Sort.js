export const handlesort = (
  opt,
  list,
  setList,
  setsort,
  setSortAnchorEl
) => {

  const updatedlist = [...list];

  if (opt === 'A-Z') {
    updatedlist.sort((a, b) =>
      a.taskName.localeCompare(b.taskName)
    );

  } else if (opt === 'Z-A') {

    updatedlist.sort((a, b) =>
      b.taskName.localeCompare(a.taskName)
    );

  } else {

    updatedlist.sort((a, b) => a.id - b.id);
  }

  setsort(opt);

  setList(updatedlist);

  setSortAnchorEl(null);
};