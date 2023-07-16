/* eslint-disable no-unused-vars */
export const handleCEPChange = (event: React.ChangeEvent<HTMLInputElement>, setCEP: (cep: string) => void) => {
  const inputCEP = event.target.value;
  let formattedCEP = inputCEP.replace(/\D/g, '');

  if (formattedCEP.length > 5) {
    formattedCEP = formattedCEP.replace(/(\d{5})(\d{0,3})/, '$1-$2');
  }

  setCEP(formattedCEP);
  return formattedCEP;
};
