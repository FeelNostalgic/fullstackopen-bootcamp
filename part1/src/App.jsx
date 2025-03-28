{props.parts.map(part => 
  <Part 
    key={part.name} 
    name={part.name} 
    exercises={part.exercises}
  />
)} 