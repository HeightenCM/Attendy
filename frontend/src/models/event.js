class Event {
  constructor(
    name,
    startTime,
    endTime,
    repeat,
    repeatType,
    repeatCount,
    groupIndex
  ) {
    this.name = name;
    this.startTime = startTime;
    this.endTime = endTime;
    this.repeat = repeat;
    this.repeatType = repeatType;
    this.repeatCount = repeatCount;
    this.groupIndex = groupIndex;
  }
}

export default Event;
