import { useState } from "react";
import Select, { SelectedOption } from "./Select";

const options = [
  { label: "Chocolate", value: "chocolate" },
  { label: "Strawberry", value: "strawberry" },
  { label: "Vanilla", value: "vanilla" },
  { label: "Coconut", value: "coconut" },
  { label: "Lemon", value: "lemon" },
  { label: "first", value: 1 },
  { label: "Second", value: 2 },
  { label: "Texas", value: "texas" },
  { label: "Orange", value: "orange" },
  { label: "Watermelon", value: "watermelon" },
  { label: "Croatia", value: "croatia" },
  { label: "Plum", value: "plum" },
  { label: "Mushroom", value: "mushroom" },
  { label: "Raspberry", value: "raspberry" },
  { label: "Third", value: 3 },
  { label: "Four", value: 4 },
];

function App() {
  const [value1, setValue1] = useState<SelectedOption | undefined>(options[0]);
  const [value2, setValue2] = useState<SelectedOption[]>([options[0]]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>SINGLE SELECT</h1>
      <br />
      <Select options={options} value={value1} onChange={(e) => setValue1(e)} />
      <br />
      <h1>MULTI SELECT</h1>
      <Select multiple options={options} value={value2} onChange={(e) => setValue2(e)} />
    </div>
  );
}

export default App;
