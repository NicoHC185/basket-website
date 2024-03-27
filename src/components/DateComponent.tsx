import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment, { Moment } from "moment";
import { FormEvent, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
const DateComponent = ({
  value,
  handleChange
}: {
  value: Moment | null,
  handleChange: any
}) => {
  // const [value, setValue] = useState<Moment | null>(moment());
  // Inicializamos `count` con el valor 0.
  // const [count, setCount] = useState<number>(0);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        label="Fecha"
        value={value}
        onChange={handleChange}
      />
    </LocalizationProvider>
  );
};

DateComponent.propTypes = {};

export default DateComponent;
