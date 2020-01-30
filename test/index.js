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
   /** 
    * @type {number}
    * This is the property a 
    * */
   a: 5,
   b: 'Ok',
   /** This is the property d */
   d: () => 'lol'
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
 export class MyClass {
   /**
    * Constructor
    */
   constructor() {

   }

    /**
    * A class prop method
    * @returns {null}
    */    
   classPropMethod = () => {console.log(ok)}

    /**
    * A class prop other
    * @type {string}
    */    
   classPropOther = 'HELLO'

    /**
      * This is a class prop object
      * @type {object}
      */
    someClassPropObject = {
      a: 10,
      d: () => 'lol'
    }

    /**
    * A very good class method
    * @param {string} [ok] a very ok string
    * @returns {number}
    */
   myClassMethod(ok) {
    return 5
   }

    /**
    * A very good class method
    * @param {string} [lolz = 5] a very lolz kind of string
    * @param {string} [ok] a very ok string
    * @returns {function}
    */
   mySecondClassMethod(lolz, ok) {
    return () => 11
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