<template>
  <div
    class="count-down-time"
    :class="{'count-down-time-inline': inline}"
    :style="{ top: top + 'px', left: left + 'px' }"
  >
    <div class="time" ref="htap" :class="{running: viewArr.dayRunning}">
      <span class="digital front" :data-number="countDown.prevDay"></span>
      <span class="digital back" :data-number="countDown.currentDay"></span>
    </div>
    <div class="colon" :style="{color: color}">{{$t("common.countDown.day")}}</div>

    <div class="time" ref="htap" :class="{running: viewArr.hourRunning}">
      <span class="digital front" :data-number="countDown.prevHour"></span>
      <span class="digital back" :data-number="countDown.currentHour"></span>
    </div>
    <div class="colon" :style="{color: color}">{{$t("common.countDown.hour")}}</div>

    <div class="time" :class="{running: viewArr.minRunning}">
      <span class="digital front" :data-number="countDown.prevMinute"></span>
      <span class="digital back" :data-number="countDown.currentMinute"></span>
    </div>
    <div class="colon"  :style="{color: color}">{{$t("common.countDown.min")}}</div>

    <div class="time" :class="{running: viewArr.secRuning}">
      <span class="digital front" :data-number="countDown.prevSecound"></span>
      <span class="digital back" :data-number="countDown.currentSecound"></span>
    </div>
    <div class="colon"  :style="{color: color}">{{$t("common.countDown.sec")}}</div>

  </div>
</template>

<script>
import countDown from "@/utils/countDown";
export default {
  data() {
    return {
      timer: null,
      countDown: {
        prevDay: '00',
        prevHour: '00',
        prevMinute: '00',
        prevSecound: '00',
        currentDay: '00',
        currentHour: '00',
        currentMinute: '00',
        currentSecound: '00',
      },
      viewArr: {
        dayRunning: false,
        hourRunning: false,
        minRunning: false,
        secRuning: false
      },
    };
  },
  watch: {
    'countDown.currentDay'(n) {
      this.viewArr.dayRunning = true
      let t = setTimeout(() => {
        this.countDown.prevDay = this.countDown.currentDay
        this.viewArr.dayRunning = false
        clearTimeout(t)
      }, 450)
    },
    'countDown.currentHour'(n) {
      this.viewArr.hourRunning = true
      let t = setTimeout(() => {
        this.countDown.prevHour = this.countDown.currentHour
        this.viewArr.hourRunning = false
        clearTimeout(t)
      }, 450)
    },
    'countDown.currentMinute'(n) {
      this.viewArr.minRunning = true
      let t = setTimeout(() => {
        this.countDown.prevMinute = this.countDown.currentMinute
        this.viewArr.minRunning = false
        clearTimeout(t)
      }, 450)
    },
    'countDown.currentSecound'(n) {
      this.viewArr.secRuning = true
      let t = setTimeout(() => {
        this.countDown.prevSecound = this.countDown.currentSecound
        this.viewArr.secRuning = false
        clearTimeout(t)
      }, 450)
    },
  },
  props: {
    date: {
      type: Number,
      default: (new Date().getTime()+10)/1000
    },
    top: {
      type: Number,
      default: 0
    },
    left: {
      type: Number,
      default: 0
    },
    bgColor: {
      type: String,
      default: "#fff"
    },
    color: {
      type: String,
      default: "rgba(255,255,255,0.7)"
    },
    inline: {
      type: Boolean,
      default: false
    },
    current: {
      type: Number,
      default: (new Date().getTime())/1000
    }
  },
  mounted() {
    this.startCountDown(); // 启动定时器
  },
  methods: {
    startCountDown() {
      let self = this
      self.timer = setTimeout(time, 100)
      function time() {
        clearTimeout(self.timer);
        let cur_ = self.countDown.current || self.current || parseInt((new Date().getTime())/1000)
        self.countDown = {...countDown(self.date, cur_)};
        if (self.countDown.run) {
          self.timer = setTimeout(time, 1000);
        } else {
          self.stopRunning()
          self.countDown.hour = '00';
          self.countDown.minute = '00';
          self.countDown.seconde = '00';
          return;
        }
      }
    },
    stopRunning() {
      this.$emit("stopRunning")
    },
    destoryTimer() {
      clearTimeout(this.timer)
    }
  }
};

</script>

<style lang="scss" scoped >
@import '@/style/custom.scss';
$--elem-h: 50px;
.count-down-time {
  display: -webkit-flex;
  display: flex;
  margin-left: auto;
  margin-right: auto;
}

.count-down-time .colon {
  font-size: 16px;
  height: $--elem-h;
  line-height: $--elem-h;
  padding: 0 10px;
  font-family: OrbitronRegular;
}

.count-down-time .time {
  font-size: 16px;
  font-family: OrbitronRegular;
  height: $--elem-h;
  line-height: $--elem-h - 2;
  position: relative;
  padding: 0 $--elem-h/2;
  text-align: center;
  background: url(/image/timer.png) no-repeat center/cover;
  border: 1px solid $--color-white-01;
  // border-radius: 10px;
}

.count-down-time .digital::before,
.count-down-time .digital::after {
  position: absolute;
  content: attr(data-number);
  left: 0;
  right: 0;
  color: #ffffff;
  // background-color: #64727d;
  overflow: hidden;
  
  -webkit-perspective: 160px;
          perspective: 160px;
}

.count-down-time .digital::before {
  top: 0;
  bottom: 50%;
  border-bottom: 1px solid #666666;
  background: url(/image/timer.png) no-repeat top;
  background-size: 100% auto;
  background-color: #4E6077;
  // border-radius: 10px 10px 0 0;
}

.count-down-time .digital::after {
  top: 50%;
  bottom: 0;
  line-height: 0;
  // border-radius: 0 0 10px 10px;
  // background-color: rgba(255, 255, 255, 0.2);
  background: url(/image/timer.png) no-repeat bottom;
  background-size: 100% auto;
  // background-color: #64727d;
  background-color: #2c3947;
}

.count-down-time .back::before
.count-down-time .front::after {
  z-index: 1;
}

.count-down-time .back::after {
  z-index: 2;
}

.count-down-time .front::before {
  z-index: 3;
}

.count-down-time .back::after {
  -webkit-transform-origin: center top;
  transform-origin: center top;
  -webkit-transform: rotateX(0.5turn);
  transform: rotateX(0.5turn);
}

.count-down-time .runing .front::before {
  -webkit-transform-origin: center bottom;
          transform-origin: center bottom;
  -webkit-animation: frontFlipDown 0s ease-in-out;
          animation: frontFlipDown 0s ease-in-out;
  box-shadow: 0 -2px 6px rgba(255, 255, 255, 0.3);
  -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
}

.count-down-time .running .back::after {
  -webkit-animation: backFlipDown 0.6s ease-in-out;
          animation: backFlipDown 0.6s ease-in-out;
}

@-webkit-keyframes frontFlipDown {
  to {
    -webkit-transform: rotateX(0.5turn);
            transform: rotateX(0.5turn);
  }
}

@keyframes frontFlipDown {
  to {
    -webkit-transform: rotateX(0.5turn);
            transform: rotateX(0.5turn);
  }
}
@-webkit-keyframes backFlipDown {
  to {
    -webkit-transform: rotateX(0);
            transform: rotateX(0);
  }
}
@keyframes backFlipDown {
  to {
    -webkit-transform: rotateX(0);
            transform: rotateX(0);
  }
}

</style>
