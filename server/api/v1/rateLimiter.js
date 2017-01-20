import RateLimit from 'express-rate-limit'

const fifteenMinutes = 60 * 60 * 1000
const requestsPerWindow = 100

export default new RateLimit({
  windowMs: fifteenMinutes,
  max: requestsPerWindow,
  delayMs: 0
})
