'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

type ContactFormValues = {
  firstName: string
  lastName: string
  email: string
  company?: string
  message: string
}

export default function ContactForm() {
  const t = useTranslations('form')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(
      z.object({
        firstName: z.string().min(1, t('validation.firstNameRequired')),
        lastName: z.string().min(1, t('validation.lastNameRequired')),
        email: z.string().email(t('validation.emailInvalid')),
        company: z.string().optional(),
        message: z.string().min(1, t('validation.messageRequired')),
      }),
    ),
  })

  async function onSubmit(data: ContactFormValues) {
    const formData = new FormData()
    formData.append('First Name', data.firstName)
    formData.append('Last Name', data.lastName)
    formData.append('Email', data.email)
    if (data.company) formData.append('Company', data.company)
    formData.append('Message', data.message)

    // TEST
    // const response = await fetch('https://flow.mach2.cloud/webhook-test/contact-form', {

    // PROD
    const response = await fetch('https://flow.mach2.cloud/webhook/contact-form', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`Status: ${response.status}`)
    }

    reset()
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="form-row">
        <div className="form-group">
          <Label htmlFor="firstName" className="form-label">
            {t('firstName')} <span className="required">*</span>
          </Label>
          <Input
            id="firstName"
            type="text"
            placeholder={t('firstNamePlaceholder')}
            {...register('firstName')}
            aria-invalid={!!errors.firstName}
          />
          {errors.firstName && (
            <span className="form-error show">{errors.firstName.message}</span>
          )}
        </div>
        <div className="form-group">
          <Label htmlFor="lastName" className="form-label">
            {t('lastName')} <span className="required">*</span>
          </Label>
          <Input
            id="lastName"
            type="text"
            placeholder={t('lastNamePlaceholder')}
            {...register('lastName')}
            aria-invalid={!!errors.lastName}
          />
          {errors.lastName && (
            <span className="form-error show">{errors.lastName.message}</span>
          )}
        </div>
      </div>

      <div className="form-group">
        <Label htmlFor="email" className="form-label">
          {t('email')} <span className="required">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder={t('emailPlaceholder')}
          {...register('email')}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <span className="form-error show">{errors.email.message}</span>
        )}
      </div>

      <div className="form-group">
        <Label htmlFor="company" className="form-label">
          {t('company')}
        </Label>
        <Input
          id="company"
          type="text"
          placeholder={t('companyPlaceholder')}
          {...register('company')}
        />
      </div>

      <div className="form-group">
        <Label htmlFor="message" className="form-label">
          {t('message')} <span className="required">*</span>
        </Label>
        <Textarea
          id="message"
          placeholder={t('messagePlaceholder')}
          {...register('message')}
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <span className="form-error show">{errors.message.message}</span>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        className="form-submit w-full justify-center"
        disabled={isSubmitting}
      >
        {isSubmitting ? t('submitting') : t('submit')}
      </Button>

      {isSubmitSuccessful && (
        <div className="form-message success">{t('success')}</div>
      )}
    </form>
  )
}
