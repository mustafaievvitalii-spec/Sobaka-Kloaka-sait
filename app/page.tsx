'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform, type Variants } from 'framer-motion';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Clock3,
  FileCheck2,
  FileText,
  Globe2,
  IdCard,
  Camera,
  Landmark,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

const phone = '+380963925481';
const cleanPhone = phone.replace(/\D/g, '');
const whatsappUrl = `https://wa.me/${cleanPhone}`;
const viberUrl = `viber://chat?number=%2B${cleanPhone}`;
const instagramUrl = 'https://www.instagram.com/pro_docs_poland?igsh=MTduMWt4bjdiNXg1dg==';
const tiktokUrl = 'https://www.tiktok.com/@documentexxpert?_r=1&_t=ZS-96SubZK4WdY';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const situations = [
  ['Втрачене посвідчення водія', IdCard],
  ['Посвідчення не відображається в Дії', FileCheck2],
  ['Помилки у базі МВС', AlertTriangle],
  ['Старий зразок посвідчення', FileText],
  ['Відсутність посвідчення в реєстрі', Landmark],
  ['Відсутність фото в Дії', BadgeCheck],
  ['Відмова при замовленні посвідчення через Дію', ShieldCheck],
  ['Допомога для українців за кордоном', Globe2],
];

const timeline = [
  'Перевірка документів та ситуації клієнта',
  'Верифікація посвідчення через державні реєстри',
  'Оновлення посвідчення в Дії',
  'Замовлення нового пластикового посвідчення',
  'Отримання документів в Україні',
  'Доставка документів клієнту за кордон',
];

const documents = [
  'Фото посвідчення водія',
  'Закордонний паспорт',
  'Внутрішній паспорт / ID-карта',
  'ІПН',
  'Прописка',
  'Додаткові документи за потреби',
];

const nuances = [
  'Посвідчення до 2014 року часто відсутні в електронному реєстрі',
  'Дія може не підтягувати посвідчення автоматично',
  'Помилки у базі МВС можуть блокувати процедуру',
  'Іноді відсутня цифрова фотографія',
  'Посвідчення з окупованих територій можуть вимагати додаткової перевірки',
  'Для деяких процедур необхідна попередня верифікація посвідчення',
];

const notHelp = [
  'Виготовлення посвідчення “з нуля”',
  'Додавання нових категорій',
  'Відновлення після ст.130 КУпАП',
  'Підроблені документи',
  'Процедури, які вимагають складання іспитів в Україні',
];

const terms = [
  'Попередня перевірка документів',
  'Договір про надання послуг',
  'Часткова передплата на фірмовий рахунок компанії',
  'Фото та підтвердження результату',
  'Посвідчення оновлюється в Дії перед фінальним етапом',
  'Фінальна оплата перед відправкою документів',
  'Можливість особистого отримання документів у Польщі або Чехії',
];

const faqs = [
  ['Як ви вносите посвідчення в Дію?', 'Наш юрист подає офіційний запит до МВС з проханням провести верифікацію посвідчення водія. Після оновлення інформації посвідчення з’являється в Дії або оновлюється до нового зразка.'],
  ['Це офіційна процедура?', 'Так. Посвідчення замовляється через державний застосунок «Дія» або Кабінет водія. Ми надаємо організаційний супровід та допомагаємо з доставкою документів у Європу.'],
  ['Як я можу перевірити результат?', 'Перед фінальним етапом посвідчення оновлюється в Дії. Клієнт може самостійно перевірити інформацію у застосунку.'],
  ['Чи можу я відновити посвідчення після обміну на європейське?', 'Ні. Якщо Україна отримала інформацію про офіційний обмін посвідчення на європейське, дистанційне відновлення неможливе.'],
  ['Що робити, якщо я не можу авторизуватись у Дії?', 'Наш менеджер допоможе пройти авторизацію через банк або документи та підкаже, як правильно налаштувати Дію.'],
  ['Що робити, якщо Дія дає відмову при замовленні посвідчення?', 'У більшості випадків проблема пов’язана з помилками або відсутністю даних у реєстрі МВС. Для цього необхідно провести верифікацію посвідчення.'],
  ['Чи допомагаєте ви за відсутності прописки в Україні?', 'Так, у багатьох випадках відсутність прописки не є проблемою. Ситуація перевіряється індивідуально.'],
  ['Чи допомагаєте, якщо в Дії не підтягується фото?', 'Так. Це одна з найпоширеніших проблем. У більшості випадків її можна вирішити через верифікацію даних.'],
  ['Чи потрібно їхати в Україну?', 'У більшості випадків — ні. Процедура проходить дистанційно.'],
  ['Чи можна оплатити послугу при отриманні?', 'Так, у деяких випадках можлива фінальна оплата при особистому отриманні документів у Польщі або Чехії.'],
];

