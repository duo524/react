import { Dayjs } from "dayjs";
import { CalendarProps } from ".";

interface MonthCalendarProps extends CalendarProps {

}

function getAllDays(date: Dayjs) {
    const daysInMonth = date.daysInMonth();
    const startDate = date.startOf('month');
    const day = startDate.day()   
    console.log( startDate.subtract(day, 'day').format('YYYY-MM-DD')) 

}
function MonthCalendar(props:MonthCalendarProps) {

    const weekList = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const allDays = getAllDays(props.value);
    return <div className="calendar-month">
        <div className="calendar-month-week-list">
            {weekList.map((week) => (
                <div className="calendar-month-week-list-item" key={week}>
                    {week}
                </div>
            ))}
        </div>
    </div>
}

export default MonthCalendar;
