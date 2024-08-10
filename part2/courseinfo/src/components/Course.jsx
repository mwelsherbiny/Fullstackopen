const Course = ({course}) => {
    const sum = course.parts.reduce(
        (sum, part) => sum + part.exercises,
        0
    )
    return (
        <>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total sum={sum} />
        </>
    )
}

const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => 
<p>
    {part.name} {part.exercises}
</p>

const Content = ({ parts }) => 
<>
    {parts.map(part => <Part key={part.id} part={part} />)}
</>

export default Course