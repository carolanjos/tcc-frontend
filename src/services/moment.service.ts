import momentTz from 'moment-timezone';

const moment = (date?: string, format?: string) => {
  momentTz.locale('pt-br');
  const d = new Date(date!);
  return momentTz(d, format).tz('America/Sao_Paulo');
};

export default moment;
