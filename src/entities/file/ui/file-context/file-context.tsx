import { DocumentIcon, TrashIcon } from '@heroicons/react/24/solid'

interface FileContextProps {
  onOpen?: () => void
  onRemove?: () => void
}

const FileContext = (props: FileContextProps) => {
  const { onOpen, onRemove } = props

  return (
    <ul className="menu gap-1 rounded-box bg-base-100 shadow-lg shadow-base-200">
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
