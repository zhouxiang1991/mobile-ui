import { Bem } from '../Bem'

test('Bem', () => {
  const bem = new Bem('comp-name')

  expect(bem.gen()).toBe('zx-comp-name')
  expect(bem.gen({ modifier: 'abc' })).toBe('zx-comp-name--abc')
  expect(bem.gen({ modifier: 'abc', block: 'ddd' })).toBe('zx-comp-name__ddd--abc')
  expect(bem.gen({ modifier: ['abc', 'def'] })).toBe('zx-comp-name--abc zx-comp-name--def')
  expect(bem.gen({ modifier: ['abc', 'def'], block: 'ddd' })).toBe('zx-comp-name__ddd--abc zx-comp-name__ddd--def')
  expect(bem.gen({ modifier: { ghi: true, opq: false } })).toBe('zx-comp-name--ghi')
  expect(bem.gen({ modifier: { ghi: true, opq: false }, block: 'ddd' })).toBe('zx-comp-name__ddd--ghi')
})
