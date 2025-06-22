import * as React from "react";
import { Mail, Phone, Clock, MapPin } from "lucide-react";

const contactInfos = [
    {
        icon: <MapPin className="text-sky-400 w-7 h-7" />,
        label: "Our Address",
        value: "Mohammedia Enset",
        bg: "bg-sky-50",
    },
    {
        icon: <Phone className="text-orange-400 w-7 h-7" />,
        label: "Phone",
        value: "(+212) 0706077312",
        bg: "bg-orange-50",
    },
    {
        icon: <Mail className="text-purple-400 w-7 h-7" />,
        label: "Email",
        value: "stepbystep@gmail.ma",
        bg: "bg-purple-50",
    },
];

const socialLinks = [
    {
        href: "https://facebook.com",
        icon: (
            <svg className="w-7 h-7 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.676 0h-21.352c-.731 0-1.324.593-1.324 1.327v21.346c0 .73.593 1.327 1.324 1.327h11.495v-9.294h-3.133v-3.622h3.133v-2.672c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.1 2.797.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.312h3.587l-.467 3.622h-3.12v9.293h6.117c.73 0 1.323-.597 1.323-1.327v-21.346c0-.734-.593-1.327-1.324-1.327z"/>
            </svg>
        ),
        name: "Facebook",
    },
    {
        href: "https://wa.me/212706077312",
        icon: (
            <svg className="w-7 h-7 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488z"/>
            </svg>
        ),
        name: "WhatsApp",
    },
    {
        href: "https://instagram.com/",
        icon: (
            <svg className="w-7 h-7 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.849.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
        ),
        name: "Instagram",
    },
];

const initialFormState = {
    name: "",
    email: "",
    phone: "",
    message: "",
};

const Contact = () => {
    const [form, setForm] = React.useState(initialFormState);
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState("");

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setMessage("Message sent! Thank you for contacting us. We'll get back to you shortly.");
            setForm(initialFormState);
            setTimeout(() => setMessage(""), 5000);
        }, 1200);
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-sky-50 via-orange-50 to-purple-50 py-10">
            <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                {/* Contact Info */}
                <div>
                    <h2 className="text-blue-500 text-2xl md:text-3xl font-bold mb-2">
                        Contact Information
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        {contactInfos.map((info, i) => (
                            <div key={i} className={`rounded-xl flex gap-3 items-center px-5 py-5 shadow-md ${info.bg}`}>
                                <div className="flex items-center justify-center rounded-full bg-white shadow w-12 h-12">
                                    {info.icon}
                                </div>
                                <div>
                                    <div className="font-bold text-black">{info.label}</div>
                                    <div className="text-zinc-700 text-sm">{info.value}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8">
                        <div className="font-semibold text-zinc-900 mb-2">Follow Us</div>
                        <div className="flex gap-6">
                            {socialLinks.map((s) => (
                                <a
                                    key={s.name}
                                    href={s.href}
                                    className="hover:scale-110 transition-transform"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.name}
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white/90 rounded-2xl shadow-xl px-8 py-10 border border-sky-100 flex flex-col gap-6">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2 text-blue-500">Contact Us</h3>
                    <p className="mb-3 text-zinc-600">
                        Have questions? Need help? Our team is here to assist you.
                    </p>

                    {message && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                            {message}
                        </div>
                    )}

                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="font-semibold text-zinc-800">Full Name</label>
                        <input
                            id="name"
                            name="name"
                            required
                            value={form.name}
                            onChange={handleChange}
                            type="text"
                            className="rounded-lg border border-blue-200 px-4 py-2 bg-blue-50 text-black focus:ring-2 focus:ring-blue-200 duration-200 outline-none"
                            placeholder="Enter your full name"
                            disabled={loading}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="font-semibold text-zinc-800">Email</label>
                        <input
                            id="email"
                            name="email"
                            required
                            value={form.email}
                            onChange={handleChange}
                            type="email"
                            className="rounded-lg border border-blue-200 px-4 py-2 bg-blue-50 text-black focus:ring-2 focus:ring-blue-200 duration-200 outline-none"
                            placeholder="your@email.com"
                            disabled={loading}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="phone" className="font-semibold text-zinc-800">Phone</label>
                        <input
                            id="phone"
                            name="phone"
                            required
                            value={form.phone}
                            onChange={handleChange}
                            type="tel"
                            className="rounded-lg border border-blue-200 px-4 py-2 bg-blue-50 text-black focus:ring-2 focus:ring-blue-200 duration-200 outline-none"
                            placeholder="Phone number"
                            disabled={loading}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="message" className="font-semibold text-zinc-800">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            value={form.message}
                            onChange={handleChange}
                            rows={5}
                            className="rounded-lg border border-blue-200 px-4 py-2 bg-blue-50 text-black focus:ring-2 focus:ring-blue-200 duration-200 outline-none resize-none"
                            placeholder="Type your message here..."
                            disabled={loading}
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="mt-3 rounded-xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white font-bold py-3 shadow-lg hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Send Message"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Contact;