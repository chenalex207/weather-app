// STEP 1：從 react 中載入 useRef
import React, { useRef } from 'react';

const RefExample = () => {
  // STEP 2：將 renderCount 的預設值設為 0
  const renderCount = useRef(0);

  return (
    <div>
      {/* STEP 3：每次畫面渲染時就將 renderCount.current + 1 */}
      {renderCount.current += 1}

      {/* STEP 4：顯示這是該組件第幾次重新渲染 */}
      {console.log('render', renderCount.current)}
      <h1> Hello, React </h1>
    </div>
  )
}

export default RefExample;