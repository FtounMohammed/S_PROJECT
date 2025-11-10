<template>
  <div class="org-wrapper" dir="rtl" ref="wrapper">
    <div class="main-card" ref="mainCard">
      <div class="title-border"><h2>{{ mainCard.title }}</h2></div>
      <p>{{ mainCard.level }}</p>
    </div>

    <div class="cards-row top-two" ref="row1">
      <div v-for="(card, i) in firstRow" :key="'f'+i" class="sub-card" ref="firstRowCards">
        <div class="sub-card-header solid"><h3>{{ card.title }}</h3></div>
        <p>{{ card.level }}</p>
      </div>
    </div>

    <div class="cards-row top-two" ref="row2">
      <div v-for="(card, i) in secondRow" :key="'s'+i" class="sub-card" ref="secondRowCards">
        <div class="sub-card-header solid"><h3>{{ card.title }}</h3></div>
        <p>{{ card.level }}</p>
      </div>
    </div>

    <div class="cards-row main-four" ref="row3">
      <div v-for="(card, mIndex) in mainFour" :key="'m'+mIndex" class="card-block">
        <div class="sub-card" :class="{ active: activeMainIndex === mIndex }" ref="thirdRowCards" @click="toggleMain(mIndex)">
          <div class="sub-card-header grad"><h3>{{ card.title }}</h3></div>
          <p>{{ card.level }}</p>
        </div>

        <transition name="fade">
          <div v-if="activeMainIndex === mIndex" class="two-subcards-wrapper" ref="subRowWrappers">
            <div v-for="(sub, sIndex) in card.subCards" :key="'sub'+mIndex+'-'+sIndex" class="subcard-item">
              <div class="sub-card mini" ref="subCards" @click.stop="toggleSub(mIndex, sIndex)">
                <div class="sub-card-header solid"><h3>{{ sub.title }}</h3></div>
                <p>{{ sub.level }}</p>
              </div>

              <transition name="fade">
                <div v-if="activeSub[mIndex] === sIndex" class="participants-section" ref="participantsSections">
                  <div class="premissions-parent">
                    <div v-for="(g, gi) in participantsCards" :key="'g'+gi" class="premissions">
                      <div class="header">
                        <div class="header-inner">
                          <div class="frame-wrapper">
                            <div class="wrapper">
                              <div class="div2">الجهة المشاركة</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="premissions-child"></div>
                      <div class="premissions-inner">
                        <div class="rectangle-wrapper">
                          <div class="frame-item"></div>
                          <div class="premissions-div">{{ g }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <svg class="wires-layer" ref="svg" :width="svgSize.w" :height="svgSize.h">
      <defs>
        <marker id="arrowDown" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 L2,3 Z" fill="#9da4ae" />
        </marker>
      </defs>
      <g stroke="#9da4ae" stroke-width="2" fill="none">
        <path v-for="(path, i) in pathsArrow" :key="'a'+i" :d="path.d" :marker-end="path.hasArrow ? 'url(#arrowDown)' : null" />
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: "OrgChartFinal",
  data() {
    return {
      mainCard: {
        title: "اللجنة السعودية الصينية المشتركة رفيعة المستوى",
        level: "المستوى القيادي",
      },
      firstRow: [
        { title: "اللجنة الثقافية", level: "تنفيذي" },
        { title: "اللجنة الاقتصادية", level: "تنفيذي" },
      ],
      secondRow: [
        { title: "لجنة التعليم", level: "فرعي" },
        { title: "لجنة الطاقة", level: "فرعي" },
      ],
      mainFour: [
        {
          title: "اللجنة الطبية",
          level: "فرعي",
          subCards: [
            { title: "قسم التحليل الطبي", level: "تنفيذي" },
            { title: "قسم المختبرات", level: "تنفيذي" },
          ],
        },
        {
          title: "اللجنة التقنية",
          level: "فرعي",
          subCards: [
            { title: "قسم الذكاء الاصطناعي", level: "تنفيذي" },
            { title: "قسم الأنظمة الرقمية", level: "تنفيذي" },
          ],
        },
        {
          title: "اللجنة السياحية",
          level: "فرعي",
          subCards: [
            { title: "قسم التخطيط", level: "تنفيذي" },
            { title: "قسم الترويج", level: "تنفيذي" },
          ],
        },
        {
          title: "اللجنة البيئية",
          level: "فرعي",
          subCards: [
            { title: "قسم الحفاظ على البيئة", level: "تنفيذي" },
            { title: "قسم الاستدامة", level: "تنفيذي" },
          ],
        },
      ],
      participantsCards: ["وزارة الطاقة", "وزارة التعليم", "وزارة الصحة"],
      activeMainIndex: null,
      activeSub: {},
      svgSize: { w: 0, h: 0 },
      pathsArrow: [],
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.drawAll();
      window.addEventListener("resize", this.drawAll);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.drawAll);
  },
  watch: {
    activeMainIndex() {
      this.$nextTick(this.drawAll);
    },
    activeSub: {
      deep: true,
      handler() {
        this.$nextTick(this.drawAll);
      },
    },
  },
  methods: {
    toggleMain(idx) {
      this.activeMainIndex = this.activeMainIndex === idx ? null : idx;
      this.activeSub = {};
    },
    toggleSub(mIndex, sIndex) {
      this.$set(this.activeSub, mIndex, this.activeSub[mIndex] === sIndex ? null : sIndex);
    },
    drawAll() {
      const wrap = this.$refs.wrapper;
      if (!wrap) return;
      const wrapRect = wrap.getBoundingClientRect();
      this.svgSize = { w: wrap.clientWidth, h: wrap.scrollHeight };
      const centerTop = (el) => (el ? { x: el.getBoundingClientRect().left - wrapRect.left + el.offsetWidth / 2, y: el.getBoundingClientRect().top - wrapRect.top } : null);
      const centerBot = (el) => (el ? { x: el.getBoundingClientRect().left - wrapRect.left + el.offsetWidth / 2, y: el.getBoundingClientRect().bottom - wrapRect.top } : null);
      const hline = (x1, y, x2) => `M ${x1} ${y} L ${x2} ${y}`;
      const vline = (x, y1, y2) => `M ${x} ${y1} L ${x} ${y2}`;
      const pAr = [];
      const main = this.$refs.mainCard;
      const row1 = this.$refs.firstRowCards || [];
      const row2 = this.$refs.secondRowCards || [];
      const row3 = this.$refs.thirdRowCards || [];

      if (main && row3.length > 0) {
        const mainB = centerBot(main);
        const row3TopY = centerTop(row3[0]).y - 10;
        pAr.push({ d: vline(mainB.x, mainB.y, row3TopY), hasArrow: false });
      }

      [row1, row2].forEach((row) => {
        if (row.length > 0) {
          const topY = centerTop(row[0]).y - 10;
          const leftX = centerTop(row[0]).x;
          const rightX = centerTop(row[row.length - 1]).x;
          pAr.push({ d: hline(leftX, topY, rightX), hasArrow: false });
          row.forEach((c) => {
            const top = centerTop(c).y - 10;
            const bot = centerTop(c).y + 10;
            pAr.push({ d: vline(centerTop(c).x, top, bot), hasArrow: false });
          });
        }
      });

      if (row3.length > 0) {
        const topY = centerTop(row3[0]).y - 10;
        const leftX = centerTop(row3[0]).x;
        const rightX = centerTop(row3[row3.length - 1]).x;
        pAr.push({ d: hline(leftX, topY, rightX), hasArrow: false });
        row3.forEach((c) => {
          const cTop = centerTop(c).y - 10;
          const cBot = centerBot(c).y - 80;
          pAr.push({ d: vline(centerTop(c).x, cTop, cBot), hasArrow: true });
        });
      }

      if (this.activeMainIndex !== null) {
        const mIndex = this.activeMainIndex;
        const allMainCards = wrap.querySelectorAll(".card-block");
        const currentBlock = allMainCards[mIndex];
        if (!currentBlock) return;
        const subs = currentBlock.querySelectorAll(".two-subcards-wrapper .sub-card");
        if (subs.length > 0) {
          const parent = currentBlock.querySelector(".card-block > .sub-card");
          const parentBot = centerBot(parent);
          const midY = centerTop(subs[0]).y - 30;
          pAr.push({ d: vline(parentBot.x, parentBot.y, midY), hasArrow: false });
          const leftX = centerTop(subs[0]).x;
          const rightX = centerTop(subs[subs.length - 1]).x;
          pAr.push({ d: hline(leftX, midY, rightX), hasArrow: false });
          subs.forEach((s, sIndex) => {
            const sTop = centerTop(s).y - 8;
            const x = centerTop(s).x;
            pAr.push({ d: vline(x, midY, sTop), hasArrow: true });
            if (this.activeSub[mIndex] === sIndex) {
              const section = s.parentElement.querySelector(".participants-section");
              if (section) {
                const participants = section.querySelectorAll(".premissions");
                if (participants.length > 0) {
                  const firstTop = centerTop(participants[0]).y - 15;
                  pAr.push({ d: vline(x, centerBot(s).y, firstTop), hasArrow: false });
                  participants.forEach((cur) => {
                    const topY = centerTop(cur).y - 10;
                    const botY = centerBot(cur).y + 20;
                    pAr.push({ d: vline(x, topY, botY), hasArrow: true });
                  });
                }
              }
            }
          });
        }
      }
      this.pathsArrow = pAr;
    },
  },
};
</script>