function scrollToForm() {
  document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Countdown() {
  const [seconds, setSeconds] = useState(7200);
  useEffect(() => {
    const interval = window.setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(interval);
  }, []);
  const time = useMemo(() => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  }, [seconds]);
  return (
    <div className="flex flex-col gap-2">
      <motion.div animate={{ opacity: [0.78, 1, 0.78] }} transition={{ duration: 2.2, repeat: Infinity }} className="font-mono text-4xl font-semibold tracking-[0.16em] text-white sm:text-5xl">
        {time}
      </motion.div>
      <p className="text-sm text-slate-300">{seconds === 0 ? 'Залиште заявку — менеджер перевірить доступність консультації' : 'Таймер безкоштовної перевірки ситуації'}</p>
    </div>
  );
}

function CtaButton({ href, children, variant = 'gold' }: { href?: string; children: React.ReactNode; variant?: 'gold' | 'ghost' }) {
  const className = variant === 'gold'
    ? 'bg-gradient-to-r from-[#ff2f4f] via-[#ff5b2f] to-[#f0c65a] text-white shadow-[0_20px_65px_rgba(255,47,79,.34)] hover:shadow-[0_24px_78px_rgba(255,47,79,.48)]'
    : 'border border-[#ff2f4f]/35 bg-[#ff2f4f]/10 text-white hover:border-[#f0c65a]/60 hover:bg-[#ff2f4f]/18';
  const content = <><span>{children}</span><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>;
  if (href) {
    return <a href={href} target={href.startsWith('http') || href.startsWith('viber') ? '_blank' : undefined} rel="noreferrer" className={`group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${className}`}>{content}</a>;
  }
  return <button onClick={scrollToForm} className={`group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${className}`}>{content}</button>;
}

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} className="mx-auto mb-12 max-w-3xl text-center">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#d6b36a]">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">{title}</h2>
      {text ? <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">{text}</p> : null}
    </motion.div>
  );
}

