import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>
const Display = ({value}) => <p>{value}</p>

const App = () => {
  const [value, setValue] = useState(10)
  const setToValue = (value) => {
    setValue(value)
  }

  return (
    <div>
      <Display value={value} />
      <Button onClick={() => setToValue(0)} text="reset to zero" />
      <Button onClick={() => setToValue(1000)} text="reset to 1000" />
      <Button onClick={() => setToValue(value + 1)} text="increment" />
      <Button onClick={() => setToValue(value - 1)} text="decrement" />
    </div>
  )
}

export default App