import { App } from './App'
import './App.css'
import './index.css'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof App> = {
  component: App,
}

export default meta
type Story = StoryObj<typeof App>

export const MainWrapper: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
}
