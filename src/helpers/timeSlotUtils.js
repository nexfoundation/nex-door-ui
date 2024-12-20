// Utility function to convert time (HH:MM) to minutes
function timeToMinutes(timeStr) {
  const [hour, minute] = timeStr.split(":").map((num) => parseInt(num));
  return hour * 60 + minute;
}

// Utility function to format time (ensure two digits for hour and minute)
function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

// Function to generate time slots based on start time, end time, and duration
export function generateTimeSlots(startTime, endTime, durationInMinutes) {
  const timeSlots = [];

  // Convert start and end times to minutes
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);

  // Ensure the end time is after the start time
  if (endMinutes <= startMinutes) {
    throw new Error("End time must be after the start time.");
  }

  // Generate slots
  let currentSlotStart = startMinutes;

  while (currentSlotStart + durationInMinutes <= endMinutes) {
    const startHour = Math.floor(currentSlotStart / 60);
    const startMin = currentSlotStart % 60;
    const endHour = Math.floor((currentSlotStart + durationInMinutes) / 60);
    const endMin = (currentSlotStart + durationInMinutes) % 60;

    const startTimeStr = `${formatTime(startHour)}:${formatTime(startMin)}`;
    const endTimeStr = `${formatTime(endHour)}:${formatTime(endMin)}`;

    timeSlots.push(`${startTimeStr} - ${endTimeStr}`);

    // Move to the next slot
    currentSlotStart += durationInMinutes;
  }

  return timeSlots;
}
