const Header = (props) => {
  return(
    <>
    <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
    <p>{props.part} {props.exercise}</p>
    </>
  )
}

const Content = (props) => {
  const [part1, part2, part3] = [...props.parts]
  return (
    <>
    <Part part = {part1.name} exercise = {part1.exercises} />
    <Part part = {part2.name} exercise = {part2.exercises} />
    <Part part = {part3.name} exercise = {part3.exercises} />
    </>
  )
}

const Total = (props) => {
  return (
    <>
    <p>Number of exercises {props.parts.reduce((acc, x) => acc + x.exercises, 0)}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
}

export default App;
