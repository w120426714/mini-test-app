import type { CatalogFilters, TestDefinition } from '../types/test'

export function filterTests(items: TestDefinition[], filters: CatalogFilters): TestDefinition[] {
  const query = filters.query.trim().toLowerCase()

  return items.filter((test) => {
    const searchableText = [
      test.title,
      test.subtitle,
      ...test.dimensions.map((dimension) => dimension.label)
    ].join(' ').toLowerCase()
    const matchesQuery = query === '' || searchableText.includes(query)
    const matchesCategory = filters.category === 'all' || test.category === filters.category
    const matchesDuration = filters.duration === 'all'
      || (filters.duration === 'quick' && test.estimatedMinutes <= 3)
      || (filters.duration === 'standard' && test.estimatedMinutes > 3)

    return matchesQuery && matchesCategory && matchesDuration
  })
}
