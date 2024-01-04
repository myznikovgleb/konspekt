import { useNavigate } from 'react-router-dom'

import { Layout } from '@/shared/ui'

export const Welcome = () => {
  const navigate = useNavigate()

  return (
    <Layout>
      <button
        onClick={() => {
          navigate('/main')
        }}
        className="btn btn-primary btn-lg btn-wide"
      >
        Run Konspekt
      </button>
    </Layout>
  )
}
