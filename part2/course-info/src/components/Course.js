const Header = ({courseName}) => <h1>{courseName}</h1>

const Part = ({part, exercises}) => <p>{part} {exercises}</p>
  
const Content = ({parts}) => {
  return (
    <>
    {parts.map((x) => <Part key={x.id} part={x.name} exercises={x.exercises} />)}
    </>
  )
}

const Total = ({parts}) => <b>Number of exercises {parts.reduce((acc, x) => acc + x.exercises, 0)}</b>

const Course = ({course}) => {
  return (
    <>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
}

export default Course;