const uidMap = {
  "what tours are available for italy": "tour_italy_uid",
  "italy tours": "tour_italy_uid",
  "pricing for paris tour": "tour_paris_pricing_uid"
};

function mapQueryToUID(query) {
  const q = query.toLowerCase().trim();
  for (const key of Object.keys(uidMap)) {
    if (q.includes(key) || key.includes(q)) return uidMap[key];
  }
  return null;
}
module.exports = { mapQueryToUID, uidMap };
