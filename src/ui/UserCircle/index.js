import React from 'react'

import { Typography, Box } from '@mui/material';

const UserCircle = ({handleClick, size, iconName}) => {

  return (
    <Box onClick={handleClick('bottom-start')} variant="contained">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width={size}
            height={size}
            sx={{ backgroundColor: '#004285', cursor:"pointer" }}
            borderRadius="50%"
          >
            <Typography color={'white'} fontSize={14} textAlign="center" variant="subtitle2" sx={{ p: 1 }}>
              {iconName ? iconName.split(' ')[0].slice(0, 1) + iconName.split(' ')[1].slice(0, 1) : "User"}
            </Typography>
          </Box>
        </Box>
  )
}

export default UserCircle