const COMPONENT_PREFIX = 'zx'
const HYPHEN = '-' /** 连字符。 */
const HYPHEN_BLOCK = '__' /** 块连字符。 */
const HYPHEN_MODIFIER = '--' /** 修饰连字符。 */

type Modifier = Record<string, boolean> | string

export class Bem {
  constructor (public compName: string) {}

  gen ({ modifier, block }: {
    modifier?: Modifier | Modifier[],
    block?: string
  } = {}): string {
    const baseBem = [
      COMPONENT_PREFIX,
      HYPHEN,
      this.compName,
      block && HYPHEN_BLOCK,
      block,
    ].join('')

    if (typeof modifier === 'string') {
      return [baseBem, modifier].join(HYPHEN_MODIFIER)
    } else if (Array.isArray(modifier)) {
      return modifier.map(modifier => this.gen({ modifier, block })).join(' ')
    } else if (typeof modifier === 'object') {
      return Object.keys(modifier).reduce<string>((sum:string, key: string) => {
        if (modifier[key]) {
          sum += `${[baseBem, key].join(HYPHEN_MODIFIER)} `
        }

        return sum
      }, '').trim()
    } else {
      return baseBem
    }
  }
}
