import React, {useState} from 'react'

import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material"

const CustomSelect = () => {
    const [theme, setTheme] = useState('');

  const handleChange = (event) => {
    setTheme(event.target.value);
  };
  return (
    <Box sx={{ minWidth: 120 }}>
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Theme</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={theme}
        label="Theme"
        onChange={handleChange}
      >
        <MenuItem value={10}>Blue</MenuItem>
        <MenuItem value={20}>Day</MenuItem>
        <MenuItem value={30}>Night</MenuItem>
      </Select>
    </FormControl>
  </Box>
  )
}

export default CustomSelect