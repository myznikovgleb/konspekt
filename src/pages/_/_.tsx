import {
  ArrowRightIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import { Link } from 'react-router'

import { Layout } from '@/shared/ui'

const LINK_EXPLORE = 'https://github.com/myznikovgleb/konspekt'
const PATH_PROCEED = '/folder'

const Page_ = () => {
  return (
    <Layout>
      <section className="gradient-animated h-full w-full px-6 py-24">
        <div className="bg-base-100/50 flex h-full w-full flex-col justify-end rounded-2xl backdrop-blur-md">
          <div className="flex grow flex-col items-center justify-end">
            <div className="flex flex-col items-center gap-4 p-8 md:p-0">
              <p className="text-8xl">📝</p>
              <p className="text-4xl font-semibold">Konspekt App</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-start">
            <div className="flex flex-col gap-4 p-8 md:flex-row md:gap-8 md:p-24">
              <Link
                to={PATH_PROCEED}
                className="btn btn-xl btn-primary gap-4 rounded-4xl px-12 md:px-16"
              >
                <ArrowRightIcon className="size-8" />
                <span>Proceed</span>
              </Link>
              <Link
                to={LINK_EXPLORE}
                className="btn btn-xl btn-neutral btn-outline gap-4 rounded-4xl px-12 md:px-16"
              >
                <MagnifyingGlassIcon className="size-8" />
                <span>Explore</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export { Page_ }
