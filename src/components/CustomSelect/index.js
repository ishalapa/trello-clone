import React, {useState} from 'react'

import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material"

const CustomSelect = () => {
    const [members, setMembers] = useState('');

  const handleChange = (event) => {
    setMembers(event.target.value);
  };
  return (
    <Box sx={{ minWidth: 120 }}>
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Members</InputLabel>
      <Select
      size='small'
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={members}
        label="members"
        onChange={handleChange}
      >
        <MenuItem value={"All"}>All</MenuItem>
        <MenuItem value={"Favorites"}>Favorited</MenuItem>
      </Select>
    </FormControl>
  </Box>
  )
}

export default CustomSelect