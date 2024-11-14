import React from 'react';
function Greeting() {
  const name = "Alice";
  return React.createElement(
    'div',
    null,
    React.createElement('h1', null, `Hello, ${name}!`)
  );
}

export default Greeting;
