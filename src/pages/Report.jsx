import { Stack, Typography } from '@mui/material'
import React from 'react'

const Report = () => {
  return (
    <>
      <Stack
        direction={"row"}
        padding={"10px"}
        bgcolor={"#fff"}
        height={"70px"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack>
          <Typography variant="h1" color={"textSecondary"}>
           Reports
          </Typography>
        </Stack>
      </Stack>
    </>
  )
}

export default Report
