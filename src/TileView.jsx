//import { useSelector } from "react-redux";
import {Box,Grid, Card, CardContent, Typography, Button, Divider, CardActions, MenuItem} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import {
  SortableContext,
  useSortable,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
dayjs.extend(utc);
function SortableItem({
  row,
  children
}) {
const {
  attributes,
  listeners,
  setNodeRef,
  transform,
  transition,
  isDragging,
} = useSortable({
  id: row.id
});

const style = {
  transform: CSS.Transform.toString(transform),
  transition,
  width: "100%",
  height: "100%",
  cursor: "grab",
  opacity: isDragging ? 1 : 1,
  zIndex: isDragging ? 9999 : "auto",
  position: "relative",
  backgroundColor: "white",
};
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
}
export default function TileView({displayedList,setStatusAnchorEl,setList,handleStatusMenuOpen,isOverdue, StyledMenu,StatusAnchorEl,handleStatusChange, handleEdit,handleDelete}) {
/* const tasks = useSelector(
  (state) => state.task.tasks
);
*/
const handleDragEnd = (event) => {
  const { active, over } = event;

  if (!over || active.id === over.id) return;

  const oldIndex = displayedList.findIndex(
    (item) => item.id === active.id
  );

  const newIndex = displayedList.findIndex(
    (item) => item.id === over.id
  );

  const reordered = arrayMove(
    displayedList,
    oldIndex,
    newIndex
  );

  // update parent state
  setList(reordered);
};
    return (
        <Box sx={{ px: 4 }} style={{ width: '100%' }} >
          <DndContext
  collisionDetection={closestCenter}
  onDragEnd={handleDragEnd}
>
  <SortableContext
    items={displayedList.map(item => item.id)}
    strategy={rectSortingStrategy}
  >
    <Grid container spacing={2}>
                {displayedList.map((row) => (
                    <Grid size={{ xs: 6, sm: 3, md: 2 }} sx={{ display: "flex" }} key={row.id} >
                         <SortableItem row={row}>
                        <Card variant="outlined" sx={{
                            display: 'flex', width: '100%', height: '100%', flexDirection: 'column',
                            bgcolor: isOverdue(row) ? 'rgba(255, 0, 0, 0.82)' : 'inherit'
                        }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                    Date:{ dayjs(row.date).local().format("DD-MM-YYYY")}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    Task: {row.taskName}
                                </Typography>
                                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                                    Description: {row.desc || "No description"}
                                </Typography>
                                <Divider sx={{ my: 1 }} />
                                <Typography variant="body2">
                                    <strong>Due:</strong>{ dayjs(row.dueDate).local().format("DD-MM-YYYY")} at {row.time? dayjs(`2000-01-01 ${row.time}`)
                                            .format("hh:mm A") : ""}</Typography>
                            </CardContent>
                            <Button
                                variant="contained"
                                size="small"
                                onClick={(e) => handleStatusMenuOpen(e, row.id)}
                                endIcon={<KeyboardArrowDownIcon />}
                                disabled={isOverdue(row)}
                            >
                                {isOverdue(row) ? "Expire" : row.status}
                            </Button>

                            <StyledMenu
                                anchorEl={StatusAnchorEl}
                                open={Boolean(StatusAnchorEl)}
                                onClose={() => setStatusAnchorEl(null)}
                            >
                                <MenuItem onClick={() => handleStatusChange("Pending")}>Pending</MenuItem>
                                <MenuItem onClick={() => handleStatusChange("InProgress")}>InProgress</MenuItem>
                                <MenuItem onClick={() => handleStatusChange("Completed")}>Completed</MenuItem>
                                <MenuItem onClick={() => handleStatusChange("Expire")}>Expire</MenuItem>
                            </StyledMenu>
                            <CardActions style={{ display: "flex" }}>
                                <Button size="small" onClick={() => handleEdit(row)} disabled={isOverdue(row)}>Edit</Button>
                                <Button size="small" color="error" onClick={() => handleDelete(row.id)} sx={{ bgcolor: isOverdue(row) ? 'white' : 'inherit' }}>Delete</Button>
                            </CardActions>
                        </Card>
                        </SortableItem>
                    </Grid>
                ))}
            </Grid>
            </SortableContext>
            </DndContext>
        </Box>
    )
}
