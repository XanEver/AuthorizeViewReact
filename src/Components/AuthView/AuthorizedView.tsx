import { FC, ReactChild,Fragment } from 'react';

export interface IAuthorizedProps 
{
    children?:
    | ReactChild
    | ReactChild[];
} 

const AuthorizedView : FC<IAuthorizedProps> = ({ children } : IAuthorizedProps) => {

  return (
    <Fragment>
      { children }
    </Fragment>
  )
}

 

AuthorizedView.displayName = "AuthorizedView"
export default AuthorizedView;
