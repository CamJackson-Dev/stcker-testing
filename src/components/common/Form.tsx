import React from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {}

const Form: React.FC<Props> = (props) => {
  return <form style={{ width: "100%" }} {...props} />;
};

export default Form;
