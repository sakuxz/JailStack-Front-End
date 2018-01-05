import { SubmissionError } from 'redux-form';

const sleep = ms => new Promise((resolve) => { setTimeout(resolve, ms); });

export default async (values) => {
  await sleep(500);

  // Submit Validation Example
  if (values.firstName === 'tutu') {
    throw new SubmissionError({
      firstName: 'User does not exist',
      _error: 'Submit failed!',
    });
  }

  alert(`You submitted: \n\n${JSON.stringify(values)}`);
};
