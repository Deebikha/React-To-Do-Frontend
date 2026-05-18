import React from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function Assign({
    isOverdue,
    row,
    displayedList,
    setList,
    mt = 1
}) {

    const users = [
        {
            id: 1,
            name: "Test1"
        },
        {
            id: 2,
            name: "Test2"
        },
        {
            id: 3,
            name: "Test3"
        },
        {
            id: 4,
            name: "Test4"
        }
    ];

    const selectedUser =
        users.find(
            user => user.name === row.assignedto
        ) || null;

    const handleAssign = async (newValue) => {

        const assignedName =
            typeof newValue === "string"
                ? newValue
                : newValue?.name || "";

        const updated = displayedList.map(item =>
            item.id === row.id
                ? {
                    ...item,
                    assignedto: assignedName
                }
                : item
        );

        setList(updated);

        const response = await fetch(
            `http://localhost:3000/updateassign/${row.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    assignedto: assignedName
                })
            }
        );

        const data = await response.json();
    };

    return (

        <Autocomplete
            freeSolo
            disabled={
                row.status === 'Expire' ||
                isOverdue(row)
            }

            options={users}

            value={selectedUser || row.assignedto || ""}

            isOptionEqualToValue={(option, value) =>
                typeof value !== "string" &&
                option.id === value.id
            }

            onChange={(event, newValue) => {
                handleAssign(newValue);
            }}

            getOptionLabel={(option) =>
                typeof option === "string"
                    ? option
                    : option.name
            }

            sx={{
                width: "90%",
                mx: "auto",
                mt: mt
            }}

            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Assign To"
                    size="small"
                />
            )}
        />

    );
}