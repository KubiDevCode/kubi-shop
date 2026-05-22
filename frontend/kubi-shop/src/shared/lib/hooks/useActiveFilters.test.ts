import { act } from 'react'
import { useActiveFilters } from './useActiveFilters'
import { renderHook, type RenderHookResult } from '@testing-library/react'

describe('useActiveFilters', () => {
  let hook: RenderHookResult<ReturnType<typeof useActiveFilters>, unknown>

  beforeEach(() => {
    hook = renderHook(() => useActiveFilters())
  })

  it('при инициализации должен содержать фильтр "all"', () => {
    expect(hook.result.current.activeFilters).toContain('all')
  })

  it('при выборе фильтра должен добавлять его в список активных и убирать "all"', () => {
    act(() => {
      hook.result.current.toggleFilter('filter1')
    })
    expect(hook.result.current.activeFilters).toEqual(['filter1'])
  })

  it('при повторном выборе фильтра должен удалять его из списка активных', () => {
    act(() => {
      hook.result.current.toggleFilter('filter1')
      hook.result.current.toggleFilter('filter1')
    })
    expect(hook.result.current.activeFilters).toEqual(['all'])

    act(() => {
      hook.result.current.toggleFilter('filter1')
      hook.result.current.toggleFilter('filter1')
      hook.result.current.toggleFilter('filter2')
      hook.result.current.toggleFilter('filter3')
    })
    expect(hook.result.current.activeFilters).toEqual(['filter2', 'filter3'])
  })

  it('при выборе несеольких фильтров должен добавлять их в список активных', () => {
    act(() => {
      hook.result.current.toggleFilter('filter1')
      hook.result.current.toggleFilter('filter2')
    })
    expect(hook.result.current.activeFilters).toEqual(['filter1', 'filter2'])
  })

  it('при выборе "all" должен сбрасывать все фильтры и оставлять только "all"', () => {
    act(() => {
      hook.result.current.toggleFilter('filter1')
      hook.result.current.toggleFilter('all')
    })
    expect(hook.result.current.activeFilters).toEqual(['all'])
  })

  it('isActive должен возвращать true для активного фильтра и false для неактивного', () => {
    act(() => {
      hook.result.current.toggleFilter('filter1')
      hook.result.current.toggleFilter('filter2')
    })
    expect(hook.result.current.isActive('filter1')).toBe(true)
    expect(hook.result.current.isActive('filter2')).toBe(true)
    expect(hook.result.current.isActive('all')).toBe(false)
  })
})
