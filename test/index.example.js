import { exported } from './index'

export const exportedExample = () => ({
  example: () => {
    const x = exported(10)
    console.log('This is x', x)
    x
  }
})