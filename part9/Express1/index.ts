import express from 'express';
import bmiCalculator from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello World!!!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if(isNaN(height) || isNaN(weight)){
    res.status(400).send({error: 'malformed parameters'});
    return;
  }

  const bmi = bmiCalculator(height, weight);

  let json = {
    weight: weight,
    height: height,
    bmi: bmi
  }

  res.send(json);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});