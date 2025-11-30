'use strict';

/**
 * contact controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::contact.contact', ({ strapi }) => ({
  // Przesłaniamy standardową metodę create
  async create(ctx) {
    try {
      // Pobieramy dane z formularza
      const { data } = ctx.request.body;
      
      // Walidacja podstawowych pól
      if (!data.name || !data.email || !data.message) {
        return ctx.badRequest('Nazwa, email i wiadomość są wymagane');
      }

      // Tworzymy nowy kontakt
      const entity = await strapi.documents('api::contact.contact').create({
        data: {
          ...data,
          status: 'new',
          isRead: false
        }
      });

      // Zwracamy odpowiedź
      return ctx.send({
        data: entity,
        message: 'Formularz został wysłany pomyślnie'
      });

    } catch (error) {
      console.error('Błąd podczas tworzenia kontaktu:', error);
      return ctx.internalServerError('Wystąpił błąd podczas wysyłania formularza');
    }
  },

  // Metoda do oznaczania jako przeczytane
  async markAsRead(ctx) {
    try {
      const { id } = ctx.params;
      
      const entity = await strapi.documents('api::contact.contact').update({
        documentId: "__TODO__",

        // cast to any because generated Input types may not include custom fields
        data: ({ isRead: true } as any)
      });

      return ctx.send({ data: entity });
    } catch (error) {
      console.error('Błąd podczas oznaczania jako przeczytane:', error);
      return ctx.internalServerError('Wystąpił błąd');
    }
  },

  // Metoda do zmiany statusu
  async updateStatus(ctx) {
    try {
      const { id } = ctx.params;
      const { status } = ctx.request.body;
      
      if (!['new', 'in-progress', 'resolved', 'closed'].includes(status)) {
        return ctx.badRequest('Nieprawidłowy status');
      }

      const entity = await strapi.documents('api::contact.contact').update({
        documentId: "__TODO__",

        // cast to any because generated Input types may not include custom fields
        data: ({ status } as any)
      });

      return ctx.send({ data: entity });
    } catch (error) {
      console.error('Błąd podczas aktualizacji statusu:', error);
      return ctx.internalServerError('Wystąpił błąd');
    }
  },

  // Pobieranie statystyk kontaktów
  async getStats(ctx: any) {
    try {
      const stats = await strapi.service('api::contact.contact').getStats();
      return ctx.send(stats);
    } catch (error) {
      console.error('Błąd podczas pobierania statystyk:', error);
      return ctx.internalServerError('Wystąpił błąd');
    }
  }
}));
