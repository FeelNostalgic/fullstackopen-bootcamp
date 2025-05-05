type ExercisesType = {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (daily_exercises: number[], target: number): ExercisesType => {
  const periodLength = daily_exercises.length
  const trainingDays = daily_exercises.filter(exercise => exercise > 0).length
  const average = daily_exercises.reduce((a, b) => a + b) / periodLength
  const rating = average < target ? 1 : average < target * 2 ? 2 : 3
  const ratingDescription = rating === 1 ? 'bad' : rating === 2 ? 'not too bad but could be better' : 'good'
  const success = average >= target
  
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));