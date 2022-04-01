import { Button, Result } from "antd";
import { VFC } from "react";
import { Link } from "react-router-dom";


const PageNotFound: VFC = () => {
  return(
    <Result
    status="404"
    title="404"
    subTitle="Извините, но страница по даному адресу не найдена."
    extra={<Button type="primary"><Link to={"/"}>Вернуться на главную</Link></Button>}
  />
  )
}

export default PageNotFound;