import type { Lang } from "./chef-data";

export const T = {
  title: { en: "Chef AI", ar: "شيف الذكاء" },
  subtitle: {
    en: "Tell me what's in your kitchen — I'll tell you what to cook.",
    ar: "أخبرني بما لديك في المطبخ — وسأخبرك بما تطبخه.",
  },
  leftoverMode: { en: "Leftover Mode", ar: "وضع البقايا" },
  language: { en: "العربية", ar: "English" },
  apiSettings: { en: "AI settings", ar: "إعدادات الذكاء" },
  askTitle: { en: "What are you craving?", ar: "ماذا تشتهي؟" },
  askHint: {
    en: "List ingredients, a craving, or a mood.",
    ar: "اكتب المكونات أو الرغبة أو المزاج.",
  },
  placeholder: {
    en: "chicken, rice, half a lemon…",
    ar: "دجاج، أرز، نصف ليمونة…",
  },
  send: { en: "Ask Chef", ar: "اسأل الشيف" },
  chatTitle: { en: "Chat with Chef", ar: "محادثة الشيف" },
  chatEmpty: {
    en: "No messages yet. Ask something like “quick dinner with eggs”.",
    ar: "لا رسائل بعد. جرّب: «عشاء سريع بالبيض».",
  },
  thinking: { en: "Chef is thinking…", ar: "الشيف يفكّر…" },
  recipes: { en: "Recipe ideas", ar: "أفكار وصفات" },
  refresh: { en: "Shuffle", ar: "خلط" },
  prep: { en: "prep", ar: "تحضير" },
  cook: { en: "cook", ar: "طبخ" },
  serves: { en: "serves", ar: "يكفي" },
  ingredients: { en: "Ingredients", ar: "المكونات" },
  steps: { en: "Steps", ar: "الخطوات" },
  offline: {
    en: "AI is unavailable right now — showing saved recipes from the cookbook.",
    ar: "الذكاء غير متاح الآن — نعرض وصفات محفوظة من دفتر الطبخ.",
  },
  clear: { en: "Clear chat", ar: "مسح المحادثة" },
  settingsBody: {
    en: "Chef AI runs its cooking brain on the server, so no key ever reaches the browser. A single public HTML file could not keep it safe — anyone could read it in page source.",
    ar: "يعمل عقل الطهي في شيف الذكاء على الخادم، فلا يصل أي مفتاح إلى المتصفح. ملف HTML عام واحد لا يمكنه حماية المفتاح — يستطيع أي شخص قراءته من مصدر الصفحة.",

  },
  close: { en: "Close", ar: "إغلاق" },
  leftoverOn: {
    en: "Leftover Mode on: recipes rescue what's already cooked.",
    ar: "وضع البقايا مفعّل: وصفات تنقذ ما هو مطبوخ مسبقاً.",
  },
} as const;

export function t(key: keyof typeof T, lang: Lang): string {
  return T[key][lang];
}
