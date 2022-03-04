import React, { FC, ReactChild } from 'react';

export interface IAuthorizedProps 
{
    children?:
    | ReactChild
    | ReactChild[];
} 

const AuthorizedView : FC<IAuthorizedProps> = ({ children } : IAuthorizedProps) => {

  return (
    <React.Fragment>
      { children }
    </React.Fragment>
  )
}

 


export default AuthorizedView;
