import React from "react";

const Intro: React.FC<{}> = () => {
  return (
    <>
      <h3>
        You can add things to inventory and move them. Write on the console: "addInventory('0-0', 1, 1) for
        adding"
      </h3>
      <h3>first argument is position: 'indexI-indexJ', second is X-size, third is Y-size</h3>
    </>
  );
};

export default Intro;
