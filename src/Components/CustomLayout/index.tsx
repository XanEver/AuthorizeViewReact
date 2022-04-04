import React, { CSSProperties, VFC } from 'react'
import { useState } from 'react'
import { IRoutesProp } from '../../Routing'
import Content from './Content'
import Header from './Header'
import LeftSide from './LeftSide'



type LayoutType = {
  routs:Array<IRoutesProp>
}

const Layout:VFC<LayoutType>  = ({ routs }) => {
  const [collabsed,setCollabsed] = useState<boolean>(false);

  const styles:CSSProperties = {
    display: "grid",
    gridTemplateColumns:`${collabsed ? 70 : 200}px 1fr`,
    gridTemplateRows:"48px 1fr",
    height: "100%",
    transition:"all .2s"
  }

  return (
    <section style={styles} >
        <LeftSide collabsed={collabsed} onCollabsed={(e) => setCollabsed(e) } style={{ transition:"all .2s",borderRight:"1px dotted",borderLeft:"1px dotted" }}/>
        <Header/>
        <Content>
          Какой-то контент
        </Content>
    </section>
  )
}

export { Layout }