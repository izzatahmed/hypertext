# الموسوعة القرآنية المترابطة | Quranic Hypertext Encyclopedia

قراءة شبكية (Hypertext) لموضوعات القرآن الكريم بالعربية والإنجليزية.
نزل القرآن الكريم نجوماً على مدى 23 سنة ورُتّب في المصحف ترتيباً آخر، فتقرأ الموسوعة النص شبكةً من العقد والروابط: كل موضوع صفحة، وكل رابط علاقة بين موضوعين.

A networked (hypertext) reading of Qur'anic topics in Arabic and English.

- الموقع: https://izzatahmed.github.io/hypertext/
- عدد الموضوعات: 31 في 9 محاور

## الصفحات | Pages
| الملف | الموضوع | Topic | المحور |
|---|---|---|---|
| `index.html` | الصفحة الرئيسية | Home | — |
| `tawhid.html` | التوحيد | Tawhid | العقيدة |
| `huda.html` | الهدى | Guidance | العقيدة |
| `dalal.html` | الضلال | Misguidance | العقيدة |
| `iman.html` | الإيمان | Faith | العقيدة |
| `kufr.html` | الكفر | Disbelief | العقيدة |
| `ikhlas.html` | الإخلاص | Sincerity | العقيدة |
| `malaika.html` | الملائكة | The Angels | أركان الإيمان |
| `kutub.html` | الكتب | The Books | أركان الإيمان |
| `rusul.html` | الرسل | Messengers | أركان الإيمان |
| `akhira.html` | اليوم الآخر | The Last Day | اليوم الآخر |
| `jannah.html` | الجنة | Paradise | اليوم الآخر |
| `nar.html` | النار | The Fire | اليوم الآخر |
| `taqwa.html` | التقوى | Taqwa | الصيغ المتكررة |
| `yuhibb.html` | ما يحبه الله | God loves | الصيغ المتكررة |
| `layuhibb.html` | ما لا يحبه الله | Does not love | الصيغ المتكررة |
| `sabr.html` | الصبر | Patience | الأخلاق |
| `shukr.html` | الشكر | Gratitude | الأخلاق |
| `ihsan.html` | الإحسان | Ihsan | الأخلاق |
| `tawba.html` | التوبة | Repentance | الأخلاق |
| `istighfar.html` | الاستغفار | Forgiveness | الأخلاق |
| `salat.html` | الصلاة | Prayer | العبادات |
| `zakat.html` | الزكاة | Zakat | العبادات |
| `siyam.html` | الصيام | Fasting | العبادات |
| `hajj.html` | الحج | Hajj | العبادات |
| `khamr.html` | الخمر | Wine | التدرج في التشريع |
| `riba.html` | الربا | Riba | التدرج في التشريع |
| `jihad.html` | القتال | Fighting | التدرج في التشريع |
| `sabbath.html` | السبت والعهد | Sabbath | الهيمنة والعهد |
| `nuzul.html` | أنزل ونزّل | Revelation | الهيمنة والعهد |
| `musa.html` | قصة موسى | Moses | القصص والأمثال |
| `amthal.html` | الأمثال | Parables | القصص والأمثال |

## البنية | Structure
- `assets/style.css`: التنسيق المشترك.
- `assets/site.js`: اللغة، وتلميحات الآيات، والخرائط، والبحث، وروابط التذييل.
- `assets/topics.js`: **سجل الموضوعات**، المصدر الوحيد لقائمة الصفحات ومحاورها وروابط الخريطة العامة. منه تُولَّد نتائج البحث وروابط التذييل في كل صفحة وخريطة الصفحة الرئيسية.
- `sabbath.html` تحمل تنسيقها وخريطتها الخاصة، وتستعمل site.js وtopics.js للبحث والتلميحات والروابط.

### إضافة موضوع جديد
1. أنشئ الصفحة على قالب `tawhid.html`، واجعل في آخرها `<span class="site-links"></span>` داخل شريط الروابط الأخير، ثم `<script src="assets/topics.js"></script><script src="assets/site.js?v=N"></script>`.
2. أضف سطراً للموضوع في `TOPICS` وروابطه في `TLINKS` داخل `assets/topics.js`.
3. أضف بطاقته إلى `index.html` وحدّث العداد.
4. ارفع: الصفحة الجديدة، و`assets/topics.js`، و`index.html`. لا حاجة إلى تعديل بقية الصفحات.

## النشر على GitHub Pages | Deploy
المستودع `izzatahmed/hypertext`، والنشر من الفرع `main` والجذر `(root)` عبر Settings → Pages.

## المصادر والحدود | Sources and limits
- نصوص الآيات من [Tanzil](https://tanzil.net) (رواية حفص)، وفق شروط استخدامه: النص دون تعديل مع ذكر المصدر.
- عدّ الجذور والصيغ من التحليل الصرفي في [مدونة القرآن العربية](https://corpus.quran.com) (جامعة ليدز، الإصدار 0.4 ونسخة مصححة عنه).
- المشروع دراسة لبنية النص، لا فتوى ولا تفسير بديل. الإحصاءات آلية أولية تحتاج مراجعة يدوية.
- Verse texts from Tanzil (Hafs), used unmodified with attribution; root counts from the Quranic Arabic Corpus (University of Leeds). A study of textual structure, not a fatwa; counts are preliminary.
