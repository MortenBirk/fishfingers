import React, { useEffect, useRef } from 'react'
import Prism from "prismjs";
import '../../css/prism.css'

const HighlightedCode = ( { codeString } ) => {

  const codeRef = useRef(codeRef)

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current)
    }
  }, [codeString])
  
  return (
    <pre>
      <code className="language-javascript" ref={codeRef}>
        {codeString}
      </code>
    </pre>
  )

}

export default HighlightedCode