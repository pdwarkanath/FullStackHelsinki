import { useState } from 'react'

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const Display = ({text, value}) => <p>{text} {value}</p>

const Statistics = ({good, neutral, bad}) => {
  let all = good + neutral + bad
  let average = (good - bad)/all
  let positive = good/all*100
  return (
  <>
  <h2>Statistics</h2>
  <Display text = "good" value = {good} />
  <Display text = "neutral" value = {neutral} />
  <Display text = "bad" value = {bad} />
  <Display text = "all" value = {all} />
  <Display text = "average" value = {average} />
  <Display text = "average" value = {positive + ' %'} />
  </>
)
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  
  return (
    <div>
      <h1>Unicafe</h1>
      <h2>Give Feedback</h2>
      <Button text = "good" onClick = {() => setGood(good+1)} />
      <Button text = "neutral" onClick = {() => setNeutral(neutral+1)} />
      <Button text = "bad" onClick = {() => setBad(bad+1)} />
      
      <Statistics good = {good} neutral={neutral} bad={bad} />
    </div>

  )
}
export default App;
