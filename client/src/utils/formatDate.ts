export default function formatarData(dataString: string): string {
  const data = new Date(dataString);

  const meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  const dataBrasilia = new Date(data.getTime() - 3 * 60 * 60 * 1000);

  const mes = meses[dataBrasilia.getMonth()];
  const ano = dataBrasilia.getFullYear();
  const horas = dataBrasilia.getHours().toString().padStart(2, '0');
  const minutos = dataBrasilia.getMinutes().toString().padStart(2, '0');

  const formato = `${mes}/${ano} - ${horas}:${minutos}`;

  return formato;
}
