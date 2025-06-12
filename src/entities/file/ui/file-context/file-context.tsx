import { DocumentIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid'

interface FileContextProps {
  onOpen?: () => void
  onRemove?: () => void
  onRename?: () => void
}

const FileContext = (props: FileContextProps) => {
  const { onOpen, onRemove, onRename } = props

  return (
    <ul className="menu rounded-box bg-base-100 shadow-base-200 gap-1 shadow-lg">
      {onOpen && (
        <li className="group rounded-none first:rounded-t-lg last:rounded-b-lg">
          <button
            onClick={onOpen}
            className="flex items-center justify-start gap-4 rounded-none text-base group-first:rounded-t-lg group-last:rounded-b-lg"
          >
            <DocumentIcon className="size-6" />
            <p>Open file</p>
          </button>
        </li>
      )}
      {onRename && (
        <li className="group rounded-none first:rounded-t-lg last:rounded-b-lg">
          <button
            onClick={onRename}
            className="flex items-center justify-start gap-4 rounded-none text-base group-first:rounded-t-lg group-last:rounded-b-lg"
          >
            <PencilIcon className="size-6" />
            <p>Rename file</p>
          </button>
        </li>
      )}
      {onRemove && (
        <li className="group rounded-none first:rounded-t-lg last:rounded-b-lg">
          <button
            onClick={onRemove}
            className="flex items-center justify-start gap-4 rounded-none text-base group-first:rounded-t-lg group-last:rounded-b-lg"
          >
            <TrashIcon className="size-6" />
            <p>Delete file</p>
          </button>
        </li>
      )}
    </ul>
  )
}

export { FileContext }
