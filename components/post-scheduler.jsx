"use client";

import { useState } from 'react';
import { Calendar, Clock, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';



const timeSlots = [
  '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
  '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'
];

const optimalTimes = [
  { time: '9:00 AM', reason: 'High engagement for business content', platforms: ['LinkedIn', 'Facebook'] },
  { time: '1:00 PM', reason: 'Lunch break browsing peak', platforms: ['Instagram', 'Twitter'] },
  { time: '7:00 PM', reason: 'Evening social media activity', platforms: ['Instagram', 'Facebook'] },
];

export function PostScheduler({ onScheduleSet, onBack }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [showOptimalTimes, setShowOptimalTimes] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleDateSelect = (day) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(date);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleOptimalTimeSelect = (time) => {
    setSelectedTime(time);
    setShowOptimalTimes(false);
  };

  const handleScheduleConfirm = () => {
    if (selectedDate && selectedTime) {
      const [time, period] = selectedTime.split(' ');
      const [hours, minutes] = time.split(':').map(Number);
      const adjustedHours = period === 'PM' && hours !== 12 ? hours + 12 : hours === 12 && period === 'AM' ? 0 : hours;
      
      const scheduledDateTime = new Date(selectedDate);
      scheduledDateTime.setHours(adjustedHours, minutes, 0, 0);
      
      onScheduleSet(scheduledDateTime);
    }
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);
  const today = new Date();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Schedule Your Post</h2>
        <p className="text-gray-600">Choose the perfect date and time for maximum engagement</p>
      </div>

      {/* AI Optimal Times */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-purple-900">AI Recommended Times</h3>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowOptimalTimes(!showOptimalTimes)}
            className="border-purple-300 text-purple-700 hover:bg-purple-100"
          >
            {showOptimalTimes ? 'Hide' : 'Show'} Suggestions
          </Button>
        </div>
        
        {showOptimalTimes && (
          <div className="space-y-2">
            {optimalTimes.map((optimal, index) => (
              <button
                key={index}
                onClick={() => handleOptimalTimeSelect(optimal.time)}
                className="w-full text-left p-3 bg-white rounded-lg border border-purple-200 hover:bg-purple-50 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-purple-900">{optimal.time}</span>
                  <div className="flex gap-1">
                    {optimal.platforms.map(platform => (
                      <span key={platform} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-md">
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-purple-700">{optimal.reason}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Calendar */}
      <div className="bg-gray-50 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Select Date
          </h3>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium text-gray-700 min-w-[120px] text-center">
              {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
            <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-2 text-center text-xs font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {emptyDays.map(day => (
            <div key={`empty-${day}`} className="h-10"></div>
          ))}
          
          {days.map(day => {
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
            const isToday = date.toDateString() === today.toDateString();
            const isPast = date < today && !isToday;
            const isSelected = selectedDate?.getDate() === day && 
                             selectedDate?.getMonth() === currentMonth.getMonth() &&
                             selectedDate?.getFullYear() === currentMonth.getFullYear();
            
            return (
              <button
                key={day}
                onClick={() => !isPast && handleDateSelect(day)}
                disabled={isPast}
                className={`h-10 rounded-lg text-sm font-medium transition-colors ${
                  isPast
                    ? 'text-gray-300 cursor-not-allowed'
                    : isSelected
                    ? 'bg-blue-600 text-white'
                    : isToday
                    ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <div className="bg-gray-50 rounded-xl p-4">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Select Time
          </h3>
          
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
            {timeSlots.map(time => (
              <button
                key={time}
                onClick={() => handleTimeSelect(time)}
                className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                  selectedTime === time
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          onClick={handleScheduleConfirm}
          disabled={!selectedDate || !selectedTime}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white disabled:opacity-50"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}