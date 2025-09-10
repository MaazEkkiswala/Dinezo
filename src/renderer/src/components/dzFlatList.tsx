import { isEmpty, map } from 'lodash'
import { Card, CardContent } from './ui/card'
import { IconClipboardText } from '@tabler/icons-react'
import { Label } from './ui/label'

interface IDzFlatList {
  data: any[]
  renderItem: (item: any, index: number) => React.ReactNode
  emptyDescription: string
  columns?: number // default = 1
  gap?: number // optional spacing
}

export default function DzFlatList({
  data,
  emptyDescription,
  renderItem,
  columns = 1,
  gap = 6
}: IDzFlatList) {
  if (isEmpty(data)) {
    return (
      <Card className="p-0">
        <CardContent className="px-2 py-2 flex flex-row items-center space-x-2">
          <IconClipboardText className="w-5 h-5 text-gray-600" />
          <Label className="text-gray-700 text-sm font-robot">{emptyDescription}</Label>
        </CardContent>
      </Card>
    )
  }

  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-${columns} lg:grid-cols-${columns} gap-${gap}`}
    >
      {map(data, (item: any, index: number) => renderItem(item, index))}
    </div>
  )
}
