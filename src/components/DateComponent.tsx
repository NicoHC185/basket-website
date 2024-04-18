
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { Moment } from "moment";
import { DateValidationError, PickerChangeHandlerContext } from "@mui/x-date-pickers/models";

const DateComponent = ({
  value,
  handleChange
}: {
  value: Moment | null,
  handleChange: (value: Moment | null, context?: PickerChangeHandlerContext<DateValidationError>) => void
}) => {

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
