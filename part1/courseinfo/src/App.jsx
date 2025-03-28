const Header = (props) => {
  const {course} = props
  return (<h1>{course}</h1>)
}

const Content = (props) => {
  return (
    <div>
      <Part parts={props.parts1} exercises={props.exercises1} />
      <Part parts={props.parts2} exercises={props.exercises2} />
      <Part parts={props.parts3} exercises={props.exercises3} />
    </div>
  )
}

const Part = (props) => {
  return (<p>{props.parts} {props.exercises}</p>)
}

const Total = (props) => {
  return (<p>Number of exercises {props.totalExercise}</p>)
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content parts1={part1} exercises1={exercises1} parts2={part2} exercises2={exercises2} parts3={part3} exercises3={exercises3} />
      <Total totalExercise={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App
