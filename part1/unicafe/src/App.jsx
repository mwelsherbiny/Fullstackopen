import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>
const StatisticLine = ({text, value}) => {
  return (
    <>
      <td>{text}</td> 
      <td>{value}</td> 
    </>
  )
}
const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  if (all === 0) return <p>No feedback given</p>
  return (
    <>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <tr>
              <StatisticLine text="good" value={good} />
            </tr>
            <tr>
              <StatisticLine text="neutral" value={neutral} />
            </tr>
            <tr>
              <StatisticLine text="bad" value={bad} />
            </tr>
            <tr>
              <StatisticLine text="all" value={all} />
            </tr>
            <tr>
              <StatisticLine text="average" value={(good - bad) / all} />
            </tr>
            <tr>
              <StatisticLine text="positive" value={`${good / all * 100} %`} />
            </tr>
          </tbody>
          
        </table>
    </>
  )
}

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
      
    </>
  )
}
export default App
