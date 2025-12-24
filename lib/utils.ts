export function formatDateShort(dateString: string) {
  const date = new Date(dateString);
  return {
    date: date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }),
    time: date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
  };
}

export function formatDateLong(dateString: string) {
  const date = new Date(dateString);
  return {
    date: date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
    time: date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
  };
}

export function pluralize(count: number, singular: string, plural?: string) {
  return count === 1 ? singular : (plural || `${singular}s`);
}

