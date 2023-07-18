export const handlePhoneNumberChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setPhoneNumber: (e: string) => void,
) => {
  const inputPhoneNumber = event.target.value;
  let formattedPhoneNumber = inputPhoneNumber.replace(/\D/g, '');

  if (formattedPhoneNumber.length > 10) {
    formattedPhoneNumber = formattedPhoneNumber.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else if (formattedPhoneNumber.length > 2) {
    formattedPhoneNumber = formattedPhoneNumber.replace(/(\d{2})(\d{0,5})/, '($1) $2');
  }

  setPhoneNumber(formattedPhoneNumber);
  return formattedPhoneNumber;
};
