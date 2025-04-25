'use client';

import { useState } from 'react';

import { useParams } from 'next/navigation';

import { Metadata } from 'next';

import type { Locale } from '@/types';

// Contact Form Type
interface ContactForm {
    name: string;
    email: string;
    subject: string;
    message: string;
}

// Form validation error type
interface FormErrors {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
}

export default function ContactPage() {
    const params = useParams();
    const locale = params.locale as Locale;

    // Form state
    const [formData, setFormData] = useState<ContactForm>({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    // Form status states
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    // Translations
    const texts = {
        de: {
            title: 'Kontakt',
            subtitle: 'Haben Sie Fragen? Kontaktieren Sie uns gerne.',
            form: {
                name: 'Name',
                email: 'E-Mail',
                subject: 'Betreff',
                message: 'Nachricht',
                submit: 'Nachricht senden',
                sending: 'Wird gesendet...',
            },
            validation: {
                nameRequired: 'Bitte geben Sie Ihren Namen ein',
                emailRequired: 'Bitte geben Sie Ihre E-Mail-Adresse ein',
                emailInvalid: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
                subjectRequired: 'Bitte geben Sie einen Betreff ein',
                messageRequired: 'Bitte geben Sie eine Nachricht ein',
            },
            success: 'Vielen Dank für Ihre Nachricht! Wir werden uns so schnell wie möglich bei Ihnen melden.',
            error: 'Beim Senden Ihrer Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es später noch einmal.',
            contactInfo: {
                title: 'Kontaktinformationen',
                address: 'Adresse',
                addressValue: 'Musterstraße 123, 12345 Berlin, Deutschland',
                email: 'E-Mail',
                phone: 'Telefon',
                phoneValue: '+49 123 456789',
            },
        },
        en: {
            title: 'Contact',
            subtitle: 'Have questions? Feel free to contact us.',
            form: {
                name: 'Name',
                email: 'Email',
                subject: 'Subject',
                message: 'Message',
                submit: 'Send Message',
                sending: 'Sending...',
            },
            validation: {
                nameRequired: 'Please enter your name',
                emailRequired: 'Please enter your email address',
                emailInvalid: 'Please enter a valid email address',
                subjectRequired: 'Please enter a subject',
                messageRequired: 'Please enter a message',
            },
            success: 'Thank you for your message! We will get back to you as soon as possible.',
            error: 'An error occurred while sending your message. Please try again later.',
            contactInfo: {
                title: 'Contact Information',
                address: 'Address',
                addressValue: '123 Example Street, 12345 Berlin, Germany',
                email: 'Email',
                phone: 'Phone',
                phoneValue: '+49 123 456789',
            },
        },
    };

    const t = locale === 'de' ? texts.de : texts.en;

    // Form validation
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = t.validation.nameRequired;
        }

        if (!formData.email.trim()) {
            newErrors.email = t.validation.emailRequired;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = t.validation.emailInvalid;
        }

        if (!formData.subject.trim()) {
            newErrors.subject = t.validation.subjectRequired;
        }

        if (!formData.message.trim()) {
            newErrors.message = t.validation.messageRequired;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Clear field error when typing
        if (errors[name as keyof FormErrors]) {
            setErrors({ ...errors, [name]: undefined });
        }
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitError(null);

        try {
            // In a real application, you would send the form data to your API
            // await fetch('/api/contact', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(formData),
            // });

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Reset form and show success message
            setFormData({ name: '', email: '', subject: '', message: '' });
            setIsSubmitted(true);
        } catch (error) {
            setSubmitError(t.error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 text-primary-800">{t.title}</h1>
                    <p className="text-xl text-gray-600">{t.subtitle}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Contact Information */}
                    <div className="bg-primary-50 p-6 rounded-lg">
                        <h2 className="text-xl font-bold mb-6 text-primary-700">{t.contactInfo.title}</h2>

                        <div className="space-y-4">
                            <div>
                                <h3 className="font-medium text-primary-600 mb-1">{t.contactInfo.address}</h3>
                                <p className="text-gray-600">{t.contactInfo.addressValue}</p>
                            </div>

                            <div>
                                <h3 className="font-medium text-primary-600 mb-1">{t.contactInfo.email}</h3>
                                <p className="text-gray-600">contact@example.com</p>
                            </div>

                            <div>
                                <h3 className="font-medium text-primary-600 mb-1">{t.contactInfo.phone}</h3>
                                <p className="text-gray-600">{t.contactInfo.phoneValue}</p>
                            </div>
                        </div>

                        {/* Social Media Links */}
                        <div className="mt-8">
                            <div className="flex space-x-4">
                                {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                                    <a
                                        key={social}
                                        className="bg-white p-2 rounded-full text-primary-600 hover:text-primary-700 hover:bg-primary-100 transition-colors"
                                        href={`https://${social}.com/yourcompany`}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10z" />
                                        </svg>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        {isSubmitted ? (
                            <div className="text-center py-12">
                                <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                                </svg>
                                <h3 className="text-xl font-medium text-gray-900 mb-4">{t.success}</h3>
                                <button
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 transition-colors"
                                    onClick={() => setIsSubmitted(false)}
                                >
                                    {locale === 'de' ? 'Neue Nachricht senden' : 'Send another message'}
                                </button>
                            </div>
                        ) : (
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                                            {t.form.name} *
                                        </label>
                                        <input
                                            className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary-200 focus:border-primary-500 outline-none transition-colors ${
                                                errors.name ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                            id="name"
                                            name="name"
                                            type="text"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                                            {t.form.email} *
                                        </label>
                                        <input
                                            className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary-200 focus:border-primary-500 outline-none transition-colors ${
                                                errors.email ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="subject">
                                        {t.form.subject} *
                                    </label>
                                    <input
                                        className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary-200 focus:border-primary-500 outline-none transition-colors ${
                                            errors.subject ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        id="subject"
                                        name="subject"
                                        type="text"
                                        value={formData.subject}
                                        onChange={handleChange}
                                    />
                                    {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="message">
                                        {t.form.message} *
                                    </label>
                                    <textarea
                                        className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary-200 focus:border-primary-500 outline-none transition-colors ${
                                            errors.message ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        id="message"
                                        name="message"
                                        rows={6}
                                        value={formData.message}
                                        onChange={handleChange}
                                    />
                                    {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                                </div>

                                {submitError && (
                                    <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                                        <p className="text-sm text-red-600">{submitError}</p>
                                    </div>
                                )}

                                <div>
                                    <button
                                        className="w-full px-6 py-3 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors disabled:bg-primary-400 disabled:cursor-not-allowed"
                                        disabled={isSubmitting}
                                        type="submit"
                                    >
                                        {isSubmitting ? t.form.sending : t.form.submit}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}