"use client";
import { useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { DonationCalendar } from "@/lib/data";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const BigCalendar = () => {
    const [view, setView] = useState(Views.WORK_WEEK);

    const handleOnChangeView = (selectedView) => {
        setView(selectedView);
    };

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={DonationCalendar}
                startAccessor="start"
                endAccessor="end"
                views={[Views.WORK_WEEK, Views.DAY]} // Updated views prop to use an array
                view={view}
                style={{ height: 600 }}
                onView={handleOnChangeView}
                min={new Date(2024, 10, 20, 8, 0, 0)}
                max={new Date(2024, 10, 20, 18, 59, 59)}
            />
        </div>
    );
};

export default BigCalendar;
