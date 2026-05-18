import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TileView from './TileView';
import TableView from './TableView';
import 'dayjs/locale/en-gb';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Menu from '@mui/material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useDispatch } from "react-redux";
import Options from './Options';
import Input from './Input';
import { isOverdue } from './Overdue';
import { handleAdd } from './Add';
import { handleDelete } from './Delete';
import { handleEdit } from './Edit';
import { handlesort } from './Sort';
import { handleStatusChange } from './Statuschange';
import Navbar from './Navbar';
import Board from './Board';

/*const List = styled('ul')({
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
});*/

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 1,
    },
}));

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color: 'rgb(55, 65, 81)',
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    },

}));


export default function ToDo() {
    const [date, setDate] = useState(null);
    const [dueDate, setDueDate] = useState(null);
    const [time, settime] = useState(null);
    const [task, settask] = useState("");
    const [desc, setdesc] = useState("");
    const [list, setList] = useState([]);
    const [viewMode, setViewMode] = useState('tile');
    const [sortAnchorEl, setSortAnchorEl] = useState(null);
    const [filterAnchorEl, setFilterAnchorEl] = useState(null);
    const [viewAnchorEl, setViewAnchorEl] = useState(null);
    const [PageAnchorEl, setPageAnchorEl] = useState(null);
    const [StatusAnchorEl, setStatusAnchorEl] = useState(null);
    const [sort, setsort] = useState("Default")
    const [selectedStatusId, setSelectedStatusId] = useState(null);
    const [activeFilter, setActiveFilter] = useState("All");
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    let disabledbtn = !date || !dueDate || !time || !task || (dueDate && date && dueDate.isBefore(date, 'day'));


    const fetchTasks = async () => {
        try {
            const response = await fetch(
                "http://localhost:3000/"
            );
            const data = await response.json();
            setList(data.data);
        } catch (err) {
            console.log(err.message);
        }
    };


    const dispatch = useDispatch();

    const handleStatusMenuOpen = (event, id) => {
        setStatusAnchorEl(event.currentTarget);
        setSelectedStatusId(id);
    };


    const handleFilter = (opt) => {
        setActiveFilter(opt || "All");
        setFilterAnchorEl(null);
    };
    const displayedList = activeFilter === "All" ? list : list.filter(item => item.status === activeFilter);
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = displayedList.slice(indexOfFirstRow, indexOfLastRow);
    const setPage = (count) => {
        setRowsPerPage(Number(count));
        setCurrentPage(1);
        setPageAnchorEl(null);
    };
    const totalPages = Math.ceil(displayedList.length / rowsPerPage);
    useEffect(() => {
        const loadData = async () => {
            await fetchTasks();
        };

        loadData();
    }, []);

    useEffect(() => {

        const timer = setInterval(async () => {

            const updatedTasks = [...list];

            let changed = false;

            for (const item of updatedTasks) {

                if (
                    item.status !== "Expire" &&
                    isOverdue(item)
                ) {

                    try {

                        await fetch(
                            `http://localhost:3000/updatestatus/${item.id}`,
                            {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    status: "Expire",
                                }),
                            }
                        );

                        item.status = "Expire";

                        changed = true;

                    } catch (err) {

                        console.log(err.message);
                    }
                }
            }

            if (changed) {
                setList(updatedTasks);
            }

        }, 6000);

        return () => clearInterval(timer);

    }, [list]);

    return (
        <>
            <Navbar />
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Input
                        setDate={setDate}
                        settask={settask}
                        setdesc={setdesc}
                        setDueDate={setDueDate}
                        settime={settime}
                        disabledbtn={disabledbtn}
                        date={date}
                        task={task}
                        desc={desc}
                        dueDate={dueDate}
                        time={time}
                        handleAdd={() =>
                            handleAdd({
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
                            })}
                    />

                    <Options
                        handlesort={(opt) =>
                            handlesort(
                                opt,
                                list,
                                setList,
                                setsort,
                                setSortAnchorEl
                            )
                        }
                        displayedList={displayedList}
                        setSortAnchorEl={setSortAnchorEl}
                        KeyboardArrowDownIcon={KeyboardArrowDownIcon}
                        StyledMenu={StyledMenu}
                        setFilterAnchorEl={setFilterAnchorEl}
                        handleFilter={handleFilter}
                        setViewAnchorEl={setViewAnchorEl}
                        setViewMode={setViewMode}
                        setPageAnchorEl={setPageAnchorEl}
                        setPage={setPage}
                        sort={sort}
                        activeFilter={activeFilter}
                        viewMode={viewMode}
                        rowsPerPage={rowsPerPage}
                        sortAnchorEl={sortAnchorEl}
                        filterAnchorEl={filterAnchorEl}
                        viewAnchorEl={viewAnchorEl}
                        PageAnchorEl={PageAnchorEl}
                    />

                    {(list.length > 0) && (
                        <>
                            {viewMode === 'table' && (
                                < TableView
                                    handleStatusChange={(newStatus) =>
                                        handleStatusChange(
                                            newStatus,
                                            selectedStatusId,
                                            list,
                                            setList,
                                            setStatusAnchorEl,
                                            setSelectedStatusId
                                        )
                                    }
                                    handleEdit={(row) =>
                                        handleEdit({
                                            row,
                                            setDate,
                                            setDueDate,
                                            settask,
                                            settime,
                                            setdesc,
                                            handleDelete
                                        })
                                    }
                                    handleDelete={(id) =>
                                        handleDelete({
                                            id,
                                            list,
                                            dispatch,
                                            setList
                                        })
                                    }
                                    currentRows={currentRows}
                                    handleStatusMenuOpen={handleStatusMenuOpen}
                                    isOverdue={isOverdue}
                                    setStatusAnchorEl={setStatusAnchorEl}
                                    StatusAnchorEl={StatusAnchorEl}
                                    setCurrentPage={setCurrentPage}
                                    totalPages={totalPages}
                                    currentPage={currentPage}
                                    StyledMenu={StyledMenu}
                                    StyledTableCell={StyledTableCell}
                                    StyledTableRow={StyledTableRow}
                                />
                            )}

                            {viewMode === 'tile' && (
                                <TileView
                                    setList={setList}
                                    handleStatusChange={(newStatus) =>
                                        handleStatusChange(
                                            newStatus,
                                            selectedStatusId,
                                            list,
                                            setList,
                                            setStatusAnchorEl,
                                            setSelectedStatusId
                                        )
                                    }
                                    handleEdit={(row) =>
                                        handleEdit({
                                            row,
                                            setDate,
                                            setDueDate,
                                            settask,
                                            settime,
                                            setdesc,
                                            handleDelete
                                        })
                                    }
                                    handleDelete={(id) =>
                                        handleDelete({
                                            id,
                                            list,
                                            dispatch,
                                            setList
                                        })
                                    }
                                    displayedList={displayedList}
                                    setStatusAnchorEl={setStatusAnchorEl}
                                    handleStatusMenuOpen={handleStatusMenuOpen}
                                    isOverdue={isOverdue}
                                    StyledMenu={StyledMenu}
                                    StatusAnchorEl={StatusAnchorEl}

                                />)}
                          
                            {viewMode === 'board' && (
                                <Board
                                    displayedList={displayedList}
                                    setList={setList}
                                    isOverdue={isOverdue}
                                    handleEdit={handleEdit}
                                    handleDelete={handleDelete}
                                    dispatch={dispatch}
                                />
                            )}
                        </>
                    )}
                </Grid>
            </Box></>)
}