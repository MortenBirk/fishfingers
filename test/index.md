

@id exported
@title A good example
@desc This is a very good example
```javascript 
import { exported } from './index'
const x = exported(10)
console.log('This is x ' + x)
console.log('This is some json')
console.log({
  x: 6, y : 2
})
```



@id exported
@desc This is very medium

```js
const exported = require('./index').exported
const x = exported(5)
console.log('This is also x ' + x)
```
@id exported
@title A baaad example

```jsx
console.log('I just print something crazy')
```

