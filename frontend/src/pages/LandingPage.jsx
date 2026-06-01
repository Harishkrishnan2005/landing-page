import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowUp,
  Building2,
  CheckCircle2,
  Clock3,
  Factory,
  Handshake,
  Mail,
  MapPin,
  Menu,
  Phone,
  Quote,
  ShieldCheck,
  Sparkles,
  Truck,
  Users2,
  X,
} from 'lucide-react'
import { toast } from 'react-toastify'
import api from '../lib/api'
import LoadingScreen from '../components/shared/LoadingScreen'

const businessEmail = import.meta.env.VITE_BUSINESS_EMAIL || 'partnerships@vertexwholesale.com'
const businessPhone = import.meta.env.VITE_BUSINESS_PHONE || '+919876543210'

const navLinks = [
  ['home', 'Home'],
  ['about', 'About'],
  ['why-us', 'Why Choose Us'],
  ['testimonials', 'Testimonials'],
  ['contact', 'Contact'],
  ['appointment', 'Appointment Booking'],
]

const whyUs = [
  {
    title: 'Experience',
    icon: Factory,
    text: 'Strong sourcing and distribution knowledge across wholesale supply chains.',
  },
  {
    title: 'Trusted Service',
    icon: Handshake,
    text: 'Dependable coordination between manufacturers and neighborhood vendors.',
  },
  {
    title: 'Professional Team',
    icon: Users2,
    text: 'Commercial, operations, and relationship teams aligned around service quality.',
  },
  {
    title: 'Quality Assurance',
    icon: ShieldCheck,
    text: 'Structured vendor handling, clear communication, and consistent delivery standards.',
  },
  {
    title: 'Fast Response',
    icon: Truck,
    text: 'Lean workflow built for quick follow-up, dispatch coordination, and appointment turnaround.',
  },
  {
    title: 'Customer Satisfaction',
    icon: CheckCircle2,
    text: 'Business relationships grow because we focus on reliability and practical support.',
  },
]

const testimonials = [
  {
    name: 'Anita Rao',
    company: 'Metro Retail Hub',
    quote:
      'Their team simplified procurement handoffs and made our local distribution much more predictable.',
  },
  {
    name: 'Rakesh Nair',
    company: 'Prime Vendor Network',
    quote:
      'Professional communication, fast updates, and a service-first approach we can rely on.',
  },
  {
    name: 'Sonia Verma',
    company: 'Urban Supply Partners',
    quote:
      'Vertex feels like an extension of our own operations team, not just another intermediary.',
  },
]

const gallery = [1, 2, 3, 4, 5, 6]

const stats = [
  ['Years Experience', 18],
  ['Happy Clients', 240],
  ['Projects Completed', 520],
  ['Business Partners', 68],
]

const appointmentTimeSlots = [
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '01:00 PM',
  '01:30 PM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '03:30 PM',
  '04:00 PM',
  '04:30 PM',
  '05:00 PM',
  '05:30 PM',
  '06:00 PM',
  '06:30 PM',
  '07:00 PM',
]

const initialAppointment = {
  name: '',
  phone: '',
  email: '',
  appointmentDate: '',
  appointmentTime: '',
  message: '',
}

const initialContact = {
  name: '',
  phone: '',
  email: '',
  message: '',
}

const buildWhatsAppLink = (payload) => {
  const normalizedPhone = businessPhone.replace(/\D/g, '')
  const message = [
    'New appointment request',
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email}`,
    `Date: ${payload.appointmentDate}`,
    `Time: ${payload.appointmentTime}`,
    `Requirement: ${payload.message}`,
  ].join('\n')

  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`
}

