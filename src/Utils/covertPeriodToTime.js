export const covertPeriodToTime = (period) => {

    var subjectInfo = {
        startTime: "00:00",
        endTime: "00:00",
        isReady: false,
        willStartSoon: false,
        willStartIn: 0
    }


    switch (period) {
        case 1:
            subjectInfo.startTime = "07:15";
            subjectInfo.endTime = "08:00";
            break;
        case 2:
            subjectInfo.startTime = "08:15";
            subjectInfo.endTime = "09:00";
            break;
        case 3:
            subjectInfo.startTime = "09:30";
            subjectInfo.endTime = "10:15";
            break;
        case 4:
            subjectInfo.startTime = "10:15";
            subjectInfo.endTime = "11:00";
            break;
        case 5:
            subjectInfo.startTime = "11:00";
            subjectInfo.endTime = "11:45";
            break;
        case 6:
            subjectInfo.startTime = "13:30";
            subjectInfo.endTime = "14:15";
            break;
        case 7:
            subjectInfo.startTime = "14:30";
            subjectInfo.endTime = "15:15";
            break;
        case 8:
            subjectInfo.startTime = "15:30";
            subjectInfo.endTime = "16:15";
            break;
        case 9:
            subjectInfo.startTime = "16:30";
            subjectInfo.endTime = "17:15";
            break;
        case 10:
            subjectInfo.startTime = "17:30";
            subjectInfo.endTime = "18:15";
            break;
        default:
            break;
    }

    const subjectTimeInfo = getSubjectTimeInfo(subjectInfo.startTime, subjectInfo.endTime);
    subjectInfo.isReady = subjectTimeInfo._isReady;
    subjectInfo.willStartIn = subjectTimeInfo._willStartIn;
    subjectInfo.willStartSoon = subjectTimeInfo._willStartSoon;

    return subjectInfo;
}

const getSubjectTimeInfo = (startTime, endTime) => {
    const startTimeSplit = startTime.split(":");
    const endTimeSplit = endTime.split(":");

    const hStart = +startTimeSplit[0];
    const mStart = +startTimeSplit[1];
    const totalStart = hStart * 60 + mStart;

    const hEnd = +endTimeSplit[0];
    const mEnd = +endTimeSplit[1];
    const totalEnd = hEnd * 60 + mEnd;

    var today = new Date();
    const hCurrent = today.getHours();
    const mCurrent = today.getMinutes();
    const totalCurrent = hCurrent * 60 + mCurrent;

    const _isReady = totalCurrent >= totalStart && totalCurrent <= totalEnd ? true : false;
    var _willStartIn = totalStart - totalCurrent;
    const _willStartSoon = _willStartIn > 0 && _willStartIn < 60 ? true : false;

    return {
        _isReady,
        _willStartIn,
        _willStartSoon
    }

}