
function timeBuild(timestamp, keyname){
  let time_ = timestamp
  let d_=parseInt(time_/(24*60*60*1000));
  time_=time_%(24*60*60*1000);
  let h_=parseInt(time_/(60*60*1000));
  time_=time_%(60*60*1000);
  let m_=parseInt(time_/(60*1000));
  time_=time_%(60*1000);
  let s_=parseInt(time_/1000);

  let obj = {}
  obj[keyname+'Day'] = strFormart(d_)
  obj[keyname+'Hour'] = strFormart(h_)
  obj[keyname+'Minute'] = strFormart(m_)
  obj[keyname+'Secound'] = strFormart(s_)

  return obj
}

function strFormart(num){
  return num<10?'0'+num:num
}


export default function count_down (futureDate, nowDate) {
  let run = true
  let nowTime = parseInt(nowDate) < Math.pow(10, 12) ? parseInt(nowDate)*1000 : parseInt(nowDate)
  let futureTime = parseInt(futureDate) < Math.pow(10, 12) ? parseInt(futureDate)*1000 : parseInt(futureDate)

  let prevTime_ = timeBuild(futureTime - nowTime, 'prev')
  let currentTime_ = timeBuild(futureTime - nowTime - 1000, 'current')
  if(futureTime <= nowTime) {
    run = false
  }

  let time = {
    currentDay: '00',
    currentHour: '00',
    currentMinute: '00',
    currentSecound: '00',
    prevDay: '00',
    prevHour: '00',
    prevMinute: '00',
    prevSecound: '00', 
    run
  };

  if(run) {
    time = {...prevTime_, ...currentTime_, run, current: nowTime + 1000}
  } 

  return time
}

