import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Paper,
    Divider,
    Button,
    CardActions
} from "@mui/material";

import {
    DndContext,
    closestCenter
} from "@dnd-kit/core";
import Assign from "./Assign";
import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

function SortableItem({ row, children, isOverdue }) {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: row.id,
        disabled: isOverdue(row)
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: "default",
        opacity: 1,
        zIndex: isDragging ? 9999 : "auto",
        position: "relative",
        backgroundColor: "white",
        height: "fit-content",
        width: "100%",
        display: "inline-block"
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
        >
            {children(attributes, listeners)}
        </div>
    );
}

export default function Board({
    displayedList,
    setList,
    isOverdue,
    handleEdit,
    handleDelete,
    dispatch,
    row
}) {

    const columns = [
        "Pending",
        "InProgress",
        "Completed",
        "Expire"
    ];
    const handleDragEnd = async (event) => {
        const { active, over } = event;
        if (!over) return;
        const draggedTask = displayedList.find(
            item => item.id === active.id
        );
        const overTask = displayedList.find(
            item => item.id === over.id
        );
        let newStatus;
        if (overTask) {
            newStatus = overTask.status;
        }
        else {
            newStatus = over.id;
        }

        if (!newStatus) return;

        const updated = displayedList.map(item =>
            item.id === active.id
                ? { ...item, status: newStatus }
                : item
        );
        setList(updated);
        try {
            await fetch(
                `http://localhost:3000/updatestatus/${active.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        status: newStatus
                    })
                }
            );

        } catch (err) {

            console.log(err);

        }
    };
    return (

        <Box
            sx={{
                width: "100%",
                height: "calc(100vh - 45px)",
                p: 1
            }}
        >

            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >

                <Grid container spacing={2}>

                    {columns.map((column) => {

                        const filteredTasks = displayedList.filter(
                            item =>
                                item.status === "Expire"
                                    ? column === "Expire"
                                    : item.status === column
                        );

                        return (

                            <Grid
                                size={3}
                                key={column}
                                sx={{
                                    display: "flex"
                                }}
                            >
                                <Paper
                                    sx={{
                                        width: "100%",
                                        p: 1,
                                        backgroundColor: "#f5f5f5",
                                        overflowY: "auto",
                                        height: "fit-content",
                                        paddingBottom: "3px"
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            textAlign: "center",
                                            mb: 2,
                                            fontWeight: "bold"
                                        }}
                                    >
                                        {column}
                                    </Typography>

                                    <SortableContext
                                        items={filteredTasks.map(item => item.id)}
                                        strategy={verticalListSortingStrategy}
                                    >

                                        <Box
                                            id={column}
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: 2
                                            }}
                                        >

                                            {filteredTasks.map((row) => (

                                                <Box
                                                    key={row.id}
                                                    sx={{
                                                        width: "100%",
                                                        mb: 2
                                                    }}
                                                >
                                                    <SortableItem
                                                        row={row}
                                                        isOverdue={isOverdue}
                                                    >
                                                        {(attributes, listeners) => (

                                                            <Card
                                                                sx={{
                                                                    bgcolor:
                                                                        row.status === "Expire" || isOverdue(row)
                                                                            ? "rgba(255,0,0,0.7)"
                                                                            : "white"
                                                                }}
                                                            >

                                                                <Box
                                                                    {...attributes}
                                                                    {...listeners}
                                                                    sx={{
                                                                        cursor: "grab",
                                                                        display: "flex",
                                                                        justifyContent: "flex-end",
                                                                        p: 1,
                                                                        fontSize: "20px"
                                                                    }}
                                                                >
                                                                    ☰
                                                                </Box>

                                                                <Assign
                                                                    isOverdue={isOverdue}
                                                                    row={row}
                                                                    displayedList={displayedList}
                                                                    setList={setList}
                                                                    mt={1}
                                                                />

                                                                <CardContent>

                                                                    <Typography
                                                                        sx={{
                                                                            fontSize: 14,
                                                                            color: "text.secondary"
                                                                        }}
                                                                    >
                                                                        Date:
                                                                        {
                                                                            dayjs(row.date)
                                                                                .local()
                                                                                .format("DD-MM-YYYY")
                                                                        }
                                                                    </Typography>

                                                                    <Typography variant="h6">
                                                                        {row.taskName}
                                                                    </Typography>

                                                                    <Typography sx={{ mb: 1 }}>
                                                                        {row.desc || "No Description"}
                                                                    </Typography>

                                                                    <Divider sx={{ my: 1 }} />

                                                                    <Typography variant="body2">
                                                                        Due:
                                                                        {
                                                                            dayjs(row.dueDate)
                                                                                .local()
                                                                                .format("DD-MM-YYYY")
                                                                        }
                                                                    </Typography>

                                                                </CardContent>

                                                                <CardActions>

                                                                    <Button
                                                                        size="small"
                                                                        onClick={() => handleEdit(row)}
                                                                        disabled={row.status === 'Expire' || isOverdue(row)}
                                                                    >
                                                                        Edit
                                                                    </Button>

                                                                    <Button
                                                                        size="small"
                                                                        color="error"
                                                                        onClick={() =>
                                                                            handleDelete({
                                                                                id: row.id,
                                                                                list: displayedList,
                                                                                dispatch,
                                                                                setList
                                                                            })
                                                                        }
                                                                    >
                                                                        Delete
                                                                    </Button>

                                                                </CardActions>

                                                            </Card>

                                                        )}
                                                    </SortableItem>

                                                </Box>

                                            ))}

                                        </Box>

                                    </SortableContext>

                                </Paper>

                            </Grid>

                        );
                    })}

                </Grid>

            </DndContext>

        </Box >

    );
}