import { useState } from 'react'

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({text, value}) => <p>{text} {value}</p>

const Statistics = ({good, neutral, bad}) => {
  let all = good + neutral + bad
  let average = (good - bad)/all
  let positive = good/all*100
  if (all > 0) {
    return (
    <>
    <StatisticLine text = "good" value = {good} />
    <StatisticLine text = "neutral" value = {neutral} />  
    <StatisticLine text = "bad" value = {bad} />
    <StatisticLine text = "all" value = {all} />
    <StatisticLine text = "average" value = {average} />
    <StatisticLine text = "average" value = {positive + ' %'} />
    </>
  )
  } else {
    return (
    <p>No feedback given</p>
    )}
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
      <h2>Statistics</h2>
      <Statistics good = {good} neutral={neutral} bad={bad} />
    </div>

  )
}
export default App;
