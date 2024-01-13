import Part from '../Part'
import Total from '../Total'

const Content = ({ parts }) => {
  return (
    <>
      {
        parts.map(e => {
          return <Part key={e.id} name={e.name} exercises={e.exercises} />
        })
      }
      <Total parts={parts} />
    </>
  )
}

export default Content