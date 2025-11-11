<template>
  <div class="org-wrapper" ref="wrapper">
    <div class="main-card">
      <div class="title-border"><h2>{{ mainCard.title }}</h2></div>
      <p>{{ mainCard.level }}</p>
    </div>

    <div class="cards-row row-2">
      <div v-for="(card, i) in level2" :key="'l2'+i" class="sub-card">
        <div class="sub-card-header solid"><h3>{{ card.title }}</h3></div>
        <p>{{ card.level }}</p>
      </div>
    </div>

    <div class="cards-row row-3">
      <div v-for="(card, i) in level3" :key="'l3'+i" class="sub-card">
        <div class="sub-card-header solid"><h3>{{ card.title }}</h3></div>
        <p>{{ card.level }}</p>
      </div>
    </div>

    <div class="cards-row main-eight">
      <div v-for="(card, mIndex) in level4" :key="'m'+mIndex" class="card-block">
        <div
          class="sub-card"
          :class="{ active: activeMainIndex === mIndex }"
          @click="toggleMain(mIndex)"
        >
          <div class="sub-card-header grad"><h3>{{ card.title }}</h3></div>
          <p>{{ card.level }}</p>
        </div>

        <transition name="fade">
          <div v-if="activeMainIndex === mIndex" class="flyout" @click.stop>
            <div class="two-sections">
              <div
                v-for="(section, sIndex) in card.sections"
                :key="'s'+mIndex+'-'+sIndex"
                class="section-col"
              >
                <div class="sub-card mini">
                  <div class="sub-card-header solid">
                    <h3>{{ section.title }}</h3>
                  </div>
                  <p>{{ section.level }}</p>
                </div>

                <div class="participants-title">الجهات المشاركة</div>
                <div class="participants">
                  <div
                    v-for="(g, gi) in section.participants"
                    :key="'g'+gi"
                    class="premissions"
                  >
                    <div class="header">
                      <div class="header-inner">
                        <div class="frame-div">
                          <div class="frame-child"></div>
                        </div>
                      </div>
                    </div>
                    <div class="premissions-child"></div>
                    <div class="premissions-inner">
                      <div class="rectangle-wrapper">
                        <div class="premissions-div">{{ g }}</div>
                        <div class="frame-item"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrgChartFinal",
  data() {
    return {
      activeMainIndex: null,
      mainCard: {
        title: "اللجنة السعودية الصينية المشتركة رفيعة المستوى",
        level: "المستوى القيادي",
      },
      level2: [
        { title: "اللجنة الثقافية", level: "تنفيذي" },
        { title: "اللجنة الاقتصادية", level: "تنفيذي" },
      ],
      level3: [
        { title: "لجنة التعليم", level: "فرعي" },
        { title: "لجنة الطاقة", level: "فرعي" },
      ],
      level4: [
        {
          title: "اللجنة التقنية",
          level: "فرعي",
          sections: [
            {
              title: "قسم الذكاء الاصطناعي",
              level: "تنفيذي",
              participants: ["وزارة الاتصالات", "الهيئة السعودية للبيانات"],
            },
            {
              title: "قسم الأنظمة الرقمية",
              level: "تنفيذي",
              participants: ["وزارة الداخلية", "التحول الرقمي"],
            },
          ],
        },
        {
          title: "اللجنة الطبية",
          level: "فرعي",
          sections: [
            {
              title: "قسم التحليل الطبي",
              level: "تنفيذي",
              participants: ["وزارة الصحة", "المختبر المركزي"],
            },
            {
              title: "قسم المختبرات",
              level: "تنفيذي",
              participants: ["هيئة الغذاء والدواء"],
            },
          ],
        },
        {
          title: "اللجنة البيئية",
          level: "فرعي",
          sections: [
            {
              title: "قسم الاستدامة",
              level: "تنفيذي",
              participants: ["وزارة البيئة", "وزارة الطاقة"],
            },
            {
              title: "قسم الموارد الطبيعية",
              level: "تنفيذي",
              participants: ["وزارة المياه", "وزارة الزراعة"],
            },
          ],
        },
        {
          title: "اللجنة السياحية",
          level: "فرعي",
          sections: [
            {
              title: "قسم الترويج السياحي",
              level: "تنفيذي",
              participants: ["وزارة السياحة", "وزارة الإعلام"],
            },
            {
              title: "قسم التخطيط",
              level: "تنفيذي",
              participants: ["وزارة الثقافة", "هيئة الاستثمار"],
            },
          ],
        },   {
          title: "اللجنة السياحية",
          level: "فرعي",
          sections: [
            {
              title: "قسم الترويج السياحي",
              level: "تنفيذي",
              participants: ["وزارة السياحة", "وزارة الإعلام"],
            },
            {
              title: "قسم التخطيط",
              level: "تنفيذي",
              participants: ["وزارة الثقافة", "هيئة الاستثمار"],
            },
          ],
        },   {
          title: "اللجنة السياحية",
          level: "فرعي",
          sections: [
            {
              title: "قسم الترويج السياحي",
              level: "تنفيذي",
              participants: ["وزارة السياحة", "وزارة الإعلام"],
            },
            {
              title: "قسم التخطيط",
              level: "تنفيذي",
              participants: ["وزارة الثقافة", "هيئة الاستثمار"],
            },
          ],
        },  {
          title: "اللجنة البيئية",
          level: "فرعي",
          sections: [
            {
              title: "قسم الاستدامة",
              level: "تنفيذي",
              participants: ["وزارة البيئة", "وزارة الطاقة"],
            },
            {
              title: "قسم الموارد الطبيعية",
              level: "تنفيذي",
              participants: ["وزارة المياه", "وزارة الزراعة"],
            },
          ],
        }
      ],
    };
  },
  methods: {
    toggleMain(idx) {
      this.activeMainIndex = this.activeMainIndex === idx ? null : idx;
    },
  },
};
</script>

