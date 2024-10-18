import { Root } from './Root'
import '../App/App.css'
import '../App/index.css'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Root> = {
  component: Root,
}

export default meta
type Story = StoryObj<typeof Root>

export const MainWrapper: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
}
