import { ChangeEvent } from "react"
import Calendar from "./components/Calendar";
import dayjs from "dayjs";
import TestSwr from "./components/TestSwr";

function App() {

  return <>
  <Calendar value={dayjs('2023-07-13')}></Calendar>
  <TestSwr></TestSwr>
  </>
}

export default App
