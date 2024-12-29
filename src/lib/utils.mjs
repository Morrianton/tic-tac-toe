export function containsSameThree(comparator, compared) {
  const idealLength = 3;

  if (comparator.length < idealLength) return false;

  const _comparator = new Set(comparator);

  for (let i = 0; i < compared.length; i++) {
    if (_comparator.intersection(new Set(compared[i])).size === idealLength) {
      return true;
    };
  }

  return false;
}