<style scoped>
.org-wrapper{
  position:relative; display:flex; flex-direction:column; align-items:center;
  padding:40px 16px;

   gap:30px;
    font-family:'IBM Plex Sans', Tahoma, Arial, sans-serif;
}
.wires-layer{position:absolute; left:0; top:0; pointer-events:none; z-index:0;}
.main-card{
  background:linear-gradient(180deg,#03735e 0%,#b1d4cd 160%);
  color:#fff;
  border-radius:16px;
  padding:24px 32px;
  text-align:center;
  width:90%; 
  max-width:700px;
  border:1px solid #d2d6db;
  box-shadow:0 2px 10px rgba(0,0,0,0.08); z-index:1;
}
.title-border{border:1px solid #fff;
  border-radius:20px;
  display:inline-block;
  padding:8px 24px;
  margin-bottom:10px}
.title-border h2{margin:0;
  font-size:20px;
  font-weight:600}
.main-card p{margin:0;
  font-size:16px}

.cards-row.top-two{display:flex;
  justify-content:center;
  gap:40px; z-index:1;}

.cards-row.main-four{display:grid;
   grid-template-columns:repeat(4,1fr);
    gap:30px; width:100%;
     max-width:1200px; 
     align-items:start;
      z-index:1;
  
   top: 40px;}
.card-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative; 
}

