type BMI = 'Normal range' | 'Overweight' | 'Underweight'

const calculateBMI = (height: number, weight: number): BMI => {
  const heightInMeters = height / 100
  const bmi = weight / (heightInMeters * heightInMeters)
  if (bmi < 18.5) return 'Underweight'
  if (bmi < 25) return 'Normal range'
  return 'Overweight'
}

try{
  console.log(calculateBMI(Number(process.argv[2]), Number(process.argv[3])))
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: '
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}