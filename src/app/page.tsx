import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const navigate = useNavigate()

  return (
    <>
      <main className='w-screen h-screen flex flex-col items-center justify-center'>
        <button
          onClick={() => {
            navigate('/')
          }}
          className='btn btn-lg btn-wide uppercase'
        >
          Run Konspekt
        </button>
      </main>
    </>
  )
}
