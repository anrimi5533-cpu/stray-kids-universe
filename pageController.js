
// ===================================
// 페이지 제어 객체
// ===================================
let pageController = {
  progressBar: null,
  icons: null,

  // 초기화 함수
  init: function () {
    this.icons = document.querySelectorAll(".icon img");
    this.createProgressBar();
    this.bindEvents();
  },

  // 이벤트 연결 함수
  bindEvents: function () {
    // 스크롤 이벤트 → 진행 바 업데이트
    window.addEventListener("scroll", this.updateProgress.bind(this));

    // 아이콘 이벤트
    for (let i = 0; i < this.icons.length; i++) {
      // 클릭 이벤트 → ripple 효과
      this.icons[i].addEventListener("click", this.createRipple);

      // 마우스 올림 이벤트 → 아이콘 강조
      this.icons[i].addEventListener(
        "mouseenter",
        this.highlightIcon.bind(this)
      );
    }
  },

  // ===============================
  // 효과 A: 스크롤 진행 바 생성
  // ===============================
  createProgressBar: function () {
    this.progressBar = document.createElement("div");

    this.progressBar.style.position = "fixed";
    this.progressBar.style.top = "0";
    this.progressBar.style.left = "0";
    this.progressBar.style.height = "4px";
    this.progressBar.style.width = "0%";
    this.progressBar.style.background = "#aef3ff";
    this.progressBar.style.zIndex = "99999";

    document.body.appendChild(this.progressBar);
  },

  // 스크롤 비율 계산 후 진행 바 업데이트
  updateProgress: function () {
    let scrollTop = document.documentElement.scrollTop;
    let scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    let percent = (scrollTop / scrollHeight) * 100;
    this.progressBar.style.width = percent + "%";
  },

  // ===============================
  // 효과 B: 클릭 Ripple 효과
  // ===============================
  createRipple: function (e) {
    let ripple = document.createElement("span");

    let rect = this.getBoundingClientRect();
    let size = Math.max(rect.width, rect.height);

    ripple.style.position = "absolute";
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = e.clientX - rect.left - size / 2 + "px";
    ripple.style.top = e.clientY - rect.top - size / 2 + "px";
    ripple.style.borderRadius = "50%";
    ripple.style.background = "rgba(200,245,255,0.6)";
    ripple.style.pointerEvents = "none";
    ripple.style.transform = "scale(0)";
    ripple.style.opacity = "1";
    ripple.style.transition = "transform 0.6s, opacity 0.6s";

    this.style.position = "relative";
    this.appendChild(ripple);

    requestAnimationFrame(() => {
      ripple.style.transform = "scale(1)";
      ripple.style.opacity = "0";
    });

    setTimeout(() => {
      ripple.remove();
    }, 600);
  },

  // ===============================
  // 효과 C: 아이콘 강조 효과
  // ===============================
  highlightIcon: function (e) {
    // 모든 아이콘 기본 상태
    for (let i = 0; i < this.icons.length; i++) {
      this.icons[i].style.boxShadow =
        "0 0 14px rgba(170,230,255,.65)";
    }

    // 마우스를 올린 아이콘 강조
    e.target.style.boxShadow =
      "0 0 30px rgba(200,245,255,1)";
  }
};

// 페이지 로드 후 실행
window.addEventListener("load", function () {
  pageController.init();
});

