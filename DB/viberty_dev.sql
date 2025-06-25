create database viberty;

USE viberty;

-- Bảng users
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    wallet_address VARCHAR(255) NOT NULL UNIQUE, -- Địa chỉ ví Web3
    username VARCHAR(50) UNIQUE,
    balance DECIMAL(18,2) DEFAULT 0.00, -- Số dư coin
    referral_code VARCHAR(10) NOT NULL UNIQUE, -- Mã giới thiệu
    referred_by VARCHAR(10), -- Mã của người giới thiệu
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bảng mining_sessions
CREATE TABLE mining_sessions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    mining_rate DECIMAL(10,2) DEFAULT 1.00, -- Tốc độ đào (coin/giờ)
    status ENUM('active', 'expired') DEFAULT 'active',
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Bảng items
CREATE TABLE items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL, -- Giá vật phẩm (coin)
    mining_rate_boost DECIMAL(10,2) NOT NULL, -- Tăng tốc độ đào
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng user_items
CREATE TABLE user_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    item_id BIGINT NOT NULL,
    purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (item_id) REFERENCES items(id)
);

-- Bảng referrals
CREATE TABLE referrals (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    referrer_id BIGINT NOT NULL,
    referred_id BIGINT NOT NULL,
    reward_amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (referrer_id) REFERENCES users(id),
    FOREIGN KEY (referred_id) REFERENCES users(id)
);

-- Bảng tasks
CREATE TABLE tasks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    reward_amount DECIMAL(10,2) NOT NULL, -- Phần thưởng coin
    type ENUM('like_video', 'subscribe_youtube', 'follow_x', 'other') NOT NULL,
    external_link VARCHAR(255), -- Link đến YouTube, X, v.v.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng user_tasks
CREATE TABLE user_tasks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    task_id BIGINT NOT NULL,
    status ENUM('pending', 'completed') DEFAULT 'pending',
    completed_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (task_id) REFERENCES tasks(id)
);

-- Bảng notifications
CREATE TABLE notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    message TEXT NOT NULL, -- Nội dung thông báo (ví dụ: "Phiên đào đã hết, nhấn Start để tiếp tục!")
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('sent', 'read') DEFAULT 'sent',
    FOREIGN KEY (user_id) REFERENCES users(id)
);



USE viberty;

-- Thêm người dùng
INSERT INTO users (wallet_address, username, referral_code) 
VALUES ('0x1234567890abcdef', 'john_doe', 'REF123');

-- Thêm vật phẩm
INSERT INTO items (name, price, mining_rate_boost) 
VALUES ('Turbo Miner', 100.00, 2.00);

-- Thêm nhiệm vụ
INSERT INTO tasks (title, reward_amount, type, external_link) 
VALUES ('Subscribe YouTube', 10.00, 'subscribe_youtube', 'https://youtube.com/viberty');