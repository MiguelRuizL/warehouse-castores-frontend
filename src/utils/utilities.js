export function formatDateTime(isoString) {
  const date = new Date(isoString);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  };
  return date.toLocaleString('es-MX', options);
}

export function formatOnlyDate(isoString) {
  const date = new Date(isoString);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return date.toLocaleString('es-MX', options);
}

export function formatOnlyHour(isoString) {
  const date = new Date(isoString);
  const options = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  };
  return date.toLocaleString('es-MX', options);
}