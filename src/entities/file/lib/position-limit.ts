import { Position } from '@/shared/api'
import {
  FILE_FOLDER_PADDING,
  FILE_ICON_SIZE,
  MENUBAR_COMPLETE_HEIGHT,
  MENUBAR_SPLIT_HEIGHT,
  SCREEN_MD,
} from '@/shared/config'

const positionLimit = ({
  height,
  width,
}: {
  height: number
  width: number
}): Position => {
  const MENUBAR_HEIGHT =
    width < SCREEN_MD ? MENUBAR_SPLIT_HEIGHT * 2 : MENUBAR_COMPLETE_HEIGHT

  return {
    col: Math.max(
      1,
      Math.floor((width - FILE_FOLDER_PADDING * 2) / FILE_ICON_SIZE)
    ),
    row: Math.max(
      1,
      Math.floor(
        (height - FILE_FOLDER_PADDING * 2 - MENUBAR_HEIGHT) / FILE_ICON_SIZE
      )
    ),
  }
}

export { positionLimit }
