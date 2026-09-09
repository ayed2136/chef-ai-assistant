export type Lang = "en" | "ar";

export type Category = "food" | "sweet" | "drink";

export type Recipe = {
  id: string;
  category?: Category;
  title: Record<Lang, string>;
  description: Record<Lang, string>;
  prepMinutes: number;
  cookMinutes: number;
  servings: number;
  tags: Record<Lang, string[]>;
  ingredients: Record<Lang, string[]>;
  steps: Record<Lang, string[]>;
  leftoverFriendly: boolean;
};


export const FALLBACK_RECIPES: Recipe[] = [
  {
    id: "shakshuka",
    title: { en: "Weeknight Shakshuka", ar: "شكشوكة سريعة" },
    description: {
      en: "Eggs poached in a smoky tomato and pepper sauce. One pan, ten minutes of work.",
      ar: "بيض مسلوق في صلصة طماطم وفلفل مدخّنة. مقلاة واحدة وعشر دقائق عمل.",
    },
    prepMinutes: 10,
    cookMinutes: 20,
    servings: 3,
    tags: { en: ["Vegetarian", "One pan"], ar: ["نباتي", "مقلاة واحدة"] },
    ingredients: {
      en: [
        "2 tbsp olive oil",
        "1 onion, sliced",
        "1 red pepper, sliced",
        "3 garlic cloves, minced",
        "1 tsp cumin, 1 tsp paprika",
        "400g canned tomatoes",
        "4 eggs",
        "Parsley, salt, pepper",
      ],
      ar: [
        "٢ ملعقة زيت زيتون",
        "بصلة مقطعة شرائح",
        "فلفل أحمر مقطع",
        "٣ فصوص ثوم مفرومة",
        "ملعقة كمون وملعقة بابريكا",
        "٤٠٠ غرام طماطم معلبة",
        "٤ بيضات",
        "بقدونس، ملح، فلفل",
      ],
    },
    steps: {
      en: [
        "Soften the onion and pepper in olive oil for 8 minutes.",
        "Add garlic and spices, stir for 1 minute.",
        "Pour in tomatoes, simmer 8 minutes until thick.",
        "Make wells, crack in the eggs, cover and cook 5–7 minutes.",
        "Finish with parsley and serve with bread.",
      ],
      ar: [
        "اقلِ البصل والفلفل في زيت الزيتون ٨ دقائق.",
        "أضف الثوم والبهارات وحرّك دقيقة واحدة.",
        "أضف الطماطم واتركها تغلي ٨ دقائق حتى تثخن.",
        "اصنع حفراً واكسر البيض فيها، غطِّ واطبخ ٥-٧ دقائق.",
        "زيّن بالبقدونس وقدّمه مع الخبز.",
      ],
    },
    leftoverFriendly: false,
  },
  {
    id: "fried-rice",
    title: { en: "Leftover Rice Stir-Fry", ar: "أرز مقلي من البقايا" },
    description: {
      en: "Yesterday's rice turns crisp and golden with whatever vegetables you have.",
      ar: "أرز الأمس يصبح ذهبياً ومقرمشاً مع أي خضار متوفرة لديك.",
    },
    prepMinutes: 8,
    cookMinutes: 12,
    servings: 2,
    tags: { en: ["Leftovers", "Fast"], ar: ["بقايا", "سريع"] },
    ingredients: {
      en: [
        "3 cups cold cooked rice",
        "2 eggs, beaten",
        "1 cup mixed vegetables",
        "2 spring onions",
        "2 tbsp soy sauce",
        "1 tsp sesame oil",
        "Any leftover cooked meat",
      ],
      ar: [
        "٣ أكواب أرز مطبوخ بارد",
        "بيضتان مخفوقتان",
        "كوب خضار مشكلة",
        "بصل أخضر",
        "٢ ملعقة صلصة صويا",
        "ملعقة زيت سمسم",
        "أي لحم مطبوخ متبقٍ",
      ],
    },
    steps: {
      en: [
        "Heat a wide pan very hot with a little oil.",
        "Scramble the eggs quickly and set aside.",
        "Fry vegetables 3 minutes, add rice and press flat to crisp.",
        "Toss with soy sauce, eggs and any leftover meat.",
        "Finish with sesame oil and spring onions.",
      ],
      ar: [
        "سخّن مقلاة واسعة جداً مع قليل من الزيت.",
        "اقلِ البيض سريعاً ثم ارفعه جانباً.",
        "اقلِ الخضار ٣ دقائق، أضف الأرز واضغطه ليقرمش.",
        "قلّب مع الصويا والبيض وأي لحم متبقٍ.",
        "أضف زيت السمسم والبصل الأخضر.",
      ],
    },
    leftoverFriendly: true,
  },
  {
    id: "lentil-soup",
    title: { en: "Golden Lentil Soup", ar: "شوربة عدس ذهبية" },
    description: {
      en: "Creamy red lentils with cumin and lemon. Pantry food at its best.",
      ar: "عدس أحمر كريمي مع الكمون والليمون. أفضل ما في المؤن.",
    },
    prepMinutes: 5,
    cookMinutes: 25,
    servings: 4,
    tags: { en: ["Vegan", "Pantry"], ar: ["نباتي صرف", "مؤن"] },
    ingredients: {
      en: [
        "1 cup red lentils, rinsed",
        "1 onion, chopped",
        "1 carrot, chopped",
        "1 tsp cumin, 1/2 tsp turmeric",
        "5 cups water or stock",
        "Juice of 1 lemon",
        "Olive oil, salt",
      ],
      ar: [
        "كوب عدس أحمر مغسول",
        "بصلة مفرومة",
        "جزرة مفرومة",
        "ملعقة كمون ونصف ملعقة كركم",
        "٥ أكواب ماء أو مرق",
        "عصير ليمونة",
        "زيت زيتون وملح",
      ],
    },
    steps: {
      en: [
        "Cook onion and carrot in oil until soft.",
        "Add spices, lentils and water; simmer 20 minutes.",
        "Blend until smooth, thin with water if needed.",
        "Season well and finish with lemon juice.",
      ],
      ar: [
        "اطبخ البصل والجزر في الزيت حتى يطريا.",
        "أضف البهارات والعدس والماء واتركه ٢٠ دقيقة.",
        "اخلطه حتى النعومة وخفّفه بالماء إذا لزم.",
        "تبّله جيداً وأضف عصير الليمون.",
      ],
    },
    leftoverFriendly: false,
  },
  {
    id: "bread-pudding",
    title: { en: "Stale Bread Pudding", ar: "حلوى الخبز القديم" },
    description: {
      en: "Dry bread, milk, eggs and sugar become a warm custard dessert.",
      ar: "خبز ناشف وحليب وبيض وسكر يتحولون إلى حلوى كاسترد دافئة.",
    },
    prepMinutes: 10,
    cookMinutes: 35,
    servings: 6,
    tags: { en: ["Leftovers", "Dessert"], ar: ["بقايا", "حلويات"] },
    ingredients: {
      en: [
        "5 cups stale bread cubes",
        "2 cups milk",
        "3 eggs",
        "1/2 cup sugar",
        "1 tsp vanilla, pinch cinnamon",
        "Handful raisins or nuts",
      ],
      ar: [
        "٥ أكواب مكعبات خبز ناشف",
        "كوبان حليب",
        "٣ بيضات",
        "نصف كوب سكر",
        "فانيلا ورشة قرفة",
        "حفنة زبيب أو مكسرات",
      ],
    },
    steps: {
      en: [
        "Whisk milk, eggs, sugar, vanilla and cinnamon.",
        "Pour over bread and soak 15 minutes.",
        "Bake at 180°C for 35 minutes until set and golden.",
        "Rest 10 minutes before serving.",
      ],
      ar: [
        "اخفق الحليب والبيض والسكر والفانيلا والقرفة.",
        "اسكبه على الخبز واتركه ينقع ١٥ دقيقة.",
        "اخبزه على ١٨٠ درجة لمدة ٣٥ دقيقة حتى يتماسك.",
        "اتركه ١٠ دقائق قبل التقديم.",
      ],
    },
    leftoverFriendly: true,
  },
  {
    id: "chicken-traybake",
    title: { en: "Lemon Garlic Chicken Tray", ar: "صينية دجاج بالليمون والثوم" },
    description: {
      en: "Chicken thighs roasted over potatoes until the skin crackles.",
      ar: "أفخاذ دجاج محمّرة فوق البطاطا حتى يقرمش الجلد.",
    },
    prepMinutes: 15,
    cookMinutes: 45,
    servings: 4,
    tags: { en: ["Oven", "Family"], ar: ["فرن", "عائلي"] },
    ingredients: {
      en: [
        "6 chicken thighs",
        "700g potatoes, wedged",
        "1 lemon, sliced",
        "6 garlic cloves",
        "2 tbsp olive oil",
        "Oregano, salt, pepper",
      ],
      ar: [
        "٦ أفخاذ دجاج",
        "٧٠٠ غرام بطاطا مقطعة",
        "ليمونة مقطعة شرائح",
        "٦ فصوص ثوم",
        "٢ ملعقة زيت زيتون",
        "زعتر بري، ملح، فلفل",
      ],
    },
    steps: {
      en: [
        "Toss potatoes with oil, garlic and oregano in a tray.",
        "Season chicken and lay it skin-up on top.",
        "Roast at 200°C for 45 minutes.",
        "Add lemon slices for the last 10 minutes.",
      ],
      ar: [
        "قلّب البطاطا مع الزيت والثوم والزعتر في صينية.",
        "تبّل الدجاج وضعه فوقها والجلد للأعلى.",
        "اشوِه على ٢٠٠ درجة لمدة ٤٥ دقيقة.",
        "أضف شرائح الليمون في آخر ١٠ دقائق.",
      ],
    },
    leftoverFriendly: false,
  },
  {
    id: "veg-frittata",
    title: { en: "Fridge-Clearing Frittata", ar: "فريتاتا بقايا الثلاجة" },
    description: {
      en: "Whatever vegetables are wilting, bound together with eggs and cheese.",
      ar: "أي خضار على وشك الذبول، مجموعة معاً بالبيض والجبن.",
    },
    prepMinutes: 10,
    cookMinutes: 20,
    servings: 4,
    tags: { en: ["Leftovers", "Vegetarian"], ar: ["بقايا", "نباتي"] },
    ingredients: {
      en: [
        "8 eggs",
        "2 cups chopped leftover vegetables",
        "1/2 cup grated cheese",
        "2 tbsp milk or cream",
        "Butter or oil",
        "Salt, pepper, herbs",
      ],
      ar: [
        "٨ بيضات",
        "كوبان خضار متبقية مقطعة",
        "نصف كوب جبن مبشور",
        "٢ ملعقة حليب أو كريمة",
        "زبدة أو زيت",
        "ملح وفلفل وأعشاب",
      ],
    },
    steps: {
      en: [
        "Warm the vegetables in an oven-safe pan.",
        "Beat eggs with milk, cheese and seasoning.",
        "Pour over, cook 4 minutes on the stove.",
        "Finish under the grill for 6 minutes until puffed.",
      ],
      ar: [
        "سخّن الخضار في مقلاة تصلح للفرن.",
        "اخفق البيض مع الحليب والجبن والتوابل.",
        "اسكبه فوقها واطبخه ٤ دقائق على النار.",
        "أكمله تحت الشواية ٦ دقائق حتى ينتفخ.",
      ],
    },
    leftoverFriendly: true,
  },
];

export function pickRandom(recipes: Recipe[], count: number, seed: number): Recipe[] {
  const pool = [...recipes];
  const out: Recipe[] = [];
  let s = seed || 1;
  while (pool.length && out.length < count) {
    s = (s * 1103515245 + 12345) % 2147483648;
    const idx = Math.abs(s) % pool.length;
    out.push(pool.splice(idx, 1)[0]!);
  }
  return out;
}
