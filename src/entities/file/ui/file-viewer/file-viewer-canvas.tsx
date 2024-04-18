import type { File } from '@/shared/api'

type FileViewerCanvasProps = Pick<File, 'content'> & {
  onChange: (args: Pick<File, 'content'>) => void
}

const FileViewerCanvas = (props: FileViewerCanvasProps) => {
  const { content, onChange } = props

  return (
    <textarea
      value={content}
      onChange={(e) => onChange({ content: e.target.value })}
      className="size-full resize-none overflow-hidden rounded-b-lg bg-base-100 p-8 md:text-lg"
    />
  )
}

export { FileViewerCanvas }
