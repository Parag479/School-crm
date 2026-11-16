import { dbService } from '../services/db.service.js';
import { logger } from '../utils/logger.js';

async function main() {
  logger.info('Starting database seed script...');
  await dbService.seedInitialData();
  logger.info('Seed completed successfully!');
}

main().catch((err) => {
  logger.error('Seed error:', err);
  process.exit(1);
});