function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nextErrors: Record<string, string> = {};
    if (!String(data.get('name') || '').trim()) nextErrors.name = 'Вкажіть ім’я, щоб ми могли звернутися до вас.';
    if (!String(data.get('contact') || '').trim()) nextErrors.contact = 'Вкажіть номер телефону або месенджер для зв’язку.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
      event.currentTarget.reset();
    }
  }

  const inputClass = (field: string) => `mt-2 w-full rounded-2xl border ${errors[field] ? 'border-red-400/80 bg-red-500/10' : 'border-white/12 bg-white/[0.06]'} px-4 py-3.5 text-white outline-none transition focus:border-[#d6b36a]/70 focus:bg-white/[0.09]`;

  return (
    <motion.form onSubmit={onSubmit} className="glass gold-glow rounded-[2rem] p-6 sm:p-8" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm text-slate-200">Ім’я <span className="text-[#d6b36a]">*</span><span className="ml-2 text-xs text-slate-400">Обов’язкове поле</span><input name="name" className={inputClass('name')} placeholder="Ваше ім’я" />{errors.name && <p className="mt-2 text-xs text-red-300">{errors.name}</p>}</label>
        <label className="text-sm text-slate-200">Номер телефону / месенджер <span className="text-[#d6b36a]">*</span><span className="ml-2 text-xs text-slate-400">Обов’язкове поле</span><input name="contact" className={inputClass('contact')} placeholder="+48 / +380 або нік у месенджері" />{errors.contact && <p className="mt-2 text-xs text-red-300">{errors.contact}</p>}</label>
        <label className="text-sm text-slate-200">Країна перебування <span className="ml-2 text-xs text-slate-400">необов’язково</span><input name="country" className={inputClass('country')} placeholder="Польща, Чехія, Німеччина..." /></label>
        <label className="text-sm text-slate-200">Рік видачі посвідчення <span className="ml-2 text-xs text-slate-400">необов’язково</span><input name="year" className={inputClass('year')} placeholder="Наприклад, 2012" /></label>
        <label className="text-sm text-slate-200 sm:col-span-2">Опишіть проблему <span className="ml-2 text-xs text-slate-400">необов’язково</span><textarea name="problem" className={`${inputClass('problem')} min-h-32 resize-none`} placeholder="Що сталося з посвідченням або що показує Дія?" /></label>
      </div>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#d6b36a] px-7 py-3.5 text-sm font-semibold text-[#07111f] transition hover:-translate-y-0.5 hover:bg-[#e7c881]" type="submit">Надіслати заявку <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></button>
        <p className="text-sm leading-6 text-slate-400">Ми використовуємо дані лише для первинного зв’язку та перевірки ситуації.</p>
      </div>
      <AnimatePresence>{submitted && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-5 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm text-emerald-100">Дякуємо, ми зв’яжемося з вами найближчим часом.</motion.div>}</AnimatePresence>
    </motion.form>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return <div className="mx-auto max-w-4xl space-y-3">{faqs.map(([q, a], index) => <motion.div key={q} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="glass overflow-hidden rounded-3xl"><button onClick={() => setOpen(open === index ? -1 : index)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-semibold text-white"><span>{q}</span><ChevronDown className={`h-5 w-5 text-[#d6b36a] transition ${open === index ? 'rotate-180' : ''}`} /></button><AnimatePresence initial={false}>{open === index && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.32 }}><p className="px-6 pb-6 leading-8 text-slate-300">{a}</p></motion.div>}</AnimatePresence></motion.div>)}</div>;
}

export default function Home() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 120]);
  const cardY = useTransform(scrollY, [0, 700], [0, -65]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#08090d] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(255,47,79,.3),transparent_30%),radial-gradient(circle_at_82%_5%,rgba(240,198,90,.2),transparent_26%),radial-gradient(circle_at_54%_42%,rgba(255,91,47,.13),transparent_32%),linear-gradient(180deg,#08090d_0%,#111019_42%,#07080c_100%)]" />
      <div className="pointer-events-none fixed inset-0 bg-grid opacity-50" />

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#ff2f4f]/25 bg-[#07080c]/82 shadow-[0_18px_70px_rgba(0,0,0,.45)] backdrop-blur-2xl">
        <div className="h-1 bg-gradient-to-r from-[#ff2f4f] via-[#f0c65a] to-[#ff2f4f]" />
        <div className="section-shell flex min-h-20 items-center justify-between gap-4 py-3">
          <a href="#top" className="group flex items-center gap-3" aria-label="DocExpert">
            <span className="flex h-12 w-12 rotate-[-6deg] items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff2f4f] to-[#f0c65a] text-white shadow-[0_14px_45px_rgba(255,47,79,.35)] transition group-hover:rotate-0"><FileCheck2 className="h-6 w-6" /></span>
            <span><span className="block text-xl font-black uppercase tracking-[-0.04em]">DocExpert</span><span className="hidden text-[10px] font-bold uppercase tracking-[0.28em] text-[#ffb1bd] sm:block">Driver License Recovery</span></span>
          </a>
          <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] p-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-200 lg:flex">
            <a className="premium-link rounded-full px-4 py-2 hover:text-white" href="#services">Послуги</a><a className="premium-link rounded-full px-4 py-2 hover:text-white" href="#pricing">Вартість</a><a className="premium-link rounded-full px-4 py-2 hover:text-white" href="#process">Процедура</a><a className="premium-link rounded-full px-4 py-2 hover:text-white" href="#faq">FAQ</a><a className="premium-link rounded-full px-4 py-2 hover:text-white" href="#contacts">Контакти</a>
          </nav>
          <div className="hidden items-center gap-2 xl:flex"><SocialIconLinks /><CtaButton href={viberUrl} variant="ghost">Viber</CtaButton><CtaButton href={whatsappUrl}>WhatsApp</CtaButton></div>
          <div className="flex items-center gap-2 xl:hidden"><SocialIconLinks compact /><CtaButton href={whatsappUrl}>WhatsApp</CtaButton></div>
        </div>
      </header>

      <section id="top" className="relative min-h-screen pt-32 sm:pt-40">
        <motion.div style={{ y: heroY }} className="absolute left-1/2 top-28 h-80 w-80 -translate-x-1/2 rounded-full bg-[#ff2f4f]/30 blur-3xl" />
        <div className="section-shell grid items-center gap-12 pb-20 lg:grid-cols-[1.05fr_.95fr]">
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative z-10">
            <motion.div variants={fadeUp} className="mb-4 flex flex-wrap items-center gap-3"><span className="inline-flex items-center gap-2 rounded-full border border-[#ff2f4f]/40 bg-[#ff2f4f]/13 px-4 py-2 text-sm font-bold uppercase tracking-[0.12em] text-[#ffd7dd]"><Sparkles className="h-4 w-4" /> Юридичний супровід для українців за кордоном</span><span className="inline-flex items-center gap-2 rounded-full border border-[#f0c65a]/35 bg-[#f0c65a]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#f0c65a]">Соцмережі <SocialIconLinks compact /></span></motion.div>
            <motion.h1 variants={fadeUp} className="impact-title max-w-4xl text-5xl font-black uppercase tracking-[-0.07em] text-white sm:text-7xl lg:text-8xl">Відновлення посвідчення водія дистанційно</motion.h1>
            <motion.p variants={fadeUp} className="mt-5 text-2xl font-black uppercase tracking-[0.12em] text-[#ff4863]">Для українців за кордоном</motion.p>
            <motion.p variants={fadeUp} className="mt-6 max-w-2xl border-l-4 border-[#ff2f4f] pl-5 text-lg font-medium leading-8 text-slate-200">Допомагаємо внести посвідчення в Дію, перевипустити пластикове посвідчення та виправити помилки в базі МВС без необхідності приїжджати в Україну.</motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row"><CtaButton href={viberUrl}>Написати у Viber</CtaButton><CtaButton href={whatsappUrl} variant="ghost">Написати у WhatsApp</CtaButton><CtaButton>Отримати консультацію</CtaButton></motion.div>
            <motion.div variants={fadeUp} className="mt-6 flex flex-col gap-3 rounded-3xl border border-[#ff2f4f]/30 bg-black/25 p-4 shadow-[0_18px_60px_rgba(255,47,79,.12)] backdrop-blur sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-black uppercase tracking-[0.26em] text-[#f0c65a]">Ми в соцмережах</p><p className="mt-1 text-sm text-slate-300">Кейси, пояснення процедур та швидкі оновлення DocExpert</p></div><div className="flex flex-wrap gap-2"><SocialLinks /><CtaButton href={instagramUrl} variant="ghost">Переглянути соцмережі</CtaButton></div></motion.div>
            <motion.div variants={stagger} className="mt-10 grid gap-3 sm:grid-cols-2">{['Офіційна процедура', 'Робота через державні реєстри', 'Супровід клієнтів по Європі', 'Договір про надання послуг'].map((item) => <motion.div variants={fadeUp} key={item} className="glass aggressive-panel rounded-2xl px-4 py-3 text-sm font-semibold text-slate-100"><Check className="mr-2 inline h-4 w-4 text-[#d6b36a]" />{item}</motion.div>)}</motion.div>
          </motion.div>
          <motion.div style={{ y: cardY }} className="relative z-10 hidden lg:block">
            <div className="glass gold-glow aggressive-panel relative rounded-[2.5rem] p-8">
              <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[#ff2f4f]/30 blur-2xl" />
              <div className="rounded-[2rem] border border-[#ff2f4f]/20 bg-[#09090f]/92 p-7">
                <div className="mb-7 flex items-center justify-between"><div><p className="text-sm text-slate-400">Case review</p><h3 className="text-2xl font-semibold">DocExpert Legal Desk</h3></div><ShieldCheck className="h-10 w-10 text-[#ff2f4f]" /></div>
                {['Первинний аналіз документів', 'Запит / верифікація даних', 'Оновлення в Дії', 'Доставка по Європі'].map((item, i) => <motion.div key={item} animate={{ x: [0, i % 2 ? -4 : 4, 0] }} transition={{ duration: 4 + i, repeat: Infinity }} className="mb-4 rounded-2xl border border-[#ff2f4f]/18 bg-white/[0.055] p-4"><span className="text-xs text-[#d6b36a]">0{i + 1}</span><p className="mt-1 text-slate-100">{item}</p></motion.div>)}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 pb-24">
        <div className="section-shell"><motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="glass gold-glow grid gap-8 rounded-[2rem] p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center"><div><span className="mb-4 inline-flex rounded-full border border-[#d6b36a]/30 bg-[#d6b36a]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#f1d99b]">Лише 10 місць</span><h2 className="text-3xl font-semibold sm:text-4xl">Безкоштовна перевірка ситуації для перших 10 заявок</h2><p className="mt-4 max-w-3xl leading-8 text-slate-300">Залиште заявку сьогодні — ми безкоштовно перевіримо вашу ситуацію та підкажемо, чи можливо відновити або перевипустити посвідчення дистанційно.</p><p className="mt-3 text-sm text-slate-400">Кількість безкоштовних перевірок обмежена через індивідуальний аналіз кожної ситуації.</p></div><div className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-[#07111f]/70 p-6"><Countdown /><button onClick={scrollToForm} className="rounded-full bg-white px-6 py-3 font-semibold text-[#07111f] transition hover:-translate-y-0.5 hover:bg-[#d6b36a]">Залишити заявку</button></div></motion.div></div>
      </section>

      <section id="services" className="relative z-10 py-20"><div className="section-shell"><SectionTitle eyebrow="Ситуації" title="З якими ситуаціями ми допомагаємо" text="Працюємо з типовими та складними кейсами, де потрібні перевірка даних, верифікація та акуратна комунікація з реєстрами." /><motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{situations.map(([text, Icon]) => <motion.div variants={fadeUp} whileHover={{ y: -8 }} key={text as string} className="glass rounded-3xl p-5 transition hover:border-[#d6b36a]/35"><Icon className="mb-5 h-8 w-8 text-[#d6b36a]" /><p className="font-medium leading-7 text-white">{text as string}</p></motion.div>)}</motion.div></div></section>

      <section id="pricing" className="relative z-10 py-20"><div className="section-shell"><SectionTitle eyebrow="Вартість та терміни" title="Прозорі пакети супроводу" text="Кожна ситуація попередньо аналізується індивідуально." /><div className="grid gap-6 lg:grid-cols-2">{[['Верифікація посвідчення', '200€', ['Оновлення інформації в державних реєстрах', 'Внесення посвідчення в Дію', 'Термін виконання: до 1 місяця']], ['Перевипуск пластикового посвідчення', '300€', ['Замовлення нового посвідчення', 'Отримання документів в Україні', 'Доставка в Європу', 'Термін виконання: до 3-х тижнів']]].map(([title, price, items]) => <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} whileHover={{ y: -8 }} key={title as string} className="glass gold-glow rounded-[2rem] p-8"><div className="flex items-start justify-between gap-4"><h3 className="text-2xl font-semibold">{title as string}</h3><span className="text-4xl font-semibold text-[#d6b36a]">{price as string}</span></div><ul className="mt-8 space-y-4">{(items as string[]).map((item) => <li key={item} className="flex gap-3 text-slate-300"><Check className="mt-1 h-5 w-5 shrink-0 text-[#d6b36a]" />{item}</li>)}</ul><div className="mt-8"><CtaButton>Обрати супровід</CtaButton></div></motion.div>)}</div></div></section>

      <section id="process" className="relative z-10 py-20"><div className="section-shell"><SectionTitle eyebrow="Процедура" title="Як проходить процедура" /><div className="relative mx-auto max-w-4xl"><div className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-[#d6b36a] via-white/20 to-transparent sm:block" />{timeline.map((step, i) => <motion.div key={step} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="relative mb-5 sm:pl-16"><div className="glass rounded-3xl p-5"><span className="absolute left-0 top-5 hidden h-10 w-10 items-center justify-center rounded-full bg-[#d6b36a] font-semibold text-[#07111f] sm:flex">{i + 1}</span><p className="text-lg font-medium text-white">{step}</p></div></motion.div>)}</div></div></section>

      <section className="relative z-10 py-20"><div className="section-shell grid gap-6 lg:grid-cols-2"><InfoList eyebrow="Документи" title="Необхідні документи" items={documents} icon={<FileText />} /><InfoList eyebrow="Нюанси" title="Важливі нюанси" items={nuances} icon={<Clock3 />} /></div></section>

      <section className="relative z-10 py-20"><div className="section-shell grid gap-6 lg:grid-cols-[.85fr_1.15fr]"><motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="rounded-[2rem] border border-red-300/20 bg-red-500/10 p-7"><AlertTriangle className="mb-5 h-10 w-10 text-red-200" /><h2 className="text-3xl font-semibold">У яких випадках ми НЕ допомагаємо</h2><ul className="mt-7 space-y-4">{notHelp.map((item) => <li className="flex gap-3 text-red-50/85" key={item}><AlertTriangle className="mt-1 h-4 w-4 shrink-0" />{item}</li>)}</ul></motion.div><InfoList eyebrow="Оплата" title="Умови співпраці та оплата" items={terms} icon={<BriefcaseBusiness />} /></div></section>

      <section id="faq" className="relative z-10 py-20"><div className="section-shell"><SectionTitle eyebrow="FAQ" title="Поширені запитання" text="Зібрали відповіді на питання, які найчастіше виникають перед початком дистанційної процедури." /><Faq /></div></section>

      <section className="relative z-10 py-20"><div className="section-shell"><motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="glass grid gap-8 rounded-[2rem] p-8 lg:grid-cols-[1fr_auto]"><div><p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#d6b36a]">Про нас</p><h2 className="text-3xl font-semibold sm:text-5xl">DocExpert</h2><p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">Спеціалізуємось на дистанційному супроводі процедур, пов’язаних з посвідченнями водія для українців за кордоном.</p><div className="mt-7 flex flex-wrap gap-3"><SocialLinks /><CtaButton href={instagramUrl} variant="ghost">Переглянути наші соцмережі</CtaButton></div></div><div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6"><p className="text-sm text-slate-400">Контактна особа</p><p className="mt-2 text-2xl font-semibold">Віталій</p><a className="mt-4 flex items-center gap-2 text-[#d6b36a]" href={`tel:${phone}`}><Phone className="h-4 w-4" /> {phone}</a></div></motion.div></div></section>

      <section id="contacts" className="relative z-10 py-20"><div className="section-shell grid gap-8 lg:grid-cols-[.9fr_1.1fr]"><motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}><p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#d6b36a]">Фінальна консультація</p><h2 className="text-4xl font-semibold sm:text-6xl">Потрібна перевірка вашої ситуації?</h2><p className="mt-6 text-lg leading-8 text-slate-300">Перед початком роботи ми перевіримо документи та підкажемо, чи можливо відновити або перевипустити посвідчення дистанційно.</p><div className="mt-8 space-y-3 text-slate-200"><p><Phone className="mr-2 inline h-5 w-5 text-[#d6b36a]" />{phone}</p><p><MessageCircle className="mr-2 inline h-5 w-5 text-[#d6b36a]" />Віталій · Viber / WhatsApp</p></div><div className="mt-8 flex flex-wrap gap-3"><CtaButton>Отримати консультацію</CtaButton><CtaButton href={whatsappUrl} variant="ghost">WhatsApp</CtaButton><CtaButton href={viberUrl} variant="ghost">Viber</CtaButton></div></motion.div><div id="lead-form" className="scroll-mt-28"><LeadForm /></div></div></section>

      <footer className="relative z-10 border-t border-white/10 py-10"><div className="section-shell flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-lg font-semibold">DocExpert</p><p className="mt-2 text-sm text-slate-400">Дистанційний супровід процедур з посвідченнями водія.</p></div><div className="flex flex-wrap items-center gap-3"><SocialLinks /><a className="premium-link text-sm text-slate-300" href={`tel:${phone}`}>{phone}</a></div></div></footer>

      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3"><a href={whatsappUrl} target="_blank" rel="noreferrer" className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_12px_40px_rgba(16,185,129,.35)] transition hover:-translate-y-1" aria-label="Написати у WhatsApp"><MessageCircle /></a><a href={viberUrl} target="_blank" rel="noreferrer" className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-white shadow-[0_12px_40px_rgba(124,58,237,.35)] transition hover:-translate-y-1" aria-label="Написати у Viber"><Phone /></a></div>
    </main>
  );
}

function InfoList({ eyebrow, title, items, icon }: { eyebrow: string; title: string; items: string[]; icon: React.ReactNode }) {
  return <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="glass rounded-[2rem] p-7"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d6b36a]/15 text-[#d6b36a]">{icon}</div><p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#d6b36a]">{eyebrow}</p><h2 className="text-3xl font-semibold">{title}</h2><ul className="mt-7 grid gap-4">{items.map((item) => <li className="flex gap-3 leading-7 text-slate-300" key={item}><Check className="mt-1 h-5 w-5 shrink-0 text-[#d6b36a]" />{item}</li>)}</ul></motion.div>;
}

function SocialIconLinks({ compact = false }: { compact?: boolean }) {
  const size = compact ? 'h-10 w-10' : 'h-11 w-11';
  return <>
    <a href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram DocExpert" className={`${size} inline-flex items-center justify-center rounded-full border border-[#ff2f4f]/30 bg-[#ff2f4f]/12 text-white transition hover:-translate-y-0.5 hover:border-[#f0c65a]/70 hover:bg-[#ff2f4f]/25 hover:text-[#f0c65a]`}><Camera className="h-4 w-4" /></a>
    <a href={tiktokUrl} target="_blank" rel="noreferrer" aria-label="TikTok DocExpert" className={`${size} inline-flex items-center justify-center rounded-full border border-[#ff2f4f]/30 bg-[#ff2f4f]/12 text-white transition hover:-translate-y-0.5 hover:border-[#f0c65a]/70 hover:bg-[#ff2f4f]/25 hover:text-[#f0c65a]`}><Activity className="h-4 w-4" /></a>
  </>;
}

function SocialLinks() {
  return <><a href={instagramUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-slate-100 transition hover:border-[#d6b36a]/50 hover:text-[#d6b36a]"><Camera className="h-4 w-4" /> Instagram</a><a href={tiktokUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-slate-100 transition hover:border-[#d6b36a]/50 hover:text-[#d6b36a]"><Activity className="h-4 w-4" /> TikTok</a></>;
}
