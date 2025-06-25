import { Pool } from 'mysql2/promise';

export class ReferralModel {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async create(referrerId: number, referredId: number, rewardAmount: number): Promise<void> {
    const connection = await this.pool.getConnection();
    try {
      await connection.query(
        'INSERT INTO referrals (referrer_id, referred_id, reward_amount, created_at) VALUES (?, ?, ?, NOW())',
        [referrerId, referredId, rewardAmount]
      );
    } finally {
      connection.release();
    }
  }
}