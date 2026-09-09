import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useRef, useState } from "react";

import { FALLBACK_RECIPES, pickRandom, type Lang, type Recipe } from "@/lib/chef-data";
import { T } from "@/lib/i18n";
import { askChef } from "@/lib/chef.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chef AI — Bilingual Recipe Assistant" },
      {
        name: "description",
        content:
          "Chef AI turns the ingredients you already have into real recipes, in English or Arabic, with a Leftover Mode that fights food waste.",
      },
      { property: "og:title", content: "Chef AI — Bilingual Recipe Assistant" },
      {
        property: "og:description",
        content:
          "Ask for dinner in English or Arabic. Chef AI suggests recipes from your ingredients and rescues leftovers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ChefApp,
});

type Msg = { id: string; role: "user" | "assistant"; content: string };

function ChefApp() {
  const [lang, setLang] = useState<Lang>("en");
  const [leftover, setLeftover] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [pending, setPending] = useState(false);
  const [streamed, setStreamed] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const [seed, setSeed] = useState(7);
  const run = useServerFn(askChef);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dir = lang === "ar" ? "rtl" : "ltr";

  const recipes = useMemo(() => {
    const pool = leftover ? FALLBACK_RECIPES.filter((r) => r.leftoverFriendly) : FALLBACK_RECIPES;
    return pickRandom(pool.length >= 3 ? pool : FALLBACK_RECIPES, 6, seed);
  }, [leftover, seed]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, streamed, pending]);

  async function typeOut(text: string, id: string) {
    const words = text.split(/(\s+)/);
    let acc = "";
    for (let i = 0; i < words.length; i++) {
      acc += words[i];
      setStreamed(acc);
      if (i % 3 === 0) await new Promise((r) => setTimeout(r, 18));
    }
    setStreamed("");
    setMessages((m) => [...m, { id, role: "assistant", content: text }]);
  }

  async function send(text: string) {
    const question = text.trim();
    if (!question || pending) return;
    setNotice(null);
    setInput("");
    const history: Msg[] = [
      ...messages,
      { id: `u${Date.now()}`, role: "user", content: question },
    ];
    setMessages(history);
    setPending(true);
    try {
      const result = await run({
        data: {
          messages: history.map(({ role, content }) => ({ role, content })),
          lang,
          leftoverMode: leftover,
        },
      });
      if (result.ok) {
        await typeOut(result.reply, `a${Date.now()}`);
      } else {
        setNotice(T.offline[lang]);
        const suggestion = recipes[0]!;
        await typeOut(offlineAnswer(suggestion, lang), `a${Date.now()}`);
      }
    } catch {
      setNotice(T.offline[lang]);
      await typeOut(offlineAnswer(recipes[0]!, lang), `a${Date.now()}`);
    } finally {
      setPending(false);
    }
  }

  return (
    <div dir={dir} className="min-h-screen bg-background font-body text-foreground">
      <header className="border-b border-border/70 bg-card/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
              <i className="fa-solid fa-utensils text-lg" aria-hidden="true" />
            </span>
            <div>
              <h1 className="font-display text-2xl leading-tight tracking-tight sm:text-3xl">
                {T.title[lang]}
              </h1>
              <p className="mt-0.5 max-w-md text-sm text-muted-foreground">{T.subtitle[lang]}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setLeftover((v) => !v)}
              aria-pressed={leftover}
              className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors ${
                leftover
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:bg-accent"
              }`}
            >
              <i className="fa-solid fa-box-open" aria-hidden="true" />
              {T.leftoverMode[lang]}
            </button>
            <button
              type="button"
              onClick={() => setLang((l) => (l === "en" ? "ar" : "en"))}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-sm font-medium transition-colors hover:bg-accent"
            >
              <i className="fa-solid fa-language" aria-hidden="true" />
              {T.language[lang]}
            </button>
            <button
              type="button"
              onClick={() => setShowSettings(true)}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-sm font-medium transition-colors hover:bg-accent"
            >
              <i className="fa-solid fa-sliders" aria-hidden="true" />
              {T.apiSettings[lang]}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        {leftover && (
          <p className="mb-5 flex items-center gap-2 rounded-xl bg-secondary px-4 py-3 text-sm text-secondary-foreground">
            <i className="fa-solid fa-leaf" aria-hidden="true" />
            {T.leftoverOn[lang]}
          </p>
        )}
        {notice && (
          <p className="mb-5 flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-foreground">
            <i className="fa-solid fa-circle-exclamation mt-0.5 text-destructive" aria-hidden="true" />
            {notice}
          </p>
        )}

        <div className="grid gap-6 lg:grid-cols-5">
          <section className="lg:col-span-2">
            <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
              <h2 className="font-display text-xl">{T.askTitle[lang]}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{T.askHint[lang]}</p>
              <form
                className="mt-4 space-y-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  void send(input);
                }}
              >
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  rows={3}
                  placeholder={T.placeholder[lang]}
                  className="w-full resize-none rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30"
                />
                <div className="flex flex-wrap gap-2">
                  {(lang === "en"
                    ? ["Eggs and bread", "15-minute dinner", "Use up rice"]
                    : ["بيض وخبز", "عشاء في ١٥ دقيقة", "استخدم الأرز"]
                  ).map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => void send(chip)}
                      className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
                <button
                  type="submit"
                  disabled={pending || !input.trim()}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
                >
                  <i className="fa-solid fa-wand-magic-sparkles" aria-hidden="true" />
                  {T.send[lang]}
                </button>
              </form>
            </div>
          </section>

          <section className="lg:col-span-3">
            <div className="flex h-full min-h-[26rem] flex-col rounded-3xl border border-border bg-card shadow-sm">
              <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
                <h2 className="flex items-center gap-2 font-display text-lg">
                  <i className="fa-solid fa-comments text-primary" aria-hidden="true" />
                  {T.chatTitle[lang]}
                </h2>
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setMessages([])}
                    className="text-xs text-muted-foreground underline-offset-4 hover:underline"
                  >
                    {T.clear[lang]}
                  </button>
                )}
              </div>
              <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
                {messages.length === 0 && !pending && (
                  <p className="py-10 text-center text-sm text-muted-foreground">
                    {T.chatEmpty[lang]}
                  </p>
                )}
                {messages.map((m) =>
                  m.role === "user" ? (
                    <div key={m.id} className="flex justify-end">
                      <p className="max-w-[85%] whitespace-pre-wrap rounded-2xl bg-primary px-4 py-2.5 text-sm text-primary-foreground">
                        {m.content}
                      </p>
                    </div>
                  ) : (
                    <div key={m.id} className="flex gap-3">
                      <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground">
                        <i className="fa-solid fa-utensils text-xs" aria-hidden="true" />
                      </span>
                      <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                        {m.content}
                      </div>
                    </div>
                  ),
                )}
                {(pending || streamed) && (
                  <div className="flex gap-3">
                    <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground">
                      <i className="fa-solid fa-utensils text-xs" aria-hidden="true" />
                    </span>
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {streamed || (
                        <span className="animate-pulse text-muted-foreground">
                          {T.thinking[lang]}
                        </span>
                      )}
                      {streamed && <span className="ms-0.5 animate-pulse">▍</span>}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>

        <section className="mt-10">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-2xl">{T.recipes[lang]}</h2>
            <button
              type="button"
              onClick={() => setSeed((s) => s + Math.floor(Math.random() * 97) + 3)}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-sm font-medium transition-colors hover:bg-accent"
            >
              <i className="fa-solid fa-shuffle" aria-hidden="true" />
              {T.refresh[lang]}
            </button>
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {recipes.map((r) => (
              <RecipeCard key={r.id} recipe={r} lang={lang} />
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        {lang === "en"
          ? "Chef AI · live recipe ideas, with an offline cookbook for when the network sleeps."
          : "شيف الذكاء · أفكار وصفات مباشرة، مع دفتر طبخ يعمل دون اتصال."}

      </footer>

      {showSettings && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4 backdrop-blur-sm"
          onClick={() => setShowSettings(false)}
        >
          <div
            dir={dir}
            className="w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="flex items-center gap-2 font-display text-xl">
              <i className="fa-solid fa-lock text-primary" aria-hidden="true" />
              {T.apiSettings[lang]}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {T.settingsBody[lang]}
            </p>
            <button
              type="button"
              onClick={() => setShowSettings(false)}
              className="mt-5 w-full rounded-2xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              {T.close[lang]}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function RecipeCard({ recipe, lang }: { recipe: Recipe; lang: Lang }) {
  const [open, setOpen] = useState(false);
  return (
    <article className="flex flex-col rounded-3xl border border-border bg-card p-5 shadow-sm transition hover:shadow-md">
      <div className="flex flex-wrap gap-2">
        {recipe.tags[lang].map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
      <h3 className="mt-3 font-display text-lg leading-snug">{recipe.title[lang]}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{recipe.description[lang]}</p>
      <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <i className="fa-regular fa-clock" aria-hidden="true" />
          {recipe.prepMinutes} min {T.prep[lang]}
        </div>
        <div className="flex items-center gap-1.5">
          <i className="fa-solid fa-fire-burner" aria-hidden="true" />
          {recipe.cookMinutes} min {T.cook[lang]}
        </div>
        <div className="flex items-center gap-1.5">
          <i className="fa-solid fa-user-group" aria-hidden="true" />
          {T.serves[lang]} {recipe.servings}
        </div>
      </dl>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="mt-4 inline-flex items-center gap-2 self-start text-sm font-semibold text-primary hover:underline"
      >
        <i className={`fa-solid ${open ? "fa-chevron-up" : "fa-chevron-down"}`} aria-hidden="true" />
        {open ? T.close[lang] : T.steps[lang]}
      </button>
      {open && (
        <div className="mt-4 space-y-4 border-t border-border pt-4">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {T.ingredients[lang]}
            </h4>
            <ul className="mt-2 space-y-1 text-sm">
              {recipe.ingredients[lang].map((ing) => (
                <li key={ing} className="flex gap-2">
                  <i className="fa-solid fa-circle mt-2 text-[4px] text-primary" aria-hidden="true" />
                  {ing}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {T.steps[lang]}
            </h4>
            <ol className="mt-2 space-y-2 text-sm">
              {recipe.steps[lang].map((step, i) => (
                <li key={step} className="flex gap-2.5">
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-secondary text-[11px] font-semibold text-secondary-foreground">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </article>
  );
}

function offlineAnswer(recipe: Recipe, lang: Lang): string {
  const head =
    lang === "ar"
      ? `من دفتر الطبخ المحفوظ، جرّب: ${recipe.title[lang]}\n${recipe.description[lang]}\n\nالمكونات:\n`
      : `From the saved cookbook, try: ${recipe.title[lang]}\n${recipe.description[lang]}\n\nIngredients:\n`;
  const ing = recipe.ingredients[lang].map((i) => `• ${i}`).join("\n");
  const stepsLabel = lang === "ar" ? "\n\nالخطوات:\n" : "\n\nSteps:\n";
  const steps = recipe.steps[lang].map((s, i) => `${i + 1}. ${s}`).join("\n");
  return head + ing + stepsLabel + steps;
}
