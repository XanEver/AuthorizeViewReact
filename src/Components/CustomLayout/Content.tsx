import React, { PropsWithChildren } from 'react'

function Content({ children } : PropsWithChildren<{}>)   {
  return (
    <main>
      {children}
    </main>
  )
}

export default Content