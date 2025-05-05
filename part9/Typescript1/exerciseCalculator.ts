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

try{
  console.log(calculateExercises(process.argv.slice(3).map(Number), Number(process.argv[2])));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: '
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}