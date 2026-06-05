import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyCTA from "@/components/layout/StickyCTA";
import ContactForm from "@/components/sections/ContactForm";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { COMPANY_DATA } from "@/lib/config";

export const metadata: Metadata = {
  title: "Kontakt - SkładaMy",
  description:
    "Skontaktuj się z nami w sprawie montażu mebli w Słupsku. Bezpłatna wycena, szybka odpowiedź, profesjonalna obsługa.",
  keywords: ["kontakt montaż mebli Słupsk", "zamówienie montaż IKEA", "wycena składanie mebli"],
};

export default function KontaktPage() {
  return (
    <>
      <Header />
      <main className="py-20 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-600 mb-4 mx-auto w-fit">
              <span className="inline-block w-2 h-2 rounded-full bg-[#FFC400]" />
              Kontakt
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
              Skontaktuj się z nami
            </h1>
            <p className="mt-4 text-lg text-neutral-700 max-w-2xl mx-auto">
              Gotowy na montaż bez stresu? Napisz lub zadzwoń — odpowiadamy tego samego dnia i
              przedstawiamy bezpłatną wycenę.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
                Informacje kontaktowe
              </h2>

              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-neutral-200 shadow-sm">
                  <div className="shrink-0 w-10 h-10 rounded-md bg-[#FFC400]/20 text-[#6a4a00] flex items-center justify-center">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">Telefon</div>
                    <div className="text-neutral-700">
                      <a
                        href={`tel:${COMPANY_DATA.phone.replace(/\s/g, "")}`}
                        className="hover:underline"
                      >
                        {COMPANY_DATA.phone}
                      </a>
                    </div>
                    <div className="text-sm text-neutral-600 mt-1">
                      Najszybszy kontakt — oddzwaniamy w ciągu godziny
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-neutral-200 shadow-sm">
                  <div className="shrink-0 w-10 h-10 rounded-md bg-[#FFC400]/20 text-[#6a4a00] flex items-center justify-center">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">E-mail</div>
                    <div className="text-neutral-700">
                      <a href={`mailto:${COMPANY_DATA.email}`} className="hover:underline">
                        {COMPANY_DATA.email}
                      </a>
                    </div>
                    <div className="text-sm text-neutral-600 mt-1">
                      Odpowiadamy w ciągu 24 godzin
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-neutral-200 shadow-sm">
                  <div className="shrink-0 w-10 h-10 rounded-md bg-[#FFC400]/20 text-[#6a4a00] flex items-center justify-center">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">Obszar działania</div>
                    <div className="text-neutral-700">
                      Słupsk i okolice — dojazd bezpłatny w obrębie miasta
                    </div>
                    <div className="text-sm text-neutral-600 mt-1">
                      Dojazd poza miasto — ustalamy indywidualnie
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-neutral-200 shadow-sm">
                  <div className="shrink-0 w-10 h-10 rounded-md bg-[#FFC400]/20 text-[#6a4a00] flex items-center justify-center">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">Czas realizacji</div>
                    <div className="text-neutral-700">Zwykle 1–3 dni robocze</div>
                    <div className="text-sm text-neutral-600 mt-1">
                      Zależy od ilości i typu mebli
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional info */}
              <div className="mt-8 p-6 bg-white rounded-lg border border-neutral-200 shadow-sm">
                <h3 className="font-semibold text-neutral-900 mb-3">Przygotuj przed kontaktem:</h3>
                <ul className="space-y-2 text-sm text-neutral-700">
                  <li>• Zdjęcia paczek / instrukcji do montażu</li>
                  <li>• Wymiary pomieszczenia (dla większych mebli)</li>
                  <li>• Informację o typie ścian (przy wieszaniu szafek)</li>
                  <li>• Preferowany termin realizacji</li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Formularz kontaktowy</h2>
              <div className="bg-white rounded-lg border border-neutral-200 shadow-sm p-4">
                <ContactForm />
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 pt-16 border-t border-border">
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">
              Najczęstsze pytania o kontakt
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Jak szybko otrzymam wycenę?</h3>
                <p className="text-muted-foreground text-sm">
                  Standardowo odpowiadamy tego samego dnia. W przypadku zapytań złożonych po
                  godzinach - następnego dnia roboczego rano.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Czy wycena jest płatna?</h3>
                <p className="text-muted-foreground text-sm">
                  Nie, wycena jest całkowicie bezpłatna i nie zobowiązuje do zamówienia. Płacisz
                  tylko po wykonanym montażu.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Co jeśli mam pilny montaż?</h3>
                <p className="text-muted-foreground text-sm">
                  Zadzwoń bezpośrednio - często możemy zorganizować montaż już następnego dnia. SMS
                  lub WhatsApp też działają dobrze.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Czy montujecie wieczorami/weekendami?
                </h3>
                <p className="text-muted-foreground text-sm">
                  Tak, dostosowujemy się do Państwa grafiku. Montaże weekendowe i wieczorne
                  realizujemy bez dodatkowych opłat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
