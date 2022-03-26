import rateLimit from 'express-rate-limit';

export const PrivateApiLimiter = (limit = 50) =>
  rateLimit({
    windowMs: 1000,
    max: limit,
    standardHeaders: true,
    legacyHeaders: false,
  });
