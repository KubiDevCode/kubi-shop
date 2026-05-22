import { act } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { renderHook, type RenderHookResult } from '@testing-library/react'

import { useShopPageParams } from './useShopPageParams'
import { shopFilters, shopPriceFilter } from '@/features/FilterProducts/items/filterItems'

describe('useShopPageParams', () => {
  let hook: RenderHookResult<ReturnType<typeof useShopPageParams>, unknown>

  const wrapper = ({ children }: { children: React.ReactNode }) => {
    return <MemoryRouter>{children}</MemoryRouter>
  }

  beforeEach(() => {
    hook = renderHook(() => useShopPageParams(16), {
      wrapper,
    })
  })

  it('возвращает параметры по умолчанию при пустом query', () => {
    expect(hook.result.current.params).toEqual({
      page: 1,
      tags: [],
      categories: [],
      limit: 16,
      sort: 'default',
      brands: [],
      minprice: 0,
      maxprice: 99999999,
      search: '',
    })
  })

  it('обновляет page при вызове setPage', () => {
    act(() => {
      hook.result.current.setPage(2)
    })

    expect(hook.result.current.params.page).toBe(2)
  })

  it('сбрасывает page в значение по умолчанию при setPage(1)', () => {
    act(() => {
      hook.result.current.setPage(3)
    })
    expect(hook.result.current.params.page).toBe(3)

    act(() => {
      hook.result.current.setPage(1)
    })
    expect(hook.result.current.params.page).toBe(1)
  })

  it('добавляет фильтр в нужную секцию', () => {
    act(() => {
      hook.result.current.toggleFilter(shopFilters[0], shopFilters[0].filters[1])
    })

    expect(hook.result.current.params.categories).toEqual(['earpods'])
  })

  it('добавляет несколько фильтров в одну секцию', () => {
    act(() => {
      hook.result.current.toggleFilter(shopFilters[0], shopFilters[0].filters[1])
    })
    act(() => {
      hook.result.current.toggleFilter(shopFilters[0], shopFilters[0].filters[2])
    })

    expect(hook.result.current.params.categories).toEqual(['earpods', 'joysticks'])
  })

  it('удаляет фильтр при повторном выборе', () => {
    act(() => {
      hook.result.current.toggleFilter(shopFilters[0], shopFilters[0].filters[1])
    })
    act(() => {
      hook.result.current.toggleFilter(shopFilters[0], shopFilters[0].filters[1])
    })

    expect(hook.result.current.params.categories).toEqual([])
  })

  it('очищает секцию при выборе all', () => {
    act(() => {
      hook.result.current.toggleFilter(shopFilters[0], shopFilters[0].filters[1])
    })
    act(() => {
      hook.result.current.toggleFilter(shopFilters[0], shopFilters[0].filters[2])
    })
    expect(hook.result.current.params.categories).toEqual(['earpods', 'joysticks'])

    act(() => {
      hook.result.current.toggleFilter(shopFilters[0], shopFilters[0].filters[0])
    })

    expect(hook.result.current.params.categories).toEqual([])
  })

  it('работает с другой секцией параметров', () => {
    act(() => {
      hook.result.current.toggleFilter(shopFilters[1], shopFilters[1].filters[1])
    })

    expect(hook.result.current.params.brands).toEqual(['apple'])
    expect(hook.result.current.params.categories).toEqual([])
  })

  it('корректно обновляет и сбрасывает сортировку', () => {
    act(() => {
      hook.result.current.toggleSort('asc')
    })
    expect(hook.result.current.params.sort).toBe('asc')

    act(() => {
      hook.result.current.toggleSort('default')
    })
    expect(hook.result.current.params.sort).toBe('default')
  })

  it('обновляет значения минимальной и максимальной цены', () => {
    act(() => {
      hook.result.current.changePrice(shopPriceFilter.filters[0], '100')
    })
    expect(hook.result.current.params.minprice).toBe(100)

    act(() => {
      hook.result.current.changePrice(shopPriceFilter.filters[1], '2500')
    })
    expect(hook.result.current.params.maxprice).toBe(2500)
  })

  it('сбрасывает минимальную и максимальную цену на дефолт при пустом значении', () => {
    act(() => {
      hook.result.current.changePrice(shopPriceFilter.filters[0], '100')
    })
    act(() => {
      hook.result.current.changePrice(shopPriceFilter.filters[1], '2500')
    })
    act(() => {
      hook.result.current.changePrice(shopPriceFilter.filters[0], '')
    })
    act(() => {
      hook.result.current.changePrice(shopPriceFilter.filters[1], '')
    })

    expect(hook.result.current.params.minprice).toBe(0)
    expect(hook.result.current.params.maxprice).toBe(99999999)
  })

  it('обрезает пробелы и очищает search', () => {
    act(() => {
      hook.result.current.setSearch({ search: '  iphone  ' })
    })
    expect(hook.result.current.params.search).toBe('iphone')

    act(() => {
      hook.result.current.setSearch({ search: '   ' })
    })
    expect(hook.result.current.params.search).toBe('')
  })

  it('сбрасывает page после изменения фильтра, сортировки и поиска', () => {
    act(() => {
      hook.result.current.setPage(4)
    })
    expect(hook.result.current.params.page).toBe(4)

    act(() => {
      hook.result.current.toggleFilter(shopFilters[0], shopFilters[0].filters[1])
    })
    expect(hook.result.current.params.page).toBe(1)

    act(() => {
      hook.result.current.setPage(5)
    })
    act(() => {
      hook.result.current.toggleSort('desc')
    })
    expect(hook.result.current.params.page).toBe(1)

    act(() => {
      hook.result.current.setPage(6)
    })
    act(() => {
      hook.result.current.setSearch({ search: 'sony' })
    })
    expect(hook.result.current.params.page).toBe(1)
  })
})
