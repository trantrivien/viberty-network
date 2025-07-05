-- Tạo cơ sở dữ liệu
CREATE DATABASE IF NOT EXISTS mining_app;
USE mining_app;

CREATE TABLE notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);


CREATE TABLE user_tasks (
  user_task_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  task_id INT NOT NULL,
  status ENUM('pending', 'completed', 'expired') DEFAULT 'pending',
  completed_at TIMESTAMP NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (task_id) REFERENCES tasks(task_id) ON DELETE CASCADE
);
-- Bảng users: Lưu thông tin người dùng
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    wallet_address VARCHAR(255) UNIQUE,
    username VARCHAR(255) UNIQUE,
    email VARCHAR(255),
    phone VARCHAR(20),
    password VARCHAR(255),
    additional_wallet_address VARCHAR(255),
    image_url VARCHAR(255),
    amount DECIMAL(18, 2) DEFAULT 0.00,
    is_banned BOOLEAN DEFAULT FALSE,
    role ENUM('user', 'admin') DEFAULT 'user',
    ref_code VARCHAR(10) UNIQUE,
    ref_by INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bảng refresh_tokens: Lưu refresh token
CREATE TABLE refresh_tokens (
    token_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token VARCHAR(512) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Bảng transactions: Lưu thông tin giao dịch
CREATE TABLE transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    from_user_id INT,
    to_user_id INT,
    amount DECIMAL(18, 2) NOT NULL,
    type ENUM('transfer', 'game_reward', 'purchase', 'task_reward', 'mining_reward','admin_topup', 'admin_withdraw') NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (from_user_id) REFERENCES users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (to_user_id) REFERENCES users(user_id) ON DELETE SET NULL
);

-- Bảng tasks: Lưu thông tin nhiệm vụ
CREATE TABLE tasks (
    task_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    type ENUM('daily', 'weekly', 'fixed') NOT NULL,
    reward DECIMAL(18, 2) NOT NULL,
    image_url VARCHAR(255),
    start_date DATETIME,
    end_date DATETIME,
    created_by INT NOT NULL,
    reward_type ENUM('money', 'mining_speed') DEFAULT 'money',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'completed', 'expired') DEFAULT 'pending',
    FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Bảng items: Lưu thông tin vật phẩm
CREATE TABLE items (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    type ENUM('booster', 'skin', 'other') NOT NULL,
    price DECIMAL(18, 2) NOT NULL,
    mining_speed_boost DECIMAL(18, 2) DEFAULT 0.00,
    reward_amount DECIMAL(18, 2) DEFAULT 0.00,
    duration INT,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng user_items: Lưu thông tin vật phẩm mà người dùng sở hữu
CREATE TABLE user_items (
    user_item_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    item_id INT NOT NULL,
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES items(item_id) ON DELETE CASCADE
);

-- Bảng mining: Lưu thông tin khai thác của người dùng
CREATE TABLE mining (
    mining_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    mining_speed DECIMAL(18, 2) NOT NULL DEFAULT 1.00,
    last_mined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_mined DECIMAL(18, 2) DEFAULT 0.00,
    is_mining BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Thêm dữ liệu mẫu
INSERT INTO users (wallet_address, username, email, phone, password, amount, role) VALUES
    ('0x1234567890abcdef1234567890abcdef12345678', NULL, 'user1@example.com', '1234567890', NULL, 1000.00, 'user'),
    (NULL, 'admin', 'admin@example.com', '0987654321', '$2b$10$8XgK9Y7Qz7Z1Z0Z2Z3Z4Z5Z6Z7Z8Z9Z0Z1Z2Z3Z4Z5Z6Z7Z8Z9Z0Z', 5000.00, 'admin');

INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES
    (2, 'sample_refresh_token_admin', DATE_ADD(NOW(), INTERVAL 7 DAY));

INSERT INTO transactions (from_user_id, to_user_id, amount, type, description) VALUES
    (1, 2, 100.00, 'transfer', 'Chuyển tiền từ user1 đến admin'),
    (NULL, 1, 50.00, 'task_reward', 'Phần thưởng nhiệm vụ daily');

INSERT INTO tasks (title, description, type, reward, created_by, start_date, end_date) VALUES
    ('Nhiệm vụ hàng ngày', 'Hoàn thành 5 giao dịch', 'daily', 50.00, 2, '2025-06-28 00:00:00', '2025-06-29 00:00:00'),
    ('Nhiệm vụ cố định', 'Mua vật phẩm đầu tiên', 'fixed', 100.00, 2, '2025-06-28 00:00:00', '2025-12-31 23:59:59');

INSERT INTO items (name, description, type, price, mining_speed_boost, reward_amount, duration, image_url) VALUES
    ('Booster Tốc độ', 'Tăng tốc độ khai thác lên 2x', 'booster', 200.00, 1.00, 0.00, 24, 'http://example.com/booster.jpg'),
    ('Skin Đặc biệt', 'Skin độc quyền cho người dùng', 'skin', 150.00, 0.00, 50.00, NULL, 'http://example.com/skin.jpg'),
    ('Booster Siêu Tốc', 'Tăng tốc độ khai thác lên 5x', 'booster', 500.00, 4.00, 100.00, 48, 'http://example.com/super_booster.jpg');

INSERT INTO user_items (user_id, item_id, activated_at, expires_at) VALUES
    (1, 1, '2025-06-28 12:00:00', '2025-06-29 12:00:00'),
    (1, 2, '2025-06-28 12:00:00', NULL);

INSERT INTO mining (user_id, mining_speed, last_mined_at, total_mined, is_mining) VALUES
    (1, 2.50, '2025-06-28 12:00:00', 100.00, FALSE),
    (2, 2.00, '2025-06-28 12:00:00', 500.00, FALSE);