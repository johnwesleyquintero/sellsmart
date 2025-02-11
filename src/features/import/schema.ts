
import * as z from 'zod';

export const importConfigSchema = z.object({
  source_type: z.enum(['google_sheets', 'csv']),
  required_columns: z.array(z.string()),
  date_range: z.object({
    start_date: z.date(),
    end_date: z.date(),
  }),
  aggregation_level: z.enum(['daily', 'weekly', 'monthly']),
});

export type ImportConfig = z.infer<typeof importConfigSchema>;

export const defaultImportConfig: ImportConfig = {
  source_type: 'csv',
  required_columns: [
    'Date',
    'Impressions',
    'Clicks',
    'Spend',
    'Orders',
    'Sales',
    'Campaign Name',
    'Ad Group Name',
    'Keyword',
    'Match Type',
    'Search Term'
  ],
  date_range: {
    start_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    end_date: new Date(),
  },
  aggregation_level: 'daily',
};
