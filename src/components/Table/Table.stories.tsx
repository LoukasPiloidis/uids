import type { Meta, StoryObj } from '@storybook/react-vite'
import { useMemo, useState } from 'react'
import type { Selection, SortDescriptor } from 'react-aria-components'
import { Badge } from '../Badge/Badge'
import { Checkbox } from '../Checkbox/Checkbox'
import { EmptyState } from '../EmptyState/EmptyState'
import { Cell, Column, Row, Table, TableBody, TableHeader } from './Table'

const meta = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    docs: {
      description: {
        component:
          'Rows and columns of data, with keyboard navigation, sorting and optional row selection from React Aria. Mark the naming column `isRowHeader` or screen readers announce every row as anonymous cells. For a list of one thing per row, `ListBox` is lighter.',
      },
    },
  },
  argTypes: {
    density: { control: 'inline-radio', options: ['comfortable', 'compact'] },
  },
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

interface Official {
  id: number
  name: string
  level: string
  games: number
  status: 'active' | 'resting'
}

const officials: Official[] = [
  { id: 1, name: 'Αντωνίου Κ.', level: 'Α1', games: 14, status: 'active' },
  { id: 2, name: 'Βλάχου Μ.', level: 'Α2', games: 9, status: 'active' },
  { id: 3, name: 'Γεωργίου Π.', level: 'Α1', games: 11, status: 'resting' },
  { id: 4, name: 'Δήμου Σ.', level: 'Β', games: 6, status: 'active' },
]

export const Playground: Story = {
  render: (args) => (
    <Table {...args} aria-label="Officials">
      <TableHeader>
        <Column isRowHeader>Name</Column>
        <Column>Level</Column>
        <Column>Games</Column>
        <Column>Status</Column>
      </TableHeader>
      <TableBody items={officials}>
        {(row) => (
          <Row id={row.id}>
            <Cell>{row.name}</Cell>
            <Cell>{row.level}</Cell>
            <Cell>{row.games}</Cell>
            <Cell>
              <Badge tone={row.status === 'active' ? 'accent' : 'neutral'}>{row.status}</Badge>
            </Cell>
          </Row>
        )}
      </TableBody>
    </Table>
  ),
}

export const Sortable: Story = {
  render: () => {
    const [sort, setSort] = useState<SortDescriptor>({ column: 'games', direction: 'descending' })
    const rows = useMemo(() => {
      const sorted = [...officials].sort((a, b) => {
        const key = sort.column as keyof Official
        const result = String(a[key]).localeCompare(String(b[key]), undefined, { numeric: true })
        return sort.direction === 'descending' ? -result : result
      })
      return sorted
    }, [sort])

    return (
      <Table aria-label="Officials by workload" sortDescriptor={sort} onSortChange={setSort}>
        <TableHeader>
          <Column id="name" isRowHeader allowsSorting>
            Name
          </Column>
          <Column id="level" allowsSorting>
            Level
          </Column>
          <Column id="games" allowsSorting>
            Games
          </Column>
        </TableHeader>
        <TableBody items={rows}>
          {(row) => (
            <Row id={row.id}>
              <Cell>{row.name}</Cell>
              <Cell>{row.level}</Cell>
              <Cell>{row.games}</Cell>
            </Row>
          )}
        </TableBody>
      </Table>
    )
  },
}

export const Selectable: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'React Aria does not inject the checkbox column for you — add a `Column` and a `Cell` holding a `Checkbox slot="selection"`, and the header one becomes select-all automatically. Rows are also selectable by click and keyboard without it, if a checkbox would be noise.',
      },
    },
  },
  render: () => {
    const [selected, setSelected] = useState<Selection>(new Set([2]))
    return (
      <Table
        aria-label="Officials"
        selectionMode="multiple"
        selectedKeys={selected}
        onSelectionChange={setSelected}
      >
        <TableHeader>
          <Column>
            <Checkbox slot="selection" aria-label="Select all" />
          </Column>
          <Column isRowHeader>Name</Column>
          <Column>Level</Column>
        </TableHeader>
        <TableBody items={officials}>
          {(row) => (
            <Row id={row.id}>
              <Cell>
                <Checkbox slot="selection" aria-label={`Select ${row.name}`} />
              </Cell>
              <Cell>{row.name}</Cell>
              <Cell>{row.level}</Cell>
            </Row>
          )}
        </TableBody>
      </Table>
    )
  },
}

export const Compact: Story = {
  args: { density: 'compact' },
  render: (args) => (
    <Table {...args} aria-label="Officials">
      <TableHeader>
        <Column isRowHeader>Name</Column>
        <Column>Level</Column>
        <Column>Games</Column>
      </TableHeader>
      <TableBody items={officials}>
        {(row) => (
          <Row id={row.id}>
            <Cell>{row.name}</Cell>
            <Cell>{row.level}</Cell>
            <Cell>{row.games}</Cell>
          </Row>
        )}
      </TableBody>
    </Table>
  ),
}

export const Empty: Story = {
  render: () => (
    <Table aria-label="Officials">
      <TableHeader>
        <Column isRowHeader>Name</Column>
        <Column>Level</Column>
      </TableHeader>
      <TableBody
        emptyState={<EmptyState title="No officials yet" description="Import a roster to begin." />}
      >
        {[]}
      </TableBody>
    </Table>
  ),
}

export const CellState: Story = {
  name: 'Cell state',
  parameters: {
    docs: {
      description: {
        story:
          'Domain state that the design system knows nothing about is set as a `data-*` attribute on the cell and styled by the consumer — the same contract React Aria uses for interaction state.',
      },
    },
  },
  render: () => (
    <>
      <style>{`.demo td[data-invalid] { background: var(--down-weak); color: var(--down); }`}</style>
      <Table aria-label="Assignments" className="demo">
        <TableHeader>
          <Column isRowHeader>Game</Column>
          <Column>Official</Column>
        </TableHeader>
        <TableBody>
          <Row id="1">
            <Cell>ΑΕΚ – ΠΑΟ</Cell>
            <Cell>Αντωνίου Κ.</Cell>
          </Row>
          <Row id="2">
            <Cell>ΠΑΟΚ – ΑΡΗΣ</Cell>
            <Cell data-invalid="true">Γεωργίου Π.</Cell>
          </Row>
        </TableBody>
      </Table>
    </>
  ),
}
