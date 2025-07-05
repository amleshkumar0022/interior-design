'use client';
import { useState } from 'react';

export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Sending...");
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (res.ok) {
                setStatus("Message sent!");
                setForm({ name: "", email: "", message: "" });
            } else {
                setStatus("Failed to send.");
            }
        } catch (err) {
            setStatus("Error occurred.");
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-8">
            <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    className="w-full p-2 border rounded"
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
                <input
                    className="w-full p-2 border rounded"
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <textarea
                    className="w-full p-2 border rounded"
                    name="message"
                    rows="5"
                    placeholder="Your Message"
                    value={form.message}
                    onChange={handleChange}
                    required
                ></textarea>
                <button className="px-4 py-2 text-white bg-black rounded" type="submit">
                    Send
                </button>
            </form>
            <p className="mt-2 text-sm">{status}</p>
        </div>
    );
}
