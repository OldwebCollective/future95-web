function formatDate(isoDate) {
  const date = new Date(isoDate + 'T00:00:00Z');
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}