import { Position } from '@/shared/api'
import { FILE_FOLDER_PADDING, FILE_ICON_SIZE } from '@/shared/config'

const positionLimit = ({
  height,
  width,
}: {
  height: number
  width: number
}): Position => {
  return {
    col: Math.max(
      1,
      Math.floor((width - FILE_FOLDER_PADDING * 2) / FILE_ICON_SIZE)
    ),
    row: Math.max(
      1,
      Math.floor((height - FILE_FOLDER_PADDING * 2) / FILE_ICON_SIZE)
    ),
  }
}

export { positionLimit }
