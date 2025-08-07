import { useState } from 'react'
import QuizSlide from './components/QuizSlide'
import SignalBox from './components/SignalBox'

function App() {
  const [finished, setFinished] = useState(false)
  return (
    <div className="App space-y-8">
      {!finished ? (
        <QuizSlide onFinish={() => setFinished(true)} />
      ) : (
        <SignalBox />
      )}
    </div>
  )
}

export default App
