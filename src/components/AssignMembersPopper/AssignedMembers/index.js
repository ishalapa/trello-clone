import React from 'react'

import { Button, Grid, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { currentTaskState } from 'store/slices/tasksSlice'
import { Box } from '@mui/system'
import AssignMembersPopper from '..'

import { arrayRemove, updateDoc } from 'firebase/firestore'
import { AiFillDelete } from 'react-icons/ai'

const AssignedMembers = ({ card, tasksDoc }) => {
  const currentTask = useSelector(currentTaskState)

  const deleteMember = async (member) => {
    await updateDoc(tasksDoc, {
      members: arrayRemove({ email: member.email, id: currentTask.id, key: member.key }),
    })
  }

  return (
    <>
      <Grid container pt={2}>
        <Grid item md={1}></Grid>
        <Grid item md={11}>
          <Typography color={'gray'} variant="subtitle1" id="modal-modal-description">
            Members
          </Typography>
          <Grid container textAlign="center" spacing={1}>
            {card.members &&
              card.members
                .filter((member) => member.id === currentTask.id)
                .map((member) => {
                  return (
                    <Grid key={member.key} item>
                      <Button
                      endIcon={<AiFillDelete onClick={() => deleteMember(member)} color = {"800000"} />}
                      variant='outlined'
                      size='small'
                        
                      >
                        {member.email}
                        
                      </Button>
                    </Grid>
                  )
                })}
            <Box pt={1} pl={1}>
              <AssignMembersPopper card={card} />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default AssignedMembers
