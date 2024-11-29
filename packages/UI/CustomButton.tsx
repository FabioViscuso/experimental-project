import React, { ReactNode } from 'react'
import { Button } from '@mui/material'

export const CustomButton = ({ children }: { children: ReactNode }) => {
  return <Button>{children}</Button>
}
