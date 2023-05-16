import React from 'react';

export function useForm(inputValues) {
  const [values, setValues] = React.useState(inputValues);
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(true);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
    const input = event.target;
    setErrors({ ...errors, [name]: input.validationMessage });
    setIsValid(input.closest('form').checkValidity());

  };
  return { values, handleChange, setValues, isValid, setIsValid, errors, setErrors };
}