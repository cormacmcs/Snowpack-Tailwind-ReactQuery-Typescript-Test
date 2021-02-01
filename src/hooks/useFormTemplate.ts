import React from "react";

export function useFormValidation(
  initialState,
  validate,
  ...validationProps: any[]
): FormValidation {
  const [values, setValues] = React.useState(initialState);
  const [errors, setErrors] = React.useState([]);
  const [isSubmitting, setSubmitting] = React.useState(false);

  React.useEffect((): void => {
    if (isSubmitting) {
      const noErrors = errors.length === 0;
      if (noErrors) {
        setSubmitting(false);
      } else {
        setSubmitting(false);
      }
    }
  }, [errors, values, isSubmitting]);

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    if (event.target.firstChild) {
      setValues({
        ...values,
        [getName(event.target.id)]: event.target.innerText
      });
    } else {
      setValues({
        ...values,
        [event.target.id]: event.target.value
      });
    }
  }

  function getName(name: string): string {
    const nameArr = name.split("-");
    return nameArr[0];
  }

  function handleBlur(): void {}

  function handleSubmit(event: React.FormEvent<HTMLInputElement>): boolean {
    event.preventDefault();
    const validationErrors = validate(values, validationProps);
    setErrors(validationErrors);
    setSubmitting(true);
    const noErrors = validationErrors.length === 0;
    if (noErrors) {
      setValues(initialState);
    }
    return noErrors;
  }

  return {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    isSubmitting
  };
}

export interface FormValidation {
  handleSubmit: any;
  handleChange: any;
  handleBlur: any;
  values: any;
  errors: string[];
  isSubmitting: boolean;
}
