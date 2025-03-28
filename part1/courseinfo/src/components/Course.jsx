import { Header2 } from './Headers'

const Course = ({ course }) => {
    return (
        <div>
            <Header2 text={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part => <Part key={part.name} name={part.name} exercises={part.exercises} />)}
        </div>
    )
}

const Part = ({ name, exercises }) => {
    return (<p>{name} {exercises}</p>)
}

const Total = (props) => {
    return (<p><b>total of {props.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</b></p>)
}

export default Course