/**
 * Hello there
 */
 const myFunc = (a) => {
   /**
    * Hi I am another 
    * function
    * 
    * It is very nice to be that
    * 
    * @param {number} b 
    * @param OK
    * @param {number} lol This is lol
    * @returns {func} Awesome
    */
   function otherFunc(b) {
    return b + 5
   }
   return otherFunc(a)
 }

 /**
  * This is an object
  */
 const someObject = {
   a: 5
 }

  /**
  * This is a number
  */
 const someNumber = 5

 /**
  * Old school func
  */
 const x = function() {
   return 'Hello'
 }

 /**
  * An awesome class
  */
 class MyClass {
   /**
    * Constructor
    */
   constructor() {

   }

    /**
    * Method
    */
   myClassMethod() {
    return 5
   }
 }


/**
* Hi I am exported
* 
* I am a named exported constant
* @param {number} lol This is lol
* @returns {string} Awesome
*/
export const exported = (lol) => {
  return 'The number is ' + lol
}


/**
* Hi I am exported
* 
* I an exported function
* @param {string} lolz This is lol
* @returns {string} Awesome
*/
export function exportedFunc(lolz) {
  return 'The number is ' + lolz
}


/**
 * This is default exported
 */
export default function ok() {
  return 'ok'
}