import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const navigate = useNavigate()

  return (
    <>
      <main className="flex h-screen w-screen flex-col items-center justify-center">
        <button
          onClick={() => {
            navigate('/main')
          }}
          className="btn btn-primary btn-lg btn-wide"
        >
          Run Konspekt
        </button>
      </main>
    </>
  )
}
