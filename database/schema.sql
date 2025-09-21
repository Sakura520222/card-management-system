CREATE TABLE IF NOT EXISTS cards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    card_code VARCHAR(30) NOT NULL UNIQUE,
    generated_date DATE NOT NULL,
    is_used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster lookups by card code
CREATE INDEX idx_card_code ON cards(card_code);

-- Index for faster lookups by usage status
CREATE INDEX idx_is_used ON cards(is_used);