.sub-card{width:240px;
  background:#fff;
  border-radius:16px;
  border:1px solid #d2d6db;
  padding:16px;
  text-align:center;
  transition:transform .18s, box-shadow .18s, border-color .18s;
  cursor:pointer;
  position:relative; z-index:1;
  background: linear-gradient(180deg, #E6FAF6 0%, #FFFFFF 100%);
  
}
.sub-card:hover{
  transform:translateY(-3px); 
  box-shadow:0 6px 16px rgba(0,0,0,0.06);

}
.sub-card h3 {
  font-size: 16px;
  color: #fff;
  margin: 4px 0 2px;
  padding-top: 5px;
  white-space: normal;      
  word-wrap: break-word;    
  overflow-wrap: break-word;
  text-align: center;      
}
.sub-card p {
  font-size: 13px;
  color: #555;
  margin: 0;
  text-align: center;
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.sub-card.active{border-color:#9da4ae; 
  box-shadow:0 8px 18px rgba(0,0,0,0.08);
}
.sub-card-header{height:34px;
  border-radius:20px;
  margin-bottom:10px;}
.sub-card-header.grad{background:linear-gradient(180deg,#03735e 0%,#b1d4cd 160%);}
.sub-card-header.solid{background:#03735E;}
.sub-card h3{font-size:16px;
  color:#fff;
  margin:4px 0 2px;
padding-top:5px ;}
.sub-card p{font-size:13px;
  color:#555;
  margin:0;}
.sub-card.mini{width:220px;}

.two-subcards-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  align-items: start;
  position: absolute; 
  top: 100%; 
  left: 50%;
  transform: translateX(-50%);
  margin-top: 12px;
  z-index: 10;
}


.participants-section{margin-top:12px; 
  display:flex; 
  justify-content:center;
  width:100%;}
.parent{width:100%;
   max-width:520px;
   position:relative;
    display:flex;
     flex-direction:column;
      align-items:center;
       gap:24px;
        text-align:center; 
        color:#03735e;}
.div,.inner,.frame-wrapper,.frame-container{display:flex; 
  align-items:center;
   justify-content:center;
    width:100%;}
.wrapper{border-radius:24px;
background-color: #03735e;
   padding:12px 16px;
    color:white; 
    max-width:300px;}
.div2{line-height:24px;
  font-weight:600;
  font-size:20px;}
.premissions-parent{align-self:stretch; 
  display:flex; 
  flex-direction:column; 
  align-items:center;
   gap:18px;}
.premissions {
  width: 100%;
  position: relative;
  border-radius: 16px;
  background-color: #fff;
  border: 1px solid #d2d6db;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  padding: 16px;
  gap: 16px;
  text-align: left;
  font-size: 20px;
  color: #fff;
  font-family: 'IBM Plex Sans Devanagari', sans-serif;
}

.header {
  align-self: stretch;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  z-index: 0;
}

.header-inner {
  flex: 1;
  display: flex;
  align-items: center;
}

.frame-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wrapper {
  height: 34px;
  flex: 1;
  border-radius: 20px;
  background-color: #03735e;
  border: 1px solid #f0f4fa;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 9px 6px;
  max-width: 100%;
}

.div {
  position: relative;
  line-height: 24px;
  font-weight: 500;
}

.premissions-child {
  width: 150px;
  height: 150px;
  position: absolute;
  margin: 0 !important;
  top: 90px;
  left: 166px;
  filter: blur(300px);
  border-radius: 50%;
  background-color: #5196f3;
  opacity: 0.45;
  z-index: 1;


}
.premissions-inner {
  align-self: stretch;
  display: flex;
  flex-direction: row-reverse; 
  align-items: center;
  justify-content: flex-end;
  z-index: 2;
  font-size: 14px;
  color: #22b056;
}

.frame-child {
  height: 89px;
  width: 5px; 
  border-radius: 8px;
  background-color: #22b056; 
}

.frame-parent {
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
}

.frame-container {
  height: 81px;
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
}

.container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.premissions-div {
  position: relative;
  line-height: 150%;
}



/* الخلفية الباهتة */
.premissions-child{width:180px; height:180px; position:absolute; top:100px; left:160px; filter:blur(250px);
  border-radius:50%; background:#5196f3; opacity:.35; z-index:1;}

/* الخط الأخضر على يمين الكرت */
.frame-item{position:absolute;
   right:12px; top:16px; 
   bottom:16px; width:5px;
    border-radius:8px;
     background:#22b056; z-index:2;}

.fade-enter-active, .fade-leave-active{transition:opacity .22s ease;}
.fade-enter, .fade-leave-to{opacity:0;}

@media (max-width:1100px){.cards-row.main-four{grid-template-columns:repeat(2,1fr)}}
@media (max-width:768px){.cards-row.top-two{flex-direction:column;align-items:center}}
@media (max-width:640px){
  .cards-row.main-four{grid-template-columns:1fr}
  .two-subcards-wrapper{grid-template-columns:1fr}
  .sub-card,.sub-card.mini{width:100%}
}
.premissions-inner {
  display: flex;
  flex-direction: column; 
  gap: 16px; 
  align-items: flex-end; 
}

.single-participant-box {
  width: 100%;
  display: flex;
  justify-content: flex-end; 
}
.participants-section {
  margin-top: 12px;
  display: flex;
  justify-content: center;
  width: 100%;
}

.premissions-parent {
  display: flex;
  flex-direction: column;
  gap: 24px; 
  align-items: center;
}

.premissions {
  width: 280px;
  min-height: 140px;
  border-radius: 20px;
  background-color: #fff;
  border: 1px solid #d2d6db;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 24px;
  position: relative;
  gap: 20px;
  box-shadow: 0 3px 12px rgba(0,0,0,0.05);
background: linear-gradient(270deg, #E7ECF3 0%, #FFFFFF 100%);

}

.premissions-inner {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  flex-direction: column;
}

.rectangle-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between; 
  width: 100%;
}
.two-subcards-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  align-items: start;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 40px;
  z-index: 10;
}


</style>
