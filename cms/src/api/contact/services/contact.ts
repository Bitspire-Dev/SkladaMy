'use strict';

/**
 * contact service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::contact.contact', ({ strapi }) => ({
  // Metoda do pobierania kontaktów z filtrowaniem
  async findWithFilters(params: any = {}) {
    const { status, isRead, limit = 25, start = 0 } = params;
    
    const filters: any = {};
    if (status) filters.status = status;
    if (typeof isRead === 'boolean') filters.isRead = isRead;

    return await strapi.documents('api::contact.contact').findMany({
      filters,
      sort: { createdAt: 'desc' },
      limit,
      start,
      populate: ['files']
    });
  },

  // Metoda do zliczania nieprzeczytanych
  async countUnread() {
    return await strapi.documents('api::contact.contact').count({
      filters: { isRead: false }
    });
  },

  // Metoda do pobierania statystyk
  async getStats() {
  const total = await strapi.documents('api::contact.contact').count({});
    const unread = await this.countUnread();
    const inProgress = await strapi.documents('api::contact.contact').count({
      filters: { status: 'in-progress' }
    });
    const resolved = await strapi.documents('api::contact.contact').count({
      filters: { status: 'resolved' }
    });

    return {
      total,
      unread,
      inProgress,
      resolved
    };
  }
}));
