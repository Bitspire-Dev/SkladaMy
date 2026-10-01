"use client";

import { useState, memo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { CheckCircle, AlertCircle } from "lucide-react";
import { COMPANY_CONFIG, formatPhoneForTel, formatPhoneForDisplay } from "@/lib/config";

const contactSchema = z.object({
  name: z.string().min(2, "Imię i nazwisko musi mieć przynajmniej 2 znaki"),
  phone: z
    .string()
    .min(9, "Podaj prawidłowy numer telefonu")
    .regex(/^[+]?[\d\s\-()]{9,}$/, "Nieprawidłowy numer telefonu"),
  email: z.string().email("Podaj prawidłowy adres e-mail"),
  subject: z.string().min(1, "Wybierz typ usługi"),
  message: z.string().min(10, "Opis musi mieć przynajmniej 10 znaków"),
  consent: z
    .boolean()
    .refine((val) => val === true, "Musisz wyrazić zgodę na przetwarzanie danych"),
  // Honeypot: hidden field named like a real one to attract spambots. Must
  // stay empty; validated server-side too.
  company_website: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const serviceTypes = [
  { value: "szafy", label: "Montaż szaf (PAX, HEMNES, inne)" },
  { value: "kuchnia", label: "Montaż kuchni (METOD, KNOXHULT)" },
  { value: "szafki", label: "Wieszanie szafek łazienkowych/kuchennych" },
  { value: "biuro", label: "Montaż mebli biurowych" },
  { value: "meble-pokojowe", label: "Montaż mebli pokojowych (komody, regały)" },
  { value: "inne", label: "Inne (opisz w wiadomości)" },
];

/* eslint-disable max-lines-per-function, complexity */
export default memo(function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { company_website: "" },
  });
  const selectedSubject = watch("subject");

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter((file) => {
      const isValidType = file.type.startsWith("image/");
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      return isValidType && isValidSize;
    });

    setSelectedFiles((prev) => [...prev, ...validFiles].slice(0, 5)); // Max 5 files
  }, []);

  const removeFile = useCallback((index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    // Check honeypot (also enforced server-side)
    if (data.company_website) {
      return; // Likely spam
    }

    setIsSubmitting(true);

    try {
      const hasFiles = selectedFiles.length > 0;

      const response = await fetch(
        "/api/contact",
        hasFiles
          ? (() => {
              const form = new FormData();
              form.append("name", data.name);
              form.append("email", data.email);
              form.append("phone", data.phone);
              form.append("subject", data.subject);
              form.append("message", data.message);
              form.append("company_website", data.company_website || "");
              selectedFiles.forEach((file) => form.append("files", file));
              return {
                method: "POST",
                body: form,
              } as const;
            })()
          : {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: data.name,
                email: data.email,
                phone: data.phone,
                subject: data.subject,
                message: data.message,
                company_website: data.company_website || "",
              }),
            }
      );

      if (!response.ok) {
        throw new Error("Contact API error");
      }

      setSubmitStatus("success");
      reset();
      setSelectedFiles([]);

      // Track analytics event
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "form_submit", {
          event_category: "engagement",
          event_label: "contact_form",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <Card className="shadow-sm">
        <CardContent className="pt-6">
          <div className="text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Dziękujemy za zapytanie!</h3>
            <p className="text-muted-foreground mb-4">
              Twoja wiadomość została wysłana. Odpowiemy w ciągu 24 godzin.
            </p>
            <Button
              onClick={() => setSubmitStatus("idle")}
              variant="outline"
              className="bg-white text-neutral-900 border-neutral-200 hover:bg-neutral-50"
            >
              Wyślij kolejne zapytanie
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">Bezpłatna wycena</CardTitle>
        <p className="text-muted-foreground">
          Wypełnij formularz, a odezwiemy się tego samego dnia z wyceną.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Honeypot field - hidden from real users, validated server-side.
              position:absolute + off-screen is harder for bots to detect than
              display:none, while still being skipped by screen readers. */}
          <input
            type="text"
            {...register("company_website")}
            style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0 }}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          {/* Name */}
          <div>
            <Label htmlFor="name">Imię i nazwisko *</Label>
            <Input
              id="name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              {...register("name")}
              placeholder="Jan Kowalski"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p id="name-error" className="text-sm text-red-500 mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Phone and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Telefon *</Label>
              <Input
                id="phone"
                type="tel"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                {...register("phone")}
                placeholder={formatPhoneForDisplay()}
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && (
                <p id="phone-error" className="text-sm text-red-500 mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="email">E-mail *</Label>
              <Input
                id="email"
                type="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                {...register("email")}
                placeholder="jan@example.com"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p id="email-error" className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Service Type as Subject */}
          <div>
            <Label htmlFor="subject">Typ usługi *</Label>
            <Select
              value={selectedSubject}
              onValueChange={(value) => setValue("subject", value, { shouldValidate: true })}
            >
              <SelectTrigger
                className={errors.subject ? "border-red-500" : ""}
                aria-invalid={!!errors.subject}
                aria-describedby={errors.subject ? "subject-error" : undefined}
              >
                <SelectValue placeholder="Wybierz typ montażu" />
              </SelectTrigger>
              <SelectContent className="bg-white text-neutral-900 border border-neutral-200">
                {serviceTypes.map((service) => (
                  <SelectItem key={service.value} value={service.value}>
                    {service.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.subject && (
              <p id="subject-error" className="text-sm text-red-500 mt-1">
                {errors.subject.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <Label htmlFor="message">Opis sytuacji *</Label>
            <Textarea
              id="message"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              {...register("message")}
              placeholder="Opisz jakie meble chcesz zmontować, stan paczek, preferencje dotyczące terminu..."
              rows={4}
              className={errors.message ? "border-red-500" : ""}
            />
            {errors.message && (
              <p id="message-error" className="text-sm text-red-500 mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* File Upload */}
          <div>
            <Label htmlFor="files">Załącz zdjęcia (opcjonalnie)</Label>
            <div className="mt-2">
              <input
                type="file"
                id="files"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <Label
                htmlFor="files"
                className="cursor-pointer inline-flex items-center px-4 py-2 border border-dashed border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                <svg
                  className="h-4 w-4 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 10l5-5 5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 5v12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Dodaj zdjęcia (max 5MB każde)
              </Label>
            </div>

            {/* Selected files */}
            {selectedFiles.length > 0 && (
              <div className="mt-3 space-y-2">
                {selectedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-sm bg-muted p-2 rounded"
                  >
                    <span className="truncate">{file.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Usuń
                    </Button>
                  </div>
                ))}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Zdjęcia instrukcji, paczek lub pomieszczenia pomogą w przygotowaniu dokładnej wyceny.
            </p>
          </div>

          {/* Consent */}
          <div className="flex items-start space-x-2">
            <input type="checkbox" id="consent" {...register("consent")} className="mt-1" />
            <div>
              <Label htmlFor="consent" className="text-sm">
                Wyrażam zgodę na przetwarzanie danych osobowych w celu kontaktu w sprawie wyceny i
                realizacji usługi montażowej. *
              </Label>
              {errors.consent && (
                <p className="text-sm text-red-500 mt-1">{errors.consent.message}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#FFC400] hover:bg-[#f2b800] text-neutral-900"
            size="lg"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Wysyłanie...
              </>
            ) : (
              <>
                <svg
                  className="h-4 w-4 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M22 2L11 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 2L15 22L11 13L2 9L22 2Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Wyślij zapytanie
              </>
            )}
          </Button>

          {submitStatus === "error" && (
            <div className="flex items-center space-x-2 text-red-500 text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>
                Wystąpił błąd podczas wysyłania. Spróbuj ponownie lub zadzwoń bezpośrednio.
              </span>
            </div>
          )}

          <p className="text-xs text-muted-foreground text-center">
            Odpowiadamy w ciągu 24 godzin. W pilnych sprawach dzwoń bezpośrednio:
            <a href={`tel:${formatPhoneForTel()}`} className="text-primary hover:underline ml-1">
              {COMPANY_CONFIG.phone}
            </a>
          </p>
        </form>
      </CardContent>
    </Card>
  );
});
