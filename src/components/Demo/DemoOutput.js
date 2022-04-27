import React from 'react';

const DemoOutput = (props) => {
  console.log('DemoOutput RUNNING');
  return <p>{props.show ? 'This is new!' : ''}</p>;
};

// React memo allows us to optimize functional components
// It tells react that for this component react should look what component get as a props and compare
// it with the previous props value. And if not - this component will not reevaluate

// Memo comes at a cost - store prev values and needs this comparison, so you should decide if it worth it
export default React.memo(DemoOutput);
