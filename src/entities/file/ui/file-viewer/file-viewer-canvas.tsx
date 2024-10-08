import type { File } from '@/shared/api'

type FileViewerCanvasProps = Pick<File, 'content'> & {
  onChangeContent: (nextFilename: File['filename']) => void
}

const FileViewerCanvas = (props: FileViewerCanvasProps) => {
  const { content, onChangeContent } = props

  return (
    <textarea
      value={content}
      onChange={(e) => onChangeContent(e.target.value)}
      className="h-[35vh] w-full resize-none overflow-hidden rounded-b-lg bg-base-100 p-8 md:h-[80vh] md:text-lg"
    />
  )
}

export { FileViewerCanvas }
