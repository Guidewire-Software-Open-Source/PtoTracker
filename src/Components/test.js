import { Button } from "@mui/material";
import React from "react";

const Test = () => {
  const [map, setMap] = React.useState(new Map());

  //   const setData = (rawData) => {
  //     for (let data of rawData) {
  //       console.log(data);
  //       let newData = {};
  //       if (!map.has(data.user)) {
  //         newData = {
  //           test: 2,
  //         };
  //         setMap((map) => new Map(map.set(data.user, newData)));
  //       } else {
  //         newData = map.get(data.user);
  //         setMap((map) => new Map(map.set(data.user, newData)));
  //       }
  //     }
  //   };

  const setupData = () => {
    if (!map.has("user1"))
      setMap((m) => new Map(m.set("user1", { test: [1, 2, 3, 4] })));
    else {
      let data = map.get("user1");
      data[0]++;
      setMap((m) => new Map(m.set("user1", { test: data })));
    }

    setMap((m) => new Map(m.set("user2", { test: [2, 2, 3, 4] })));
  };

  console.log(map);
  return <Button onClick={() => setupData()}>Click me</Button>;
};

export default Test;