const buildMailtoLink = (payload) => {
  const subject = `New contact request from ${payload.name}`
  const body = [
    'A new contact request was submitted.',
    '',
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email}`,
    `Message: ${payload.message}`,
  ].join('\n')

  return `mailto:${businessEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

function AnimatedCounter({ label, value }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let frame
    let current = 0
    const step = Math.max(1, Math.ceil(value / 40))

    const tick = () => {
      current = Math.min(value, current + step)
      setCount(current)
      if (current < value) {
        frame = window.setTimeout(tick, 40)
      }
    }

    tick()
    return () => window.clearTimeout(frame)
  }, [value])

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_25px_80px_rgba(15,23,42,0.08)]">
      <p className="font-display text-4xl text-slate-950">{count}+</p>
      <p className="mt-2 text-sm uppercase tracking-[0.25em] text-slate-500">{label}</p>
    </div>
  )
}

function LandingPage() {
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [appointment, setAppointment] = useState(initialAppointment)
  const [contact, setContact] = useState(initialContact)
  const [submitting, setSubmitting] = useState({ appointment: false, contact: false })

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1200)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 },
    )

    navLinks.forEach(([id]) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [loading])

  const year = useMemo(() => new Date().getFullYear(), [])

  const scrollToSection = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleChange = (setter) => (event) => {
    const { name, value } = event.target
    setter((previous) => ({ ...previous, [name]: value }))
  }

  const handleSubmit = async (type) => {
    const payload = type === 'appointment' ? appointment : contact
    const setter = type === 'appointment' ? setAppointment : setContact
    const url = type === 'appointment' ? '/appointments' : '/contacts'

    try {
      setSubmitting((previous) => ({ ...previous, [type]: true }))
      await api.post(url, payload)
      toast.success(
        type === 'appointment'
          ? 'Appointment request submitted successfully.'
          : 'Contact request submitted successfully.',
      )
      const redirectUrl =
        type === 'appointment' ? buildWhatsAppLink(payload) : buildMailtoLink(payload)
      setter(type === 'appointment' ? initialAppointment : initialContact)
      window.location.href = redirectUrl
    } catch (error) {
      toast.error(error.message)
    } finally {
      setSubmitting((previous) => ({ ...previous, [type]: false }))
    }
  }

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <div className="overflow-x-hidden bg-stone-50 text-slate-700">
      <header className="sticky top-0 z-50 border-b border-white/20 bg-slate-950/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-3 sm:px-4 sm:py-4">
          <button
            type="button"
            onClick={() => scrollToSection('home')}
            className="flex min-w-0 items-center gap-2 sm:gap-3"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-400 font-display text-lg text-slate-950 sm:h-12 sm:w-12 sm:text-xl">
              VW
            </div>
            <div className="min-w-0 text-left">
              <p className="font-display text-base text-white sm:text-lg">Vertex Wholesale</p>
              <p className="hidden text-xs uppercase tracking-[0.25em] text-slate-400 sm:block">
                Distribution Partners
              </p>
            </div>
          </button>
          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollToSection(id)}
                className={`text-sm transition ${
                  activeSection === id ? 'text-amber-300' : 'text-slate-300 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => scrollToSection('appointment')}
              className="rounded-full bg-amber-400 px-4 py-2.5 text-xs font-semibold text-slate-950 transition hover:bg-amber-300 sm:px-5 sm:py-3 sm:text-sm"
            >
              <span className="sm:hidden">Book</span>
              <span className="hidden sm:inline">Book Appointment</span>
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((previous) => !previous)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white sm:h-11 sm:w-11 lg:hidden"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        {menuOpen ? (
          <div className="border-t border-white/10 px-3 py-3 sm:px-4 sm:py-4 lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-3">
              {navLinks.map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => scrollToSection(id)}
                  className="rounded-2xl border border-white/10 px-4 py-3 text-left text-sm text-slate-200"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </header>

      <main>
        <section id="home" className="relative overflow-hidden bg-slate-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.24),_transparent_32%),radial-gradient(circle_at_80%_25%,_rgba(14,165,233,0.18),_transparent_25%),linear-gradient(135deg,_rgba(15,23,42,0.97),_rgba(2,6,23,1))]" />
          <div className="relative mx-auto grid min-h-[88vh] max-w-7xl gap-8 px-4 py-14 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-20">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-2 text-[10px] uppercase tracking-[0.25em] text-amber-200 sm:px-4 sm:text-xs sm:tracking-[0.35em]">
                Wholesale Distribution Excellence
              </p>
              <h1 className="mt-5 font-display text-4xl leading-tight text-white sm:text-5xl md:text-7xl">
                Connecting manufacturers with local markets through trusted supply partnerships.
              </h1>
              <p className="mt-5 max-w-2xl text-base text-slate-300 sm:text-lg">
                We help wholesale businesses move products efficiently from production
                lines to local vendors with a premium, relationship-first operating
                model.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <button
                  type="button"
                  onClick={() => scrollToSection('contact')}
                  className="w-full rounded-full bg-amber-400 px-6 py-4 font-semibold text-slate-950 transition hover:bg-amber-300 sm:w-auto"
                >
                  Contact Us
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('appointment')}
                  className="w-full rounded-full border border-white/20 px-6 py-4 font-semibold text-white transition hover:bg-white/10 sm:w-auto"
                >
                  Book Appointment
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="rounded-[2rem] border border-white/10 bg-white/6 p-5 shadow-[0_40px_120px_rgba(0,0,0,0.35)] backdrop-blur sm:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ['Manufacturer Network', 'Verified upstream partnerships'],
                  ['Vendor Distribution', 'Fast local fulfillment support'],
                  ['Operational Visibility', 'Structured request handling'],
                  ['Response Commitment', 'Appointment-first service model'],
                ].map(([title, text]) => (
                  <div
                    key={title}
                    className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-5"
                  >
                    <Sparkles className="text-amber-300" size={20} />
                    <h3 className="mt-4 font-display text-lg text-white sm:text-xl">{title}</h3>
                    <p className="mt-2 text-sm text-slate-300">{text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-4 py-14 sm:py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="rounded-[2rem] bg-[linear-gradient(160deg,_#0f172a,_#1e293b)] p-6 text-white shadow-[0_30px_100px_rgba(15,23,42,0.2)] sm:p-8">
              <p className="text-sm uppercase tracking-[0.35em] text-amber-300">About Us</p>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl">
                Enterprise-grade distribution support for growing regional markets.
              </h2>
              <p className="mt-5 text-slate-300">
                Vertex Wholesale Partners acts as the strategic bridge between
                manufacturers and local vendors, helping products move through
                dependable business channels with clarity and speed.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                [
                  'Mission',
                  'Build a reliable supply ecosystem that strengthens manufacturers, vendors, and communities.',
                ],
                [
                  'Vision',
                  'Become the preferred wholesale coordination partner for scalable regional distribution.',
                ],
                [
                  '18+ Years',
                  'Experience managing relationships, logistics coordination, and commercial responsiveness.',
                ],
              ].map(([title, text]) => (
                <div key={title} className="rounded-[2rem] border border-slate-200 bg-white p-6">
                  <h3 className="font-display text-xl text-slate-950 sm:text-2xl">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="text-center">
              <p className="text-sm uppercase tracking-[0.35em] text-amber-600">
                Business Workflow
              </p>
              <h2 className="mt-4 font-display text-3xl text-slate-950 sm:text-4xl">
                A streamlined path from factory floor to end customer.
              </h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-4">
              {[
                ['Manufacturer', Factory],
                ['Company', Building2],
                ['Local Vendors', Handshake],
                ['Customers', Users2],
              ].map(([title, Icon], index) => (
                <div
                  key={title}
                  className="relative rounded-[2rem] border border-slate-200 bg-stone-50 p-6 text-center"
                >
                  <Icon className="mx-auto text-amber-600" size={28} />
                  <h3 className="mt-4 font-display text-xl text-slate-950 sm:text-2xl">{title}</h3>
                  {index < 3 ? (
                    <span className="mt-4 hidden text-3xl text-slate-300 md:block">
                      -&gt;
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="why-us" className="mx-auto max-w-7xl px-4 py-14 sm:py-16 lg:py-20">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-amber-600">
              Why Choose Us
            </p>
            <h2 className="mt-4 font-display text-3xl text-slate-950 sm:text-4xl">
              Built for dependable wholesale relationships.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {whyUs.map(({ title, text, icon: Icon }) => (
              <motion.div
                key={title}
                whileHover={{ y: -8 }}
                className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]"
              >
                <Icon className="text-amber-600" size={24} />
                <h3 className="mt-4 font-display text-xl text-slate-950 sm:text-2xl">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="bg-slate-950 py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {stats.map(([label, value]) => (
                <AnimatedCounter key={label} label={label} value={value} />
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="mx-auto max-w-7xl px-4 py-14 sm:py-16 lg:py-20">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-amber-600">
              Testimonials
            </p>
            <h2 className="mt-4 font-display text-3xl text-slate-950 sm:text-4xl">
              What our business partners say.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {testimonials.map(({ name, company, quote }) => (
              <div key={name} className="rounded-[2rem] border border-slate-200 bg-white p-6">
                <Quote className="text-amber-500" />
                <p className="mt-4 leading-7 text-slate-600">{quote}</p>
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <p className="font-display text-lg text-slate-950 sm:text-xl">{name}</p>
                    <p className="text-sm text-slate-500">{company}</p>
                  </div>
                  <p className="text-amber-500">5/5</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="text-center">
              <p className="text-sm uppercase tracking-[0.35em] text-amber-600">Gallery</p>
              <h2 className="mt-4 font-display text-3xl text-slate-950 sm:text-4xl">
                Professional moments from our distribution journey.
              </h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {gallery.map((item) => (
                <div
                  key={item}
                  className="group min-h-72 overflow-hidden rounded-[2rem] bg-[linear-gradient(145deg,_rgba(15,23,42,0.92),_rgba(51,65,85,0.88)),radial-gradient(circle_at_top,_rgba(251,191,36,0.2),_transparent_35%)] p-6 text-white"
                >
                  <div className="flex h-full flex-col justify-end rounded-[1.5rem] border border-white/10 bg-white/5 p-6 transition duration-300 group-hover:-translate-y-2">
                    <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
                      Operations {item}
                    </p>
                    <h3 className="mt-3 font-display text-2xl sm:text-3xl">
                      Supply chain coordination
                    </h3>
                    <p className="mt-3 text-slate-300">
                      From sourcing alignment to vendor delivery handoffs, every detail
                      matters.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="appointment" className="mx-auto max-w-7xl px-4 py-14 sm:py-16 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[2rem] bg-slate-950 p-6 text-white sm:p-8">
              <p className="text-sm uppercase tracking-[0.35em] text-amber-300">
                Appointment Booking
              </p>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl">
                Schedule a conversation with our team.
              </h2>
              <p className="mt-4 text-slate-300">
                Share your sourcing, vendor supply, or partnership requirement and
                we'll reach out with the right commercial contact.
              </p>
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault()
                handleSubmit('appointment')
              }}
              className="grid gap-4 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_25px_80px_rgba(15,23,42,0.08)] sm:p-8 md:grid-cols-2"
            >
              <input
                name="name"
                value={appointment.name}
                onChange={handleChange(setAppointment)}
                placeholder="Full Name"
                className="input-field md:col-span-1"
              />
              <input
                name="phone"
                value={appointment.phone}
                onChange={handleChange(setAppointment)}
                placeholder="Phone Number"
                className="input-field md:col-span-1"
              />
              <input
                name="email"
                value={appointment.email}
                onChange={handleChange(setAppointment)}
                placeholder="Email"
                className="input-field md:col-span-1"
              />
              <input
                type="date"
                name="appointmentDate"
                value={appointment.appointmentDate}
                onChange={handleChange(setAppointment)}
                className="input-field md:col-span-1"
              />
              <select
                name="appointmentTime"
                value={appointment.appointmentTime}
                onChange={handleChange(setAppointment)}
                className="input-field md:col-span-2"
              >
                <option value="">Select time slot</option>
                {appointmentTimeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              <textarea
                name="message"
                value={appointment.message}
                onChange={handleChange(setAppointment)}
                placeholder="Tell us about your requirement"
                rows="5"
                className="input-field md:col-span-2"
              />
              <button
                type="submit"
                disabled={submitting.appointment}
                className="rounded-full bg-amber-400 px-6 py-4 font-semibold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2"
              >
                {submitting.appointment ? 'Submitting...' : 'Book Appointment'}
              </button>
            </form>
          </div>
        </section>

        <section id="contact" className="bg-white py-14 pb-24 sm:py-16 sm:pb-24 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[1fr_0.95fr]">
            <div className="grid gap-6">
              <div className="rounded-[2rem] border border-slate-200 bg-stone-50 p-6 sm:p-8">
                <p className="text-sm uppercase tracking-[0.35em] text-amber-600">
                  Contact Information
                </p>
                <h2 className="mt-4 font-display text-3xl text-slate-950 sm:text-4xl">
                  Start the conversation with confidence.
                </h2>
                <div className="mt-8 grid gap-5">
                  {[
                    [MapPin, 'Address', 'No. 18, Trade Avenue, Industrial Corridor, Chennai'],
                    [Phone, 'Phone', businessPhone],
                    [Mail, 'Email', businessEmail],
                    [Clock3, 'Business Hours', 'Mon - Sat | 9:00 AM - 7:00 PM'],
                  ].map(([Icon, title, text]) => (
                    <div key={title} className="flex items-start gap-4">
                      <div className="rounded-2xl bg-amber-100 p-3 text-amber-700">
                        <Icon size={20} />
                      </div>
                      <div>
                        <p className="font-display text-lg text-slate-950 sm:text-xl">{title}</p>
                        <p className="mt-1 break-words text-slate-600">{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="overflow-hidden rounded-[2rem] border border-slate-200">
                <iframe
                  title="Vertex Wholesale map"
                  src="https://www.google.com/maps?q=Chennai&output=embed"
                  className="h-80 w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault()
                handleSubmit('contact')
              }}
              className="grid gap-4 rounded-[2rem] border border-slate-200 bg-slate-950 p-4 text-white sm:p-8"
            >
              <input
                name="name"
                value={contact.name}
                onChange={handleChange(setContact)}
                placeholder="Name"
                className="input-field-dark"
              />
              <input
                name="phone"
                value={contact.phone}
                onChange={handleChange(setContact)}
                placeholder="Phone Number"
                className="input-field-dark"
              />
              <input
                name="email"
                value={contact.email}
                onChange={handleChange(setContact)}
                placeholder="Email"
                className="input-field-dark"
              />
              <textarea
                name="message"
                value={contact.message}
                onChange={handleChange(setContact)}
                placeholder="Message"
                rows="6"
                className="input-field-dark"
              />
              <button
                type="submit"
                disabled={submitting.contact}
                className="w-full rounded-full bg-amber-400 px-5 py-4 text-sm font-semibold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60 sm:px-6 sm:text-base"
              >
                {submitting.contact ? 'Sending...' : 'Submit Contact Request'}
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 py-10 text-slate-300">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-3">
          <div>
            <p className="font-display text-xl text-white sm:text-2xl">Vertex Wholesale</p>
            <p className="mt-3 max-w-md">
              Premium wholesale distribution support for manufacturers, local
              vendors, and regional market growth.
            </p>
          </div>
          <div>
            <p className="font-display text-xl text-white">Quick Links</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {navLinks.map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => scrollToSection(id)}
                  className="text-sm text-slate-300 transition hover:text-white"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="font-display text-xl text-white">Social</p>
            <p className="mt-3">LinkedIn | Facebook | Instagram</p>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-7xl border-t border-white/10 px-4 pt-6 text-sm text-slate-500">
          (c) {year} Vertex Wholesale Partners. All rights reserved.
        </div>
      </footer>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-amber-400 text-slate-950 shadow-lg transition hover:bg-amber-300 sm:bottom-6 sm:right-6 sm:h-12 sm:w-12"
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>
    </div>
  )
}

export default LandingPage
