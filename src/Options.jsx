import { Grid,Button,MenuItem } from '@mui/material';
export default function Options({setSortAnchorEl,KeyboardArrowDownIcon,StyledMenu,handlesort,
    setFilterAnchorEl,handleFilter,setViewAnchorEl,setViewMode,setPageAnchorEl,sort,activeFilter,viewMode
    ,rowsPerPage,sortAnchorEl,filterAnchorEl,viewAnchorEl,PageAnchorEl,setPage, displayedList}
) {
  return (
    <Grid
              container
              size={12}
              spacing={2}
              sx={{
                mt: 3,
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex'
              }}
            >
    
    
              <Grid size={{ xs: 'auto' }}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={(e) => setSortAnchorEl(e.currentTarget)}
                  endIcon={<KeyboardArrowDownIcon />}
                >
                  {sort}
                </Button>
                <StyledMenu anchorEl={sortAnchorEl} open={Boolean(sortAnchorEl)} onClose={() => setSortAnchorEl(null)}>
                  <MenuItem onClick={() => handlesort("Default")}>Default</MenuItem>
                  <MenuItem onClick={() => handlesort("A-Z")}>A-Z</MenuItem>
                  <MenuItem onClick={() => handlesort("Z-A")}> Z-A</MenuItem>
                </StyledMenu>
              </Grid>
    
    
              <Grid size={{ xs: 'auto' }}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={(e) => setFilterAnchorEl(e.currentTarget)}
                  endIcon={<KeyboardArrowDownIcon />}
                  style={{ align: "center" }}
                >
                  {activeFilter}
                </Button>
                <StyledMenu anchorEl={filterAnchorEl} open={Boolean(filterAnchorEl)} onClose={() => setFilterAnchorEl(null)}>
                  <MenuItem onClick={() => { handleFilter(""); setFilterAnchorEl(null); }}> All </MenuItem>
                  <MenuItem onClick={() => { handleFilter("Pending"); setFilterAnchorEl(null); }}> Pending</MenuItem>
                  <MenuItem onClick={() => { handleFilter("InProgress"); setFilterAnchorEl(null); }}> InProgress</MenuItem>
                  <MenuItem onClick={() => { handleFilter("Completed"); setFilterAnchorEl(null); }}> Completed</MenuItem>
                  <MenuItem onClick={() => { handleFilter("Expire"); setFilterAnchorEl(null); }}> Expire</MenuItem>
                </StyledMenu>
              </Grid>
    
    
              <Grid size={{ xs: 'auto' }}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={(e) => setViewAnchorEl(e.currentTarget)}
                  endIcon={<KeyboardArrowDownIcon />}
                >
                  {viewMode}
                </Button>
                <StyledMenu anchorEl={viewAnchorEl} open={Boolean(viewAnchorEl)} onClose={() => setViewAnchorEl(null)}>
                  <MenuItem onClick={() => { setViewMode('tile'); setViewAnchorEl(null); }}>Tile</MenuItem>
                  <MenuItem onClick={() => { setViewMode('table'); setViewAnchorEl(null); }}> Table</MenuItem>
                </StyledMenu>
              </Grid>
    
              <Grid size={{ xs: 'auto' }}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={(e) => setPageAnchorEl(e.currentTarget)}
                  endIcon={<KeyboardArrowDownIcon />
                  }
                  disabled={viewMode === 'tile'}
                >
                  {rowsPerPage}
                </Button>
                <StyledMenu anchorEl={PageAnchorEl} open={Boolean(PageAnchorEl)} onClose={() => setPageAnchorEl(null)} >
                  <MenuItem onClick={() => { setPage(displayedList.length); setPageAnchorEl(null); }}>All</MenuItem>
                  <MenuItem onClick={() => { setPage(5); setPageAnchorEl(null); }}>5</MenuItem>
                  <MenuItem onClick={() => { setPage(10); setPageAnchorEl(null); }}>10</MenuItem>
                </StyledMenu>
              </Grid>
            </Grid>
  )
}
