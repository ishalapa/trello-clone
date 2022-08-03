import React from 'react'

import TopBarStart from 'layout/TopBarStart'
import styles from 'assets/scss/Start.module.scss'
import MediaCard from 'ui/MediaCard'

import { Link } from 'react-router-dom'

import { Container, Stack, Box, TextField, Button, Divider } from '@mui/material'

const Start = () => {
  return (
    <>
      <TopBarStart />
      <div className={styles.main}>
        <Container maxWidth="lg">
          <Stack direction="row" pb="40px">
            <Box pt="130px">
              <Box display="flex" justifyContent="center" sx={{ fontSize: 'h2.fontSize', fontWeight: '600' }}>
                Trello helps teams move work forward.
              </Box>
              <Box display="flex" justifyContent="center" pt="25px" sx={{ fontSize: '19px', fontWeight: '400' }}>
                <p style={{ width: '70%' }}>
                  Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office,
                  the way your team works is unique—accomplish it all with Trello.
                </p>
              </Box>
              <Stack direction="row" spacing={2} pt="20px" display="flex" justifyContent="center">
                <TextField
                  sx={{ width: '400px', backgroundColor: 'white' }}
                  id="demo-helper-text-misaligned"
                  label="Email"
                />

                <Link to="/home">
                  <Button variant="contained" sx={{ height: '53px' }}>
                    Sign Up, it's free
                  </Button>
                </Link>
              </Stack>
            </Box>
          </Stack>
          <Divider />
          <Stack pt={5} direction="row" spacing={3} display="flex" justifyContent="center">
            <MediaCard
              img="https://cdn.pixabay.com/photo/2017/01/28/19/06/label-2016248_960_720.png"
              header="See Trello pricing"
              text="Whether you’re a team of 2 or 2,000, Trello can be customized for your organization. Explore which option is best for you."
            />
            <MediaCard
              img="https://cdn.pixabay.com/photo/2017/01/28/19/06/label-2016248_960_720.png"
              header="What is Trello?"
              text="Trello is the visual tool that empowers your team to manage any type of project, workflow, or task tracking."
            />
            <MediaCard
              img="https://cdn.pixabay.com/photo/2017/01/28/19/06/label-2016248_960_720.png"
              header="Discover Trello Enterprise"
              text="The productivity tool teams love, paired with the features and security needed for scale."
            />
          </Stack>
        </Container>
      </div>
    </>
  )
}

export default Start
