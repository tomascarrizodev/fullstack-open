const Total = ({ parts }) => {
    const total = parts.reduce((acc, act) => acc + act.exercises,
    0,  // initial value as a reference
  )
  return (
    <>
      <p><b>total of {total} exercises</b></p>
    </>
  )
}

export default Total