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
            id: 10,
            name: "Test10"
        },
        {
            id: 11,
            name: "Test11"
        },
        {
            id: 12,
            name: "Test12"
        },
        {
            id: 13,
            name: "Test13"
        },
        {
            id: 14,
            name: "Test14"
        }
    ];

    // row.assignedto contains user ID
    const selectedUser = row.assignedto
        ? {
            id: row.assignedto,
            name: `Test${row.assignedto}`
        }
        : null;
    //console.log(row.assignedto);
    //console.log(users);
    const handleAssign = async (newValue) => {

        const assignedId =
            typeof newValue === "object"
                ? newValue.id
                : null;

        const updated = displayedList.map(item =>
            item.id === row.id
                ? {
                    ...item,
                    assignedto: assignedId
                }
                : item
        );

        setList(updated);

        await fetch(
            `http://localhost:3000/updateassign/${row.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    assignedto: assignedId
                })
            }
        );
    };

    return (

        <Autocomplete
            freeSolo
            disabled={
                row.status === 'Expire' ||
                isOverdue(row)
            }

            options={users}

            value={selectedUser}

            isOptionEqualToValue={(option, value) =>
                option.id === value.id
            }

            onChange={(event, newValue) => {
                handleAssign(newValue);
            }}

            getOptionLabel={(option) =>
                option?.name || ""
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