<style scoped>
.org-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 16px;
  gap: 30px;
  font-family: 'IBM Plex Sans', Tahoma, Arial, sans-serif;
}

.cards-row {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
}

.main-card,
.cards-row,
.card-block {
  position: relative;
  z-index: 1;
}

.main-card {
  background: linear-gradient(180deg, #03735e 0%, #b1d4cd 160%);
  color: #fff;
  border-radius: 16px;
  padding: 24px 32px;
  text-align: center;
  width: 90%;
  max-width: 700px;
  border: 1px solid #d2d6db;
}

.title-border {
  border: 1px solid #fff;
  border-radius: 20px;
  padding: 8px 24px;
  display: inline-block;
  margin-bottom: 10px;
}

.title-border h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.main-card p {
  margin: 0;
  font-size: 16px;
}

.sub-card {
  width: 240px;
  background: linear-gradient(180deg, #E6FAF6 0%, #FFFFFF 100%);
  border-radius: 16px;
  border: 1px solid #d2d6db;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  transition: transform .18s, box-shadow .18s;
}

.sub-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
}

.sub-card-header.solid {
  background: #03735E;
  border-radius: 20px;
  margin-bottom: 8px;
  height: 34px;
}

.sub-card-header.grad {
  background: linear-gradient(180deg, #03735e 0%, #b1d4cd 160%);
  border-radius: 20px;
  margin-bottom: 8px;
  height: 34px;
}

.sub-card h3 {
  color: #fff;
  font-size: 16px;
  line-height: 34px;
  margin: 0;
}

.sub-card p {
  color: #555;
  font-size: 13px;
  margin: 0;
}

.card-block {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-eight {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: nowrap;
  gap: 24px;
  overflow-x: auto;
  width: 100%;
  padding-bottom: 10px;
  padding-inline-end: 100px;
}

.participants-title {
  background: linear-gradient(90deg, #03735E 0%, #0B8B6B 100%);
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  padding: 6px 24px;
  border-radius: 30px;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.participants {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.premissions {
  width: 320px;
  border-radius: 16px;
  background: linear-gradient(90deg, #ffffff 0%, #e7ecf3 100%);
  border: 1px solid #d2d6db;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  padding: 16px;
  position: relative;
  gap: 16px;
}

.header {
  align-self: stretch;
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

.frame-div {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.frame-child {
  height: 34px;
  flex: 1;
  border-radius: 20px;
  background-color: #03735e;
  border: 1px solid #f0f4fa;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 500;
}

.frame-child::before {
  content: "جهة مشاركة";
}

.premissions-child {
  width: 150px;
  height: 150px;
  position: absolute;
  top: 90px;
  left: 166px;
  filter: blur(300px);
  border-radius: 50%;
  background-color: #5196f3;
  opacity: .45;
  z-index: 1;
}

.premissions-inner {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 2;
}

.rectangle-wrapper {
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  min-height: 72px;
  padding: 6px 10px 16px 16px;
}

.premissions-div {
  color: #03735E;
  font-weight: 600;
  font-size: 15px;
  text-align: right;
  width: 100%;
  padding-right: 8px;
}

.frame-item {
  position: absolute;
  right: 10px;
  top: 58%;
  transform: translateY(-50%);
  width: 4px;
  height: 90px;
  border-radius: 8px;
  background-color: #22b056;
  opacity: .98;
}
.two-sections {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 40px;
  flex-wrap: wrap;
  width: 100%;
  margin-top:15px;
}

.section-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}
.flyout {
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  justify-content: center;
  padding: 15px 0;
}

.two-sections {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 40px;
  min-width: max-content; /* يمنع الالتفاف ويخليهم صف واحد */
  padding: 10px 20px;
}
.flyout {
  width: 100%;
  display: flex;
  justify-content: flex-start; /* بدلاً من center */
  overflow-x: auto;
  overflow-y: visible;
  padding: 20px 40px;
  scroll-behavior: smooth;
  box-sizing: border-box;
}
.org-wrapper {
  overflow-x: visible;
  overflow-y: visible;
}


.main-eight {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: nowrap;
  gap: 24px;
  overflow-x: auto;
  overflow-y: visible;
  width: 100%;
  padding: 20px 60px;
  box-sizing: border-box;
  scroll-behavior: smooth;
  direction: ltr; 
}

.main-eight::before,
.main-eight::after {
  content: "";
  flex: 0 0 80px;
}
.flyout {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow-x: auto;
  overflow-y: visible;
  padding: 20px 60px;
  box-sizing: border-box;
  scroll-behavior: smooth;
  direction: ltr;
}

.two-sections {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 40px;
  min-width: max-content;
  padding: 10px 20px;
  box-sizing: border-box;
}

.section-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  flex-shrink: 0;
}
.main-eight {
  display: flex;
  justify-content: flex-start; 
  align-items: flex-start;
  flex-wrap: nowrap;
  gap: 24px;
  overflow-x: auto;
  overflow-y: visible;
  width: 100%;
  padding: 20px 80px; 
  box-sizing: border-box;
  scroll-behavior: smooth;
  direction: rtl; 
}


.main-eight::before,
.main-eight::after {
  content: "";
  flex: 0 0 80px;
}


.flyout {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-x: auto;
  overflow-y: visible;
  padding: 20px 80px;
  box-sizing: border-box;
  scroll-behavior: smooth;
  direction: rtl; 
}

.two-sections {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 40px;
  min-width: max-content; 
  padding: 10px 20px;
  box-sizing: border-box;
}

.section-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  flex-shrink: 0;
}


</style>
