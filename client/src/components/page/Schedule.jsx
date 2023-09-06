import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { v4 as uuidv4 } from 'uuid';
import { INITIAL_EVENTS } from '../../tools/event-utils';
import {IconButton} from '@mui/material'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import eventApi from '../../api/eventApi';

function Schedule() {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        const res = await eventApi.getAll();
        console.log(res)
        setCurrentEvents(res);
      } catch (error) {
        console.error('Failed to get events:', error);
      }
    };
      getAllEvents();
}, []);

  const navigate = useNavigate();

  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  };

  const handleDateSelect = async(selectInfo) => {
    let title = prompt('📌Enter your new event.');
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();
    // clear date selection
      let index
    if (title) {
      index= Date.now();
      calendarApi.addEvent({
        id: index,
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
        console.log(selectInfo.startStr)
        console.log(selectInfo.endStr)
    }
    try{
      const res = await eventApi.create({
        id: index,
        title,
        start: new Date(selectInfo.startStr).toISOString().replace(/T.*$/, ''),
        end: new Date(selectInfo.endStr).toISOString().replace(/T.*$/, ''),
        allDay: selectInfo.allDay,
      });
      console.log(res)
    }catch(error){
  
      console.error(error)
    }
   
  };

  const handleEventClick = (clickInfo) => {
    if (confirm(`❓Are you sure to delete the event? '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  };

  const handleEvents = async () => {
    try {
      const res = await eventApi.getAll();
      setCurrentEvents(res);
    } catch (error) {
      console.error('Failed to get events:', error);
    }
  };

  const renderEventContent = (eventInfo) => {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  };

  const renderSidebarEvent = (event) => {
    return (
      <li key={event.id}>
        <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
        <i>{event.title}</i>
      </li>
    );
  };

  const renderSidebar = () => {
    return (
      <div className='demo-app-sidebar'>
        <div style={{ textAlign: 'right',margin:'10px'}}>
          <IconButton onClick={() => navigate(-1)}>
                    <LogoutOutlinedIcon fontSize='small'/>
                  </IconButton>
        </div>
        <div className='demo-app-sidebar-section'>
          <h2>Instructions</h2>
          <ul>
          <li>
            <label>
            <input style={{ margin:'0px'}}
              type='checkbox'
              checked={weekendsVisible}
              onChange={handleWeekendsToggle}
            ></input>
            <span >Toggle weekends</span>
          </label>

            </li>
            <li>📅Select dates</li>
            <li>💬Click a date to create an event</li>
            <li>👆Drag and Drop</li>
            <li>🖱️Click an event to delete it</li>
          </ul>
          
        </div>
        <div className='demo-app-sidebar-section'>
          
        </div>
        <div className='demo-app-sidebar-section'>
          <h2>All Events ({currentEvents.length})</h2>
          <ul>{currentEvents.map(renderSidebarEvent)}</ul>
        </div>
      </div>
    );
  };

  return (
    <div className='demo-app'>
      {renderSidebar()}
      <div className='demo-app-main'>
        <FullCalendar 
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          initialView='dayGridMonth'
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          initialEvents={INITIAL_EVENTS}
      
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventsSet={handleEvents}
        />
      </div>
    </div>
  );
}

export default Schedule;
