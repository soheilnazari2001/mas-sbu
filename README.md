<p align="center">
  <img src="assets/img/banner.png" alt="Multi-Agent Systems (MAS) Banner" width="100%">
</p>

<h1 align="center">سیستم‌های چندعامله — Multi-Agent Systems (MAS)</h1>

<p align="center">
  <b>یادداشت‌های تعاملی، جزوات تخصصی، بازی‌های نظریه بازی‌ها و شبیه‌سازهای رفتار عاملی</b><br>
  درس سیستم‌های چندعامله — دانشکده مهندسی و علوم کامپیوتر دانشگاه شهید بهشتی
</p>

<p align="center">
  <a href="https://ehsanshahbazii.github.io/mas-sbu/"><img src="https://img.shields.io/badge/Live_Demo-Visit_Website-10b981?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Live Demo"></a>
  <a href="https://github.com/EhsanShahbazii/mas-sbu/stargazers"><img src="https://img.shields.io/github/stars/EhsanShahbazii/mas-sbu?style=for-the-badge&color=10b981&logo=star" alt="Stars"></a>
  <a href="https://github.com/EhsanShahbazii/mas-sbu/network/members"><img src="https://img.shields.io/github/forks/EhsanShahbazii/mas-sbu?style=for-the-badge&color=34d399&logo=git" alt="Forks"></a>
  <img src="https://img.shields.io/badge/University-Shahid_Beheshti_(SBU)-003366?style=for-the-badge&logo=googlescholar&logoColor=white" alt="SBU">
  <img src="https://img.shields.io/badge/Instructor-Dr._Monireh_Abdoos-10b981?style=for-the-badge" alt="Instructor">
  <img src="https://img.shields.io/badge/Theme-Obsidian_Dark_%26_Light-111827?style=for-the-badge" alt="Themes">
  <img src="https://img.shields.io/badge/Font-Estedad_Variable-3b82f6?style=for-the-badge" alt="Typography">
  <a href="#-مجوز-license"><img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License"></a>
</p>

---

## 📖 معرفی

یادداشت‌ها و منابع درس **سیستم‌های چندعامله (Multi-Agent Systems)** در دانشکده مهندسی و علوم کامپیوتر **دانشگاه شهید بهشتی** با تدریس **دکتر منیره عبدوس**. این مجموعه شامل مفاهیم عامل‌های خودمختار، تعاملات اجتماعی، نظریه بازی‌ها، مدل‌های ریاضی و معماری‌های تصمیم‌گیری به همراه شبیه‌سازهای تعاملی است.

---

## 📚 سرفصل‌ها و جلسات درس

| جلسه | عنوان و سرفصل‌های تخصصی | لینک یادداشت |
| :---: | :--- | :---: |
| **۰۱** | **اصول و مبانی MAS** · تعریف عامل خودمختار، کاربردهای صنعتی و RoboCup، سودمندی انتظاری، معرفی معمای زندانیان | [مشاهده جلسه ۱](sessions/session-01.html) |
| **۰۲** | **چرخهٔ عملیاتی و تاکسونومی محیط** · چرخه ادراک-استنتاج-کنش، تعاملات اجتماعی، طبقه‌بندی محیط‌ها، معماری‌های واکنشی و پیش‌فعال | [مشاهده جلسه ۲](sessions/session-02.html) |
| **۰۳** | **تعاملات اجتماعی و فرمول‌بندی عامل‌ها** · همکاری، هماهنگی و مذاکره، محیط‌های تصادفی، چالش‌های پیشرفته و فرمول‌بندی پایه | [مشاهده جلسه ۳](sessions/session-03.html) |
| **۰۴** | **فرمول‌بندی رسمی و سودمندی انتظاری** · مدل‌های ریاضی ($E, A, \tau, Ag$)، معماری تفکیک مشاهده از حالت، فاکتور تنزیل $\gamma$ و عقلانیت محدود | [مشاهده جلسه ۴](sessions/session-04.html) |
| **۰۵** | **معماری‌های سابسانپشن و استنتاجی** · معماری Subsumption بروکس، سناریوی مریخ و استیگمرژی، استنتاج مبتنی بر منطق و جهان بلاک‌ها | [مشاهده جلسه ۵](sessions/session-05.html) |
| **۰۶** | **منطق زمانی و استدلال عملی** · منطق زمانی CTL/LTL با عملگرهای زمانی، معماری Practical Reasoning (BDI)، دلیبریشن و برنامه‌ریزی | [مشاهده جلسه ۶](sessions/session-06.html) |

