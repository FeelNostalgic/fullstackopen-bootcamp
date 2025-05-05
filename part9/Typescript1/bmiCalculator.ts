type BMI = 'Normal range' | 'Overweight' | 'Underweight'

const calculateBMI = (height: number, weight: number): BMI => {
  const heightInMeters = height / 100
  const bmi = weight / (heightInMeters * heightInMeters)
  if (bmi < 18.5) return 'Underweight'
  if (bmi < 25) return 'Normal range'
  return 'Overweight'
}

console.log(calculateBMI(180, 74))
