import cron from 'node-cron';
import { db } from '../config/database';

const MAX_MINING_HOURS = 24;

// Chạy mỗi 1 giờ
cron.schedule('0 * * * *', async () => {
  console.log('⛏️  [CRON] Running mining reward distribution...');

  const [rows] = await db.query(
    `SELECT * FROM mining WHERE is_mining = true`
  );
  const miners = rows as any[];

  const now = new Date();

  for (const miner of miners) {
    const lastMined = new Date(miner.last_mined_at);
    const elapsedMs = now.getTime() - lastMined.getTime();
    const elapsedHours = Math.min(MAX_MINING_HOURS, elapsedMs / (1000 * 60 * 60));
    const reward = miner.mining_speed * elapsedHours;

    if (elapsedHours <= 0) continue;

    await db.query('UPDATE users SET amount = amount + ? WHERE user_id = ?', [reward, miner.user_id]);

    await db.query(
      `UPDATE mining 
       SET last_mined_at = ?, total_mined = total_mined + ?, is_mining = ?
       WHERE user_id = ?`,
      [
        now,
        reward,
        elapsedHours >= MAX_MINING_HOURS ? false : true,
        miner.user_id,
      ]
    );

    console.log(`+${reward.toFixed(2)} coin to user ${miner.user_id} (elapsed ${elapsedHours.toFixed(2)}h)`);
  }

  console.log('✅ [CRON] Mining rewards processed.\n');
});