---

## 🚀 راهنمای اجرای محلی (Quick Start)

برای اجرای این وبسایت به هیچ ابزار پیچیده یا پیش‌نیازی نیاز ندارید. کافیست مخزن را کلون کرده و یک سرور محلی ساده اجرا کنید:

```bash
# ۱. کلون کردن مخزن
git clone https://github.com/EhsanShahbazii/mas-sbu.git
cd mas-sbu

# ۲. اجرای وب‌سرور سبک پایتون
python3 -m http.server 8000
```

سپس در مرورگر خود آدرس زیر را باز کنید:
```
http://localhost:8000
```

---

## 🛠️ ساختار فایل‌ها

```text
mas-sbu/
├── assets/
│   ├── css/
│   │   ├── site.css             # استایل‌های پایه، فونت‌ها و لی‌اوت اصلی
│   │   └── mas-theme.css        # پوستهٔ اختصاصی دارک و لایت، توکن‌ها و بازطراحی
│   ├── fonts/                   # قلم‌های محلی Estedad و Plus Jakarta Sans
│   ├── img/                     # آیکون‌ها، بنر پروژه و لوگوی وکتور ربات MAS
│   └── js/
│       ├── site.js              # سوییچ پوسته، جستجو و ناوبری
│       └── mas-fun.js           # بازی معمای زندانیان، شبیه‌ساز گله‌داری و ربات عاملک
├── sessions/                    # یادداشت‌های جامع و اختصاصی هر جلسه
│   ├── session-01.html
│   ├── ...
│   └── session-06.html
├── index.html                   # صفحهٔ اصلی پورتال MAS
├── notes.html                   # آرشیو و نمای کلی جلسات
└── README.md                    # مستندات و راهنمای پروژه
```

---

## 👥 مشارکت‌کنندگان (Contributors)

با تشکر صمیمانه از تمامی عزیزانی که در توسعه، طراحی، نگارش و گردآوری این مجموعه سهم داشته‌اند:

<table align="center">
  <tr>
    <td align="center" width="160px">
      <a href="https://github.com/EhsanShahbazii">
        <img src="https://github.com/EhsanShahbazii.png" width="96px;" alt="احسان شهبازی"/><br />
        <sub><b>احسان شهبازی</b></sub>
      </a>
    </td>
    <td align="center" width="160px">
      <a href="https://github.com/soheilnazari2001">
        <img src="https://github.com/soheilnazari2001.png" width="96px;" alt="سهیل نظری"/><br />
        <sub><b>سهیل نظری</b></sub>
      </a>
    </td>
  </tr>
</table>

### 🎓 استاد درس
- **دکتر منیره عبدوس** — عضو هیئت علمی دانشگاه شهید بهشتی و مدرس درس سیستم‌های چندعامله.

---

## 🤝 نحوهٔ مشارکت (Contribution)

از هرگونه مشارکت، تکمیل یادداشت‌ها، افزودن سناریوها و مینی‌گیم‌های جدید، یا گزارش اشکالات استقبال می‌کنیم:

۱. این مخزن را Fork کنید.  
۲. یک شاخه برای قابلیت جدید بسازید (`git checkout -b feature/amazing-feature`).  
۳. تغییرات را Commit کنید (`git commit -m 'feat: add new interactive simulation'`).  
۴. شاخه را Push کنید (`git push origin feature/amazing-feature`).  
۵. یک Pull Request باز کنید تا بررسی و ادغام شود.

---

## 📜 مجوز (License)

این پروژه تحت مجوز **MIT** منتشر شده است. استفادهٔ آموزشی، پژوهشی و شخصی با ذکر منبع آزاد است.